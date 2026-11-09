import { revalidatePath } from 'next/cache';
import { after } from 'next/server';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  RequestContext,
} from 'payload';

/**
 * Refreshes the site's static pages after a CMS change.
 * The site is small, so revalidating everything is simpler and safer than mapping route by route.
 *
 * Payload hooks run inside the database transaction, before the commit. A page
 * regenerated in that gap would read the old data (it happened with the sitemap). That's why there's
 * a second revalidation in `after()`, which runs after the response, once the commit is done.
 * The sitemap is dynamic and doesn't depend on this revalidation.
 * Outside Next (seed, Payload CLI) there's nothing to revalidate, hence the try/catch.
 */
function revalidateSite(context: RequestContext) {
  if (context.disableRevalidate) return;
  try {
    revalidatePath('/', 'layout');
    after(() => revalidatePath('/', 'layout'));
  } catch {
    // Running outside a Next.js request.
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
