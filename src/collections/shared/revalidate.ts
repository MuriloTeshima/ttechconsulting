import { revalidatePath } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  RequestContext,
} from 'payload';

/**
 * Atualiza as páginas estáticas do site depois de uma alteração no CMS.
 * O site é pequeno, então revalidar tudo é mais simples e seguro do que mapear rota a rota.
 * Fora do Next (seed, CLI do Payload) não há o que revalidar; por isso o try/catch.
 */
function revalidateSite(context: RequestContext) {
  if (context.disableRevalidate) return;
  try {
    revalidatePath('/', 'layout');
  } catch {
    // Executado fora de uma requisição do Next.js.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, context }) => {
  revalidateSite(context);
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, context }) => {
  revalidateSite(context);
  return doc;
};

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, context }) => {
  revalidateSite(context);
  return doc;
};

export const revalidateHooks = {
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
};
