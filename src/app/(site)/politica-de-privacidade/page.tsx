import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Política de privacidade',
  description: 'Como a TTech Consulting trata as informações de quem visita o site.',
  path: '/politica-de-privacidade',
});

export default function Privacidade() {
  return (
    <main id="conteudo" className="legal-page container">
      <p className="eyebrow">INFORMAÇÕES IMPORTANTES</p>
      <h1>Política de privacidade</h1>
      <p>Esta página explica o tratamento de informações no site da TTech Consulting.</p>
      <h2>Contato e dados enviados</h2>
      <p>
        Ao entrar em contato, o navegador abre o WhatsApp. O conteúdo enviado é usado para responder
        à solicitação e conduzir a conversa comercial. Não envie senhas, credenciais ou dados
        sensíveis no primeiro contato.
      </p>
      <h2>Formulário de contato</h2>
      <p>
        Ao enviar o formulário, coletamos nome, e-mail, WhatsApp, empresa, tipo de projeto e a
        mensagem escrita, além da página e dos parâmetros de campanha da visita. Esses dados são
        usados apenas para responder ao contato e conduzir a conversa comercial, com base no seu
        consentimento. O envio é processado pelo serviço EmailJS, que entrega a mensagem ao e-mail
        da TTech. Os dados não são vendidos nem compartilhados para outras finalidades.
      </p>
      <h2>Cookies e mensuração</h2>
      <p>
        Com o seu consentimento, o site utiliza ferramentas de análise e de publicidade (como Google
        Analytics, Google Ads e Meta) para medir visitas, entender o desempenho das páginas e das
        campanhas e registrar cliques nos botões de contato. Parâmetros de campanha presentes no
        endereço de acesso (como utm_source) são mantidos apenas durante a visita. Sem
        consentimento, essas ferramentas funcionam de forma restrita, sem armazenar cookies de
        análise ou publicidade. Você pode rever a escolha limpando os dados do site no navegador.
      </p>
      <h2>Dados de navegação</h2>
      <p>
        A infraestrutura de hospedagem pode registrar dados técnicos necessários ao funcionamento e
        à segurança do site, como endereço IP e requisições.
      </p>
      <h2>Direitos e contato</h2>
      <p>
        Para solicitar acesso, correção ou exclusão de informações enviadas à TTech, escreva para{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Dados poderão ser mantidos quando houver
        obrigação legal aplicável.
      </p>
      <h2>Responsável</h2>
      <p>
        {site.legalName} · CNPJ {site.cnpj} · Ribeirão Preto, SP.
      </p>
      <p>Atualizada em setembro de 2026.</p>
    </main>
  );
}
