import { onMount, tick } from 'svelte';

import { resolveParameters, restoreTocItems, transformTocItems } from './toc.operations';
import type { TocParameters, TocEventDetails, TocEventItemDetails } from './toc.types';

const cache: Record<string, TocEventItemDetails[]> = {};

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

  let elements: Element[];

  function extract() {
    let id = node.getAttribute('data-toc-id') || '';
    let items: TocEventItemDetails[];
    elements = Array.from(node.querySelectorAll(resolved.selector));
    if (id) {
      // FIXME: potential problem: parameters might change => need to rerun
      // solution: also compare the resolved parameters
      items = cache[id];
    } else {
      id = crypto.randomUUID();
      items = transformTocItems(elements as HTMLElement[], resolved);
      cache[id] = items;
      node.setAttribute('data-toc-id', id);
    }

    const detail: TocEventDetails = { items, id };
    setTimeout(() => {
      node.dispatchEvent(new CustomEvent('toc', { detail }));
    }, 0);
    return detail;
  }

  function cleanup() {
    restoreTocItems(elements as HTMLElement[], resolved);
  }

  onMount(async () => {
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
  });

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
