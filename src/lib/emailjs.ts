import 'server-only';
import { site } from '@/config/site';
import { projectTypes, type ContactData } from './contact-schema';

const ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

function emailjsConfig() {
  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } =
    process.env;
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
    return null;
  }
  return {
    serviceId: EMAILJS_SERVICE_ID,
    templateId: EMAILJS_TEMPLATE_ID,
    publicKey: EMAILJS_PUBLIC_KEY,
    privateKey: EMAILJS_PRIVATE_KEY,
  };
}

export function isEmailConfigured() {
  return emailjsConfig() !== null;
}

export type LeadContext = { pagePath?: string; attribution?: Record<string, string> };

/**
 * Envia o lead pela API REST do EmailJS a partir do servidor, com a chave privada.
 * Exige "Allow EmailJS API for non-browser applications" ativo em Account > Security.
 * As variáveis abaixo precisam existir no template do EmailJS.
 */
export async function sendLeadEmail(data: ContactData, context: LeadContext) {
  const config = emailjsConfig();
  if (!config) throw new Error('EmailJS não configurado');

  const projectLabel =
    projectTypes.find((type) => type.value === data.projectType)?.label ?? data.projectType;
  const phoneDigits = data.phone.replace(/\D/g, '');
  // Até 11 dígitos é DDD + número; acima disso o código do país já veio junto.
  const whatsappNumber = phoneDigits.length <= 11 ? `55${phoneDigits}` : phoneDigits;
  const attribution = Object.entries(context.attribution ?? {})
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      accessToken: config.privateKey,
      template_params: {
        to_email: process.env.CONTACT_TO || site.email,
        name: data.name.replace(/[\r\n]+/g, ' '),
        email: data.email,
        phone: data.phone,
        whatsapp_link: `https://wa.me/${whatsappNumber}`,
        company: data.company || '—',
        project_type: projectLabel,
        message: data.message,
        page: context.pagePath || '—',
        attribution: attribution || '—',
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`EmailJS ${response.status}: ${await response.text()}`);
  }
}
