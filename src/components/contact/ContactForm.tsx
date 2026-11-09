'use client';

import Link from 'next/link';
import { useActionState, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { ArrowUpRight, CircleCheck, LoaderCircle } from 'lucide-react';
import { sendContact } from '@/app/actions/contact';
import { trackFormSubmit } from '@/lib/analytics';
import { readAttribution } from '@/lib/attribution';
import { formatPhone } from '@/lib/phone';
import {
  isProjectType,
  projectTypes,
  SELECT_PROJECT_EVENT,
  type ContactField,
  type ContactState,
  type ProjectType,
} from '@/lib/contact-schema';
import { Turnstile } from './Turnstile';

type ContactFormProps = {
  /** Where the form sits on the page; sent to the dataLayer as cta_location. */
  location: string;
  defaultProjectType?: ProjectType;
};

const initialState: ContactState = { status: 'idle' };

export function ContactForm(props: ContactFormProps) {
  // Changing the key remounts a clean form after a successful submission.
  const [formKey, setFormKey] = useState(0);
  return <ContactFormBody key={formKey} {...props} onReset={() => setFormKey((key) => key + 1)} />;
}

function ContactFormBody({
  location,
  defaultProjectType,
  onReset,
}: ContactFormProps & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef(0);
  const submittedTypeRef = useRef('');
  const successRef = useRef<HTMLDivElement>(null);
  const values = state.values ?? {};
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const set = (name: string, value: string) => {
      const input = form.elements.namedItem(name);
      if (input instanceof HTMLInputElement) input.value = value;
    };
    // Fill time counts from when the form opened, not from the last attempt.
    if (!startedAtRef.current) startedAtRef.current = Date.now();
    set('startedAt', String(startedAtRef.current));
    set('pagePath', window.location.pathname);
    set('attribution', JSON.stringify(readAttribution()));
  }, [state]);

  // Project type preselection: from the URL's ?tipo= (coming from another page)
  // or from the event fired by a button on the same page.
  useEffect(() => {
    const select = (type: string) => {
      const field = formRef.current?.elements.namedItem('projectType');
      if (field instanceof HTMLSelectElement && isProjectType(type)) field.value = type;
    };
    const fromUrl = new URLSearchParams(window.location.search).get('tipo');
    if (fromUrl) select(fromUrl);
    const onSelect = (event: Event) => select(String((event as CustomEvent).detail));
    window.addEventListener(SELECT_PROJECT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PROJECT_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (state.status === 'success') {
      trackFormSubmit({ location, projectType: submittedTypeRef.current });
      successRef.current?.focus();
    }
    if (state.status === 'error') {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [state, location]);

  if (state.status === 'success') {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
        <CircleCheck size={34} strokeWidth={1.6} aria-hidden="true" />
        <h3>Mensagem enviada.</h3>
        <p>Obrigado pelo contato. Vamos responder pelo e-mail ou WhatsApp que você informou.</p>
        <button type="button" className="text-link" onClick={onReset}>
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const fieldProps = (name: ContactField) => ({
    id: `${location}-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${location}-${name}-error` : undefined,
  });

  const error = (name: ContactField) =>
    errors[name] && (
      <p className="field-error" id={`${location}-${name}-error`}>
        {errors[name]}
      </p>
    );

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(event) => {
        const type = event.currentTarget.elements.namedItem('projectType');
        submittedTypeRef.current = type instanceof HTMLSelectElement ? type.value : '';
      }}
      className="contact-form"
      noValidate
    >
      {state.status === 'error' && state.message && (
        <p className="form-alert" role="alert">
          {state.message}
        </p>
      )}

      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${location}-name`}>
            Nome <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps('name')}
            type="text"
            autoComplete="name"
            required
            defaultValue={values.name}
          />
          {error('name')}
        </div>

        <div className="field">
          <label htmlFor={`${location}-company`}>Empresa</label>
          <input
            {...fieldProps('company')}
            type="text"
            autoComplete="organization"
            defaultValue={values.company}
          />
          {error('company')}
        </div>

        <div className="field">
          <label htmlFor={`${location}-email`}>
            E-mail <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={values.email}
          />
          {error('email')}
        </div>

        <div className="field">
          <label htmlFor={`${location}-phone`}>
            WhatsApp <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps('phone')}
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            placeholder="(16) 99999-9999"
            required
            defaultValue={values.phone}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              event.target.value = formatPhone(event.target.value);
            }}
          />
          {error('phone')}
        </div>

        <div className="field field-full">
          <label htmlFor={`${location}-projectType`}>
            Tipo de projeto <span aria-hidden="true">*</span>
          </label>
          <select
            {...fieldProps('projectType')}
            required
            defaultValue={values.projectType || defaultProjectType || ''}
          >
            <option value="" disabled>
              Selecione
            </option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {error('projectType')}
        </div>

        <div className="field field-full">
          <label htmlFor={`${location}-message`}>
            Como podemos ajudar? <span aria-hidden="true">*</span>
          </label>
          <textarea
            {...fieldProps('message')}
            rows={5}
            required
            placeholder="Conte como o processo funciona hoje e o que você gostaria de melhorar."
            defaultValue={values.message}
          />
          {error('message')}
        </div>
      </div>

      <div className="field-check">
        <input
          {...fieldProps('consent')}
          type="checkbox"
          required
          defaultChecked={values.consent === 'on'}
        />
        <label htmlFor={`${location}-consent`}>
          Concordo com o uso destes dados para a TTech responder ao meu contato, conforme a{' '}
          <Link href="/politica-de-privacidade">política de privacidade</Link>.
        </label>
        {error('consent')}
      </div>

      {/* A new token on each attempt, since the server already used the previous one. */}
      <Turnstile resetSignal={state} />

      {/* Control fields: bot trap and visit context. */}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor={`${location}-website`}>Não preencha este campo</label>
        <input
          id={`${location}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="startedAt" />
      <input type="hidden" name="pagePath" />
      <input type="hidden" name="attribution" />

      <button type="submit" className="button button-blue form-submit" disabled={pending}>
        {pending ? (
          <>
            Enviando… <LoaderCircle size={17} className="spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Enviar mensagem <ArrowUpRight size={17} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
