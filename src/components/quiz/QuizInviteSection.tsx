import Link from 'next/link';
import { ArrowRight, ClipboardCheck } from 'lucide-react';
import type { QuizInvite } from '@/lib/content-types';

/** Convite para o diagnóstico do nicho, exibido nas landing pages. */
export function QuizInviteSection({ quiz }: { quiz: QuizInvite }) {
  return (
    <section className="section quiz-invite-section">
      <div className="container">
        <div className="quiz-invite">
          <div className="quiz-invite-icon" aria-hidden="true">
            <ClipboardCheck size={30} strokeWidth={1.6} />
          </div>
          <div className="quiz-invite-text">
            <p className="eyebrow">{quiz.eyebrow}</p>
            <h2>{quiz.headline}</h2>
            <p>{quiz.description}</p>
          </div>
          <div className="quiz-invite-action">
            <Link className="button button-blue" href={`/diagnostico/${quiz.slug}`}>
              {quiz.startLabel} <ArrowRight size={17} aria-hidden="true" />
            </Link>
            {quiz.estimatedTime && <span>{quiz.estimatedTime} · gratuito</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
