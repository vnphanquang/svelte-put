import { ATTRIBUTES } from '../attributes/index.js';
import { slugify } from '../utils/index.js';
/**
 * @internal
 * @type {Record<string, import('./internal').TocCacheItem>}
 */
export const cache = {};

/**
 * @internal
 * @param {(activeTocItemId?: string) => void} callback
 * @returns {IntersectionObserverCallback}
 */
export function intersectionObserverCallback(callback) {
  return (entries) => {
    for (const entry of entries) {
      const tocId = entry.target.getAttribute(ATTRIBUTES.observeFor);
      if (tocId && entry.isIntersecting) {
        callback(tocId);
      }
    }
  };
}

/**
 * @internal
 * @param {HTMLElement} element
 * @returns {string}
 */
export function extractElementText(element) {
  if (element.hasAttribute(ATTRIBUTES.autoslug)) {
    // pre-processed by `@svelte-put/preprocess-auto-slug`
    // must strip out `textContent` from any nested anchor element
    return Array.from(element.childNodes).reduce((acc, child) => {
      if (
        child.nodeType !== Node.ELEMENT_NODE ||
        !(/** @type {Element} */ (child).hasAttribute(ATTRIBUTES.autoSlugAnchor))
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
 * @param {HTMLElement} element
 * @param {string} fallbackText
 * @returns {string}
 */
export function extractTocItemId(element, fallbackText) {
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
 * @param {HTMLElement} element
 * @param {import('../parameter/parameter').ResolvedTocConfig['scrollMarginTop']} scrollMarginTop
 * @returns {string}
 */
export function processScrollMarginTop(element, scrollMarginTop) {
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
 * @param {Element | null | undefined} element
 * @returns {boolean}
 */
export function isAutoSlugInjectedAnchor(element) {
  if (!element) return false;
  return element.tagName === 'A' && element.hasAttribute(ATTRIBUTES.autoSlugAnchor);
}
/**
 * @internal
 * @param {HTMLElement} element
 * @param {import('../parameter/parameter').ResolvedTocConfig['anchor']} anchor
 * @param {string} tocId
 * @returns {HTMLAnchorElement | undefined}
 */
export function processAnchor(element, anchor, tocId) {
  /** @type {HTMLAnchorElement | undefined} */
  let a = undefined;
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
              a = /** @type {HTMLAnchorElement} */ (previousElement);
            }
            break;
          }
          case 'prepend':
          case 'append': {
            a = /** @type {HTMLAnchorElement} */ (
              element.querySelector(`a[${ATTRIBUTES.autoSlugAnchor}]`)
            );
            break;
          }
          case 'after': {
            const nextElement = element.nextElementSibling;
            if (isAutoSlugInjectedAnchor(nextElement)) {
              a = /** @type {HTMLAnchorElement} */ (nextElement);
            }
            break;
          }
          case 'wrap': {
            const parentElement = element.parentElement;
            if (isAutoSlugInjectedAnchor(parentElement)) {
              a = /** @type {HTMLAnchorElement} */ (parentElement);
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
          a = /** @type {HTMLAnchorElement} */ (previousElement);
        } else if (isAutoSlugInjectedAnchor(nextElement)) {
          a = /** @type {HTMLAnchorElement} */ (nextElement);
        } else if (isAutoSlugInjectedAnchor(parentElement)) {
          a = /** @type {HTMLAnchorElement} */ (parentElement);
        } else {
          a = /** @type {HTMLAnchorElement} */ (
            element.querySelector(`a[${ATTRIBUTES.autoSlugAnchor}]`)
          );
        }
      }
    }
  }
  return a;
}

/**
 * @internal
 * @param {HTMLElement} element
 * @param {import('../parameter/parameter').ResolvedTocConfig['observe']} observe
 * @param {string} tocId
 * @param {(activeTocItemId?: string) => void} updateActiveTocItem
 * @param {Record<number, IntersectionObserver>} observerPool
 * @returns {import('../action/action').TocItem['observe']}
 */
export function processObserve(element, observe, tocId, updateActiveTocItem, observerPool) {
  if (!observe.enabled) return undefined;
  const parentElement = element.parentElement;
  /** @type {Exclude<import('../parameter/parameter').ResolvedTocConfig['observe']['strategy'], 'auto'>} */
  let rStrategy;
  const userDefinedStrategy =
    /** @type {import('../parameter/parameter').ResolvedTocConfig['observe']['strategy']} */ (
      element.getAttribute(ATTRIBUTES.strategy)
    ) || observe.strategy;
  if (typeof userDefinedStrategy !== 'number' && userDefinedStrategy !== 'auto') {
    rStrategy = userDefinedStrategy;
  } else if (parentElement && parentElement.offsetHeight / window.innerHeight < 0.8) {
    rStrategy = 'parent';
  } else {
    rStrategy = 'self';
  }
  /** @type {HTMLElement} */
  let nodeToObserve;
  switch (rStrategy) {
    case 'self':
      nodeToObserve = element;
      break;
    case 'parent':
      nodeToObserve = /** @type {HTMLElement */ (element.parentElement);
      break;
  }
  /** @type {number} */
  let threshold;
  if (element.hasAttribute(ATTRIBUTES.threshold)) {
    threshold = parseFloat(element.getAttribute(ATTRIBUTES.threshold) || '0');
  } else {
    threshold =
      typeof observe.threshold === 'function' ? observe.threshold(element) : observe.threshold;
  }
  const { root, rootMargin } = observe;
  nodeToObserve.setAttribute(ATTRIBUTES.observeFor, tocId);
  /** @type {IntersectionObserver} */
  let observer;
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
 * @param {HTMLElement} element
 * @param {string | undefined} tocId
 * @returns {Element | null}
 */
export function findTocRoot(element, tocId = undefined) {
  if (tocId) return document.querySelector(`[${ATTRIBUTES.root}="${tocId}"]`);
  else return element.closest(`[${ATTRIBUTES.root}]`);
}
