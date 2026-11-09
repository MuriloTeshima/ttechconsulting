const steps = [
  ['Entender', 'o processo e as pessoas'],
  ['Direcionar', 'a primeira entrega'],
  ['Construir', 'em etapas validadas'],
  ['Evoluir', 'a partir do uso real'],
] as const;

/** Hero card with TTech's way of working. */
export function MethodCard() {
  return (
    <div className="method-card">
      <p className="method-label">NOSSO MÉTODO</p>
      <p className="method-title">
        Primeiro o processo.
        <br />
        <em>Depois o código.</em>
      </p>
      <ol className="method-steps">
        {steps.map(([title, text], index) => (
          <li key={title}>
            <span className="method-dot" aria-hidden="true" />
            <div>
              <strong>
                <small>0{index + 1}</small>
                {title}
              </strong>
              <span>{text}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
