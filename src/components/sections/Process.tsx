const steps = [
  [
    '01',
    'Entendimento',
    'Conhecemos o processo, o problema e o resultado que a empresa precisa alcançar.',
  ],
  ['02', 'Direção', 'Organizamos prioridades e definimos uma primeira entrega clara e viável.'],
  ['03', 'Construção', 'Desenvolvemos e validamos a solução em etapas junto aos responsáveis.'],
  ['04', 'Evolução', 'Acompanhamos o uso e planejamos melhorias a partir do aprendizado real.'],
] as const;

export function Process() {
  return (
    <div className="process-grid">
      {steps.map(([number, title, description]) => (
        <div className="process-step" key={number}>
          <span>{number}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}
