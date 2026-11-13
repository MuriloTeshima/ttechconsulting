import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getQuizInvites } from '@/lib/cms';

/** Home page entry to the assessments: one row per published quiz. */
export async function DiagnosticPicker() {
  const quizzes = await getQuizInvites();
  if (!quizzes.length) return null;

  return (
    <section className="section diagnostic-section" aria-labelledby="diagnostico-title">
      <div className="container">
        <div className="diagnostic-panel">
          <div className="diagnostic-intro">
            <h2 id="diagnostico-title">Não sabe por onde começar?</h2>
            <p>
              Escolha o diagnóstico mais próximo da sua situação. São 8 perguntas, cerca de 2
              minutos, e no fim você vê qual primeiro passo faz mais sentido. É gratuito.
            </p>
          </div>
          <ul className="diagnostic-list">
            {quizzes.map((quiz) => (
              <li key={quiz.slug}>
                <Link href={`/diagnostico/${quiz.slug}`}>
                  <span>{quiz.headline}</span>
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
