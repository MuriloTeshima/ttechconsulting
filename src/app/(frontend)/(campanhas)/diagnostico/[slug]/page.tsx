import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/analytics/JsonLd';
import { Logo } from '@/components/Logo';
import { CampaignFooter } from '@/components/layout/CampaignShell';
import { PreviewBanner } from '@/components/PreviewBanner';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { getQuiz, getQuizSlugs } from '@/lib/cms';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

// New quizzes published in the CMS open without a new build.
export async function generateStaticParams() {
  return (await getQuizSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode();
  const quiz = await getQuiz((await params).slug, draft);
  if (!quiz) return {};
  return pageMetadata({
    title: quiz.metaTitle,
    description: quiz.metaDescription,
    path: `/diagnostico/${quiz.slug}`,
    index: quiz.index,
  });
}

export default async function QuizPage({ params }: Props) {
  const { isEnabled: draft } = await draftMode();
  const quiz = await getQuiz((await params).slug, draft);
  if (!quiz) notFound();
  const path = `/diagnostico/${quiz.slug}`;

  return (
    <>
      {draft && <PreviewBanner path={path} />}
      <header className="site-header">
        <div className="container header-inner">
          <Logo priority />
        </div>
      </header>
      <main id="conteudo" className="quiz-page">
        <div className="container quiz-container">
          <QuizRunner quiz={quiz} />
          <p className="quiz-privacy">
            Seus dados são usados apenas para enviar o resultado e para a TTech entrar em contato.
          </p>
        </div>
      </main>
      <CampaignFooter />
      <JsonLd data={breadcrumbSchema([{ name: quiz.title, path }])} />
    </>
  );
}
