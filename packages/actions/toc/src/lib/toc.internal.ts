import { ATTRIBUTES } from './toc.attributes';
import type { TocItem } from './toc.item';
import type { ResolvedTocParameters } from './toc.parameters';
import { slugify } from './toc.utils';
/**
 * @internal
 */
export type TocCacheItem = {
  parameters: ResolvedTocParameters;
  items: Record<string, TocItem>;
  activeTocItemId?: string;
  observeThrottled: boolean;
};

/**
 * @internal
 */
export const cache: Record<string, TocCacheItem> = {};

/**
 * @internal
 */
export const intersectionObserverCallback: (
  callback: (activeTocItemId?: string) => void,
) => IntersectionObserverCallback = (callback) => {
  return (entries) => {
    for (const entry of entries) {
      const tocId = entry.target.getAttribute(ATTRIBUTES.observeFor);
      if (tocId && entry.isIntersecting) {
        callback(tocId);
      }
    }
  };
};

/**
 * @internal
 */
export function extractElementText(element: HTMLElement): string {
  if (element.hasAttribute(ATTRIBUTES.autoslug)) {
    // pre-processed by `@svelte-put/preprocess-auto-slug`
    // must strip out `textContent` from any nested anchor element
    return Array.from(element.childNodes).reduce((acc, child) => {
      if (
        child.nodeType !== Node.ELEMENT_NODE ||
        !(child as Element).hasAttribute(ATTRIBUTES.autoSlugAnchor)
      ) {
        acc += child.textContent || '';
      }
      return acc;
    }, '');
  }
  return element.textContent || '';
}

/**
 * @internal
 */
export function extractTocItemId(element: HTMLElement, fallbackText: string): string {
  let tocId = element.id;
  const dataTocId = element.getAttribute(ATTRIBUTES.id);
  if (dataTocId) {
    tocId = dataTocId;
  } else if (!tocId) {
    tocId = slugify(fallbackText.slice(0, 100));
  }
  return tocId;
}

/**
 * @internal
 */
export function processScrollMarginTop(
  element: HTMLElement,
  scrollMarginTop: ResolvedTocParameters['scrollMarginTop'],
) {
  if (!scrollMarginTop) return '';
  const r1 = typeof scrollMarginTop === 'function' ? scrollMarginTop(element) : scrollMarginTop;
  if (!r1) return '';
  const r2 = typeof r1 === 'number' ? `${r1}px` : r1;
  if (r2) {
    element.style.scrollMarginTop = r2;
  }
  return r2;
}

/**
 * @internal
 */
export function isAutoSlugInjectedAnchor(element: Element | null | undefined) {
  if (!element) return false;
  return element.tagName === 'A' && element.hasAttribute(ATTRIBUTES.autoSlugAnchor);
}
/**
 * @internal
 */
