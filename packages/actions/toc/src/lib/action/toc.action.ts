import { tick } from 'svelte';

import { compareParameters, resolveParameters, restoreTocItems, transformTocItems } from './toc.operations';
import type { TocParameters, TocEventDetails, TocEventItemDetails, ResolvedTocParameters } from './toc.types';

const cache: Record<string, {
  parameters: ResolvedTocParameters;
  items: TocEventItemDetails[];
}> = {};

/**
 * Find matching DOM elements for building table of contents
 * @public
 *
 * @remarks
 *
 * `toc` will search for DOM elements that are descendants of the HTMLElement that
 * `toc` is used on. Typically you want that to be `<body>`.
 *
 * ```svelte
 * <script>
 *   import { toc } from '@svelte-put/toc';
 * </script>
 *
 * <svelte:body use:toc />
 * ```
 *
 * @param node - the HTMLElement under which `toc` will look for matching elements
 * @param parameters - {@link TocParameters} svelte action parameters
 * @returns svelte action interface
 */
export function toc(node: HTMLElement, parameters: Partial<TocParameters> = {}) {
  let resolved = resolveParameters(parameters);

  let elements: Element[] = [];

  function extract() {
    let id = node.getAttribute('data-toc-id') || '';
    let items: TocEventItemDetails[];
    elements = Array.from(node.querySelectorAll(resolved.selector));
    if (id && cache[id] && compareParameters(cache[id].parameters, resolved)) {
      items = cache[id].items;
    } else {
      id = crypto.randomUUID();
      items = transformTocItems(elements as HTMLElement[], resolved);
      cache[id] = { items, parameters: resolved };
      node.setAttribute('data-toc-id', id);
    }

    const detail: TocEventDetails = { items, id };
    node.dispatchEvent(new CustomEvent('toc', { detail }));
    return detail;
  }

  function cleanup() {
    const id = node.getAttribute('data-toc-id') || '';
    if (id) {
      delete cache[id];
    }
    restoreTocItems(elements as HTMLElement[], resolved);
  }

  // svelte's onMount is more appropriate here instead of setTimeout.
  // But currently, due to this bug: https://github.com/sveltejs/svelte/issues/7735
  // it is not working as intended, setTimeout here is a temporary solution
  // it might not work if a large-contented page takes too long to render?
  setTimeout(async () => {
    await tick();
    const { items } = extract();
    if (resolved.stimulateHashNavigation) {
      const hash = location.hash?.substring(1);
      if (hash) {
        let matched: HTMLElement | undefined;
        for (const item of items) {
          if (item.id === hash) {
            matched = item.anchor ?? item.element;
          }
        }
        if (matched) {
          await tick();
          matched.click();
        }
      }
    }
  }, 50);

  return {
    update(update: Partial<TocParameters>) {
      const newResolved = resolveParameters(update);
      cleanup();
      resolved = newResolved;
      extract();
    },
    destroy() {
      cleanup();
    },
  };
}
