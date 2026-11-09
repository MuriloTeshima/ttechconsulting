'use client';

import { useRowLabel } from '@payloadcms/ui';

const blockTypes: Record<string, string> = {
  single: 'Escolha única',
  multiple: 'Múltipla escolha',
  scale: 'Escala',
  number: 'Número',
  text: 'Texto livre',
};

type Row = { question?: string; title?: string; label?: string; blockType?: string };

/** Row label in the panel: the question type and text, instead of "Sem título" (untitled). */
export function RowTitleLabel() {
  const { data, rowNumber } = useRowLabel<Row>();
  const text = data?.question || data?.title || data?.label;
  const type = data?.blockType ? blockTypes[data.blockType] : undefined;
  const fallback = `Item ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`;
  return <span>{type ? `${type} · ${text || fallback}` : text || fallback}</span>;
}