export function processAnchor(
  element: HTMLElement,
  anchor: ResolvedTocParameters['anchor'],
  tocId: string,
) {
  let a: HTMLAnchorElement | undefined = undefined;
  if (anchor.enabled) {
    // only handle anchor & DOM transformation if not already done
    // by `@svelte-put/preprocess-auto-slug`
    if (!element.hasAttribute(ATTRIBUTES.autoslug)) {
      a = document.createElement('a');
      for (const [key, value] of Object.entries(anchor.properties)) {
        a.setAttribute(key, value);
      }
      a.href = typeof anchor.href === 'function' ? anchor.href(tocId) : `#${tocId}`;
      a.textContent = anchor.content;
      switch (anchor.position) {
        case 'before':
          element.parentNode?.insertBefore(a, element);
          break;
        case 'prepend':
          element.insertBefore(a, element.firstChild);
          break;
        case 'wrap':
          a.innerHTML = element.outerHTML;
          element.parentNode?.replaceChild(a, element);
          break;
        case 'append':
          element.appendChild(a);
          break;
        case 'after':
          element.parentNode?.insertBefore(a, element.nextSibling);
          break;
      }
      a.toggleAttribute(ATTRIBUTES.anchor, true);
    } else {
      // already processed by `@svelte-put/preprocess-auto-slug`
      // search for the injected anchor element
      const autoSlugAnchorPosition = element.getAttribute(ATTRIBUTES.autoSlugAnchorPosition);
      if (autoSlugAnchorPosition) {
        switch (autoSlugAnchorPosition) {
          case 'before': {
            const previousElement = element.previousElementSibling;
            if (isAutoSlugInjectedAnchor(previousElement)) {
              a = previousElement as HTMLAnchorElement;
            }
            break;
          }
          case 'prepend':
          case 'append': {
            a = element.querySelector(`a[${ATTRIBUTES.autoSlugAnchor}]`) as HTMLAnchorElement;
            break;
          }
          case 'after': {
            const nextElement = element.nextElementSibling;
            if (isAutoSlugInjectedAnchor(nextElement)) {
              a = nextElement as HTMLAnchorElement;
            }
            break;
          }
          case 'wrap': {
            const parentElement = element.parentElement;
            if (isAutoSlugInjectedAnchor(parentElement)) {
              a = parentElement as HTMLAnchorElement;
            }
            break;
          }
        }
      }

      if (!a) {
        const previousElement = element.previousElementSibling;
        const nextElement = element.nextElementSibling;
        const parentElement = element.parentElement;
        if (isAutoSlugInjectedAnchor(previousElement)) {
          a = previousElement as HTMLAnchorElement;
        } else if (isAutoSlugInjectedAnchor(nextElement)) {
          a = nextElement as HTMLAnchorElement;
        } else if (isAutoSlugInjectedAnchor(parentElement)) {
          a = parentElement as HTMLAnchorElement;
        } else {
          a = element.querySelector(`a[${ATTRIBUTES.autoSlugAnchor}]`) as HTMLAnchorElement;
        }
      }
    }
  }
  return a;
}

/**
 * @internal
 */
export function processObserve(
  element: HTMLElement,
  observe: ResolvedTocParameters['observe'],
  tocId: string,
  updateActiveTocItem: (activeTocItemId?: string) => void,
  observerPool: Record<number, IntersectionObserver>,
): TocItem['observe'] {
  if (!observe.enabled) return undefined;
  const parentElement = element.parentElement;
  let rStrategy: Exclude<ResolvedTocParameters['observe']['strategy'], 'auto'>;
  const userDefinedStrategy =
    (element.getAttribute(ATTRIBUTES.strategy) as ResolvedTocParameters['observe']['strategy']) ||
    observe.strategy;
  if (typeof userDefinedStrategy !== 'number' && userDefinedStrategy !== 'auto') {
    rStrategy = userDefinedStrategy;
  } else if (parentElement && parentElement.offsetHeight / window.innerHeight < 0.8) {
    rStrategy = 'parent';
  } else {
    rStrategy = 'self';
  }
  let nodeToObserve: HTMLElement;
  switch (rStrategy) {
    case 'self':
      nodeToObserve = element;
      break;
    case 'parent':
      nodeToObserve = element.parentElement as HTMLElement;
      break;
  }
  let threshold: number;
  if (element.hasAttribute(ATTRIBUTES.threshold)) {
    threshold = parseFloat(element.getAttribute(ATTRIBUTES.threshold) || '0');
  } else {
    threshold =
      typeof observe.threshold === 'function' ? observe.threshold(element) : observe.threshold;
  }
  const { root, rootMargin } = observe;
  nodeToObserve.setAttribute(ATTRIBUTES.observeFor, tocId);
  let observer: IntersectionObserver;
  if (observerPool[threshold]) {
    observer = observerPool[threshold];
  } else {
    observer = new IntersectionObserver(intersectionObserverCallback(updateActiveTocItem), {
      threshold,
      rootMargin,
      root,
    });
    observerPool[threshold] = observer;
  }
  observer.observe(nodeToObserve);
  return { strategy: rStrategy, observer, threshold, element: nodeToObserve };
}

/**
 * @internal
 */
export function findTocRoot(element: HTMLElement, tocId?: string) {
  if (tocId) return document.querySelector(`[${ATTRIBUTES.root}="${tocId}"]`);
  else return element.closest(`[${ATTRIBUTES.root}]`);
}
