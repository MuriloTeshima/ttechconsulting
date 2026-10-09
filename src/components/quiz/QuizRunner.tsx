'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore, useTransition } from 'react';
import { ArrowLeft, ArrowRight, Check, CircleCheck, LoaderCircle, RotateCcw } from 'lucide-react';
import { submitQuiz } from '@/app/actions/quiz';
import { trackQuiz } from '@/lib/analytics';
import { readAttribution } from '@/lib/attribution';
import type { QuizLead, QuizLeadInput } from '@/lib/contact-schema';
import { formatPhone } from '@/lib/phone';
import {
  isAnswered,
  type PublicQuestion,
  type PublicQuiz,
  type QuizAnswers,
  type QuizAnswerValue,
  type QuizResult,
} from '@/lib/quiz';
import { Turnstile } from '../contact/Turnstile';
import { WhatsAppLink } from '../WhatsAppLink';

type Stage =
  | { kind: 'intro' }
  | { kind: 'question'; index: number }
  | { kind: 'lead' }
  | { kind: 'result'; result: QuizResult };

type Saved = { answers: QuizAnswers; index: number; startedAt: number };

const emptyLead: QuizLeadInput = {
  name: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  consent: false,
};

// Progresso salvo no navegador, para quem fechar a página continuar de onde parou.
const storageKey = (slug: string) => `ttech-quiz:${slug}`;
function readSaved(slug: string): Saved | null {
  try {
    const raw = localStorage.getItem(storageKey(slug));
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}
function writeSaved(slug: string, saved: Saved | null) {
  try {
    if (saved) localStorage.setItem(storageKey(slug), JSON.stringify(saved));
    else localStorage.removeItem(storageKey(slug));
  } catch {
    // Armazenamento indisponível: o quiz funciona, só não guarda o progresso.
  }
}
const noopSubscribe = () => () => {};

export function QuizRunner({ quiz }: { quiz: PublicQuiz }) {
  const [stage, setStage] = useState<Stage>({ kind: 'intro' });
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [questionError, setQuestionError] = useState<string | null>(null);
  const [lead, setLead] = useState<QuizLeadInput>(emptyLead);
  const [leadErrors, setLeadErrors] = useState<Partial<Record<keyof QuizLead, string>>>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const startedAtRef = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const turnstileTokenRef = useRef('');
  // Cada tentativa de envio consome o token anterior; o contador pede um novo.
  const [attempt, setAttempt] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Há progresso salvo? Lido só no navegador (no servidor, sempre "não").
  const hasSaved = useSyncExternalStore(
    noopSubscribe,
    () => Boolean(readSaved(quiz.slug)?.index),
    () => false,
  );

  const total = quiz.questions.length;
  const stageKey = stage.kind === 'question' ? `q${stage.index}` : stage.kind;

  // Leva o foco ao título de cada etapa (leitores de tela e teclado).
  useEffect(() => {
    if (stage.kind !== 'intro') headingRef.current?.focus();
  }, [stageKey, stage.kind]);

  const goTo = (next: Stage) => {
    setQuestionError(null);
    setStage(next);
  };

  const start = (resume: boolean) => {
    const saved = resume ? readSaved(quiz.slug) : null;
    const index = Math.min(saved?.index ?? 0, total - 1);
    startedAtRef.current = saved?.startedAt ?? Date.now();
    setAnswers(saved?.answers ?? {});
    if (!saved) writeSaved(quiz.slug, null);
    trackQuiz('quiz_start', { quiz: quiz.slug, resumed: resume ? 1 : 0 });
    goTo({ kind: 'question', index });
  };

  const setAnswer = (key: string, value: QuizAnswerValue, index: number) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setQuestionError(null);
    writeSaved(quiz.slug, { answers: next, index, startedAt: startedAtRef.current });
    return next;
  };

  const advance = (index: number, current: QuizAnswers = answers) => {
    const question = quiz.questions[index]!;
    if (question.required && !isAnswered(current[question.key])) {
      setQuestionError('Responda para continuar.');
      return;
    }
    trackQuiz('quiz_step', { quiz: quiz.slug, step: index + 1, question_key: question.key });
    const nextIndex = index + 1;
    writeSaved(quiz.slug, { answers: current, index: nextIndex, startedAt: startedAtRef.current });
    goTo(nextIndex < total ? { kind: 'question', index: nextIndex } : { kind: 'lead' });
  };

  const submit = () => {
    setLeadErrors({});
    setFormMessage(null);
    startTransition(async () => {
      const state = await submitQuiz({
        slug: quiz.slug,
        answers,
        lead,
        startedAt: startedAtRef.current,
        website: honeypotRef.current?.value,
        turnstileToken: turnstileTokenRef.current,
        pagePath: window.location.pathname,
        attribution: readAttribution(),
      });
      if (state.status === 'success') {
        writeSaved(quiz.slug, null);
        trackQuiz('quiz_complete', {
          quiz: quiz.slug,
          profile: state.result.profile.title,
          service: quiz.projectType,
        });
        goTo({ kind: 'result', result: state.result });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setAttempt((value) => value + 1);
      setFormMessage(state.message);
      setLeadErrors(state.fieldErrors ?? {});
      // Resposta inválida no servidor: volta para a primeira pergunta com problema.
      const firstInvalid = quiz.questions.findIndex((q) => state.questionErrors?.[q.key]);
      if (firstInvalid >= 0) {
        setStage({ kind: 'question', index: firstInvalid });
        setQuestionError(state.questionErrors![quiz.questions[firstInvalid]!.key]!);
      }
    });
  };

  const progress =
    stage.kind === 'question' ? (stage.index + 1) / (total + 1) : stage.kind === 'intro' ? 0 : 1;

  return (
    <div className="quiz-card">
      {stage.kind !== 'intro' && stage.kind !== 'result' && (
        <div
          className="quiz-progress"
          role="progressbar"
          aria-label="Progresso do diagnóstico"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span style={{ width: `${progress * 100}%` }} />
        </div>
      )}

      {stage.kind === 'intro' && (
        <div className="quiz-step">
          <p className="eyebrow">{quiz.eyebrow}</p>
          <h1>{quiz.headline}</h1>
          <p className="quiz-lead">{quiz.description}</p>
          <div className="quiz-actions">
            <button type="button" className="button button-blue" onClick={() => start(false)}>
              {quiz.startLabel} <ArrowRight size={17} aria-hidden="true" />
            </button>
            {hasSaved && (
              <button type="button" className="quiz-link" onClick={() => start(true)}>
                Continuar de onde parei
              </button>
            )}
          </div>
          <p className="quiz-meta">
            {quiz.estimatedTime ? `${quiz.estimatedTime} · ` : ''}
            {total} perguntas · gratuito
          </p>
        </div>
      )}

      {stage.kind === 'question' && (
        <QuestionStep
          key={stage.index}
          headingRef={headingRef}
          question={quiz.questions[stage.index]!}
          index={stage.index}
          total={total}
          value={answers[quiz.questions[stage.index]!.key]}
          error={questionError}
          onChange={(value, autoAdvance) => {
            const next = setAnswer(quiz.questions[stage.index]!.key, value, stage.index);
            if (autoAdvance) setTimeout(() => advance(stage.index, next), 220);
          }}
          onBack={() =>
            goTo(
              stage.index === 0 ? { kind: 'intro' } : { kind: 'question', index: stage.index - 1 },
            )
          }
          onNext={() => advance(stage.index)}
        />
      )}

      {stage.kind === 'lead' && (
        <form
          className="quiz-step"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <p className="eyebrow">ÚLTIMA ETAPA</p>
          <h2 ref={headingRef} tabIndex={-1}>
            {quiz.leadTitle}
          </h2>
          <p className="quiz-lead">{quiz.leadDescription}</p>
          {formMessage && (
            <p className="form-alert" role="alert">
              {formMessage}
            </p>
          )}
          <div className="form-grid">
            <LeadField
              id="name"
              label="Nome"
              required
              autoComplete="name"
              lead={lead}
              setLead={setLead}
              errors={leadErrors}
            />
            <LeadField
              id="email"
              label="E-mail"
              type="email"
              required
              autoComplete="email"
              lead={lead}
              setLead={setLead}
              errors={leadErrors}
            />
            <LeadField
              id="phone"
              label="WhatsApp"
              type="tel"
              required
              autoComplete="tel-national"
              placeholder="(16) 99999-9999"
              lead={lead}
              setLead={setLead}
              errors={leadErrors}
              mask={formatPhone}
            />
            {quiz.askCompany && (
              <LeadField
                id="company"
                label="Empresa"
                autoComplete="organization"
                lead={lead}
                setLead={setLead}
                errors={leadErrors}
              />
            )}
            {quiz.askRole && (
              <LeadField
                id="role"
                label="Cargo"
                autoComplete="organization-title"
                lead={lead}
                setLead={setLead}
                errors={leadErrors}
              />
            )}
          </div>
          <div className="field-check">
            <input
              id="quiz-consent"
              type="checkbox"
              checked={lead.consent}
              aria-invalid={leadErrors.consent ? true : undefined}
              aria-describedby={leadErrors.consent ? 'quiz-consent-error' : undefined}
              onChange={(e) => setLead({ ...lead, consent: e.target.checked })}
            />
            <label htmlFor="quiz-consent">
              Concordo com o uso destes dados para a TTech enviar o resultado e entrar em contato,
              conforme a <Link href="/politica-de-privacidade">política de privacidade</Link>.
            </label>
            {leadErrors.consent && (
              <p className="field-error" id="quiz-consent-error">
                {leadErrors.consent}
              </p>
            )}
          </div>
          <div className="form-honeypot" aria-hidden="true">
            <label htmlFor="quiz-website">Não preencha este campo</label>
            <input
              id="quiz-website"
              ref={honeypotRef}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <Turnstile
            onToken={(token) => {
              turnstileTokenRef.current = token;
            }}
            resetSignal={attempt}
          />
          <div className="quiz-nav">
            <button
              type="button"
              className="quiz-link"
              onClick={() => goTo({ kind: 'question', index: total - 1 })}
            >
              <ArrowLeft size={17} aria-hidden="true" /> Voltar
            </button>
            <button type="submit" className="button button-blue" disabled={pending}>
              {pending ? (
                <>
                  Calculando… <LoaderCircle size={17} className="spin" aria-hidden="true" />
                </>
              ) : (
                <>
                  {quiz.submitLabel} <ArrowRight size={17} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {stage.kind === 'result' && (
        <div className="quiz-step quiz-result" role="status">
          <p className="eyebrow">SEU RESULTADO</p>
          <h2 ref={headingRef} tabIndex={-1}>
            {stage.result.profile.title}
          </h2>
          <p className="quiz-lead">{stage.result.profile.summary}</p>
          {stage.result.solutions.length > 0 && (
            <>
              <h3 className="quiz-subtitle">O que faz sentido para a sua operação</h3>
              <ul className="quiz-solutions">
                {stage.result.solutions.map((solution) => (
                  <li key={solution.title}>
                    <span className="quiz-solution-check">
                      <Check size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>{solution.title}</strong>
                      <p>{solution.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="quiz-result-cta">
            <p>
              <CircleCheck size={18} aria-hidden="true" /> Recebemos seu diagnóstico. Para dar o
              próximo passo, converse com a TTech.
            </p>
            <WhatsAppLink
              message={stage.result.whatsappMessage}
              context={quiz.projectType}
              location="quiz-result"
            >
              Conversar sobre o resultado
            </WhatsAppLink>
          </div>
          <button
            type="button"
            className="quiz-link"
            onClick={() => {
              setAnswers({});
              setLead(emptyLead);
              goTo({ kind: 'intro' });
            }}
          >
            <RotateCcw size={16} aria-hidden="true" /> Refazer o diagnóstico
          </button>
        </div>
      )}
    </div>
  );
}

function QuestionStep({
  question,
  index,
  total,
  value,
  error,
  headingRef,
  onChange,
  onBack,
  onNext,
}: {
  question: PublicQuestion;
  index: number;
  total: number;
  value: QuizAnswerValue | undefined;
  error: string | null;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onChange: (value: QuizAnswerValue, autoAdvance?: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const id = `q-${question.key}`;
  const errorId = `${id}-error`;
  const selected = Array.isArray(value) ? value : [];

  return (
    <div className="quiz-step">
      <p className="quiz-counter">
        Pergunta {index + 1} de {total}
      </p>
      <fieldset className="quiz-fieldset" aria-describedby={error ? errorId : undefined}>
        <legend>
          <h2 ref={headingRef} tabIndex={-1}>
            {question.question}
            {!question.required && <span className="quiz-optional"> (opcional)</span>}
          </h2>
        </legend>
        {question.help && <p className="quiz-help">{question.help}</p>}
        {question.type === 'multiple' && (
          <p className="quiz-help">
            {question.maxSelections
              ? `Marque até ${question.maxSelections} opções.`
              : 'Marque todas as que se aplicam.'}
          </p>
        )}

        {(question.type === 'single' || question.type === 'multiple') && (
          <div className="quiz-options">
            {question.options.map((option) => {
              const checked =
                question.type === 'single' ? value === option : selected.includes(option);
              const limitReached =
                question.type === 'multiple' &&
                !checked &&
                !!question.maxSelections &&
                selected.length >= question.maxSelections;
              return (
                <label key={option} className={checked ? 'quiz-option is-checked' : 'quiz-option'}>
                  <input
                    type={question.type === 'single' ? 'radio' : 'checkbox'}
                    name={id}
                    value={option}
                    checked={checked}
                    disabled={limitReached}
                    onChange={() => {
                      if (question.type === 'single') onChange(option, true);
                      else
                        onChange(
                          checked ? selected.filter((s) => s !== option) : [...selected, option],
                        );
                    }}
                  />
                  <span className="quiz-option-mark" aria-hidden="true">
                    {checked && <Check size={14} />}
                  </span>
                  {option}
                </label>
              );
            })}
          </div>
        )}

        {question.type === 'scale' && (
          <div className="quiz-scale">
            <div className="quiz-scale-options">
              {[1, 2, 3, 4, 5].map((n) => (
                <label
                  key={n}
                  className={value === n ? 'quiz-scale-option is-checked' : 'quiz-scale-option'}
                >
                  <input
                    type="radio"
                    name={id}
                    value={n}
                    checked={value === n}
                    onChange={() => onChange(n, true)}
                  />
                  {n}
                </label>
              ))}
            </div>
            <div className="quiz-scale-labels" aria-hidden="true">
              <span>{question.minLabel}</span>
              <span>{question.maxLabel}</span>
            </div>
          </div>
        )}

        {question.type === 'number' && (
          <div className="field quiz-number">
            <label htmlFor={id} className="sr-only">
              {question.question}
            </label>
            <input
              id={id}
              type="number"
              inputMode="numeric"
              min={0}
              placeholder={question.placeholder ?? undefined}
              value={typeof value === 'number' ? value : ''}
              aria-invalid={error ? true : undefined}
              onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
              onKeyDown={(e) => e.key === 'Enter' && onNext()}
            />
            {question.unit && <span className="quiz-unit">{question.unit}</span>}
          </div>
        )}

        {question.type === 'text' && (
          <div className="field">
            <label htmlFor={id} className="sr-only">
              {question.question}
            </label>
            <textarea
              id={id}
              rows={4}
              maxLength={1000}
              placeholder={question.placeholder ?? undefined}
              value={typeof value === 'string' ? value : ''}
              aria-invalid={error ? true : undefined}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        )}
      </fieldset>

      {error && (
        <p className="field-error quiz-error" id={errorId} role="alert">
          {error}
        </p>
      )}

      <div className="quiz-nav">
        <button type="button" className="quiz-link" onClick={onBack}>
          <ArrowLeft size={17} aria-hidden="true" /> Voltar
        </button>
        {question.type !== 'single' && question.type !== 'scale' ? (
          <button type="button" className="button button-blue" onClick={onNext}>
            {index + 1 === total ? 'Continuar' : 'Próxima'}{' '}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        ) : (
          isAnswered(value) && (
            <button type="button" className="button button-blue" onClick={onNext}>
              Próxima <ArrowRight size={17} aria-hidden="true" />
            </button>
          )
        )}
      </div>
    </div>
  );
}

function LeadField({
  id,
  label,
  type = 'text',
  required = false,
  autoComplete,
  placeholder,
  lead,
  setLead,
  errors,
  mask,
}: {
  id: 'name' | 'email' | 'phone' | 'company' | 'role';
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  lead: QuizLeadInput;
  setLead: (lead: QuizLeadInput) => void;
  errors: Partial<Record<keyof QuizLead, string>>;
  mask?: (value: string) => string;
}) {
  const inputId = `quiz-${id}`;
  return (
    <div className="field">
      <label htmlFor={inputId}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={(lead[id] as string) ?? ''}
        aria-invalid={errors[id] ? true : undefined}
        aria-describedby={errors[id] ? `${inputId}-error` : undefined}
        onChange={(e) => setLead({ ...lead, [id]: mask ? mask(e.target.value) : e.target.value })}
      />
      {errors[id] && (
        <p className="field-error" id={`${inputId}-error`}>
          {errors[id]}
        </p>
      )}
    </div>
  );
}
