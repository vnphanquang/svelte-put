/**
 * svelte action parameters to config behavior of `movable`
 * @public
 *
 * @remarks
 *
 * parameters for `intersect` extends {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver | IntersectionObserverInit }
 * (second parameter passed to IntersectionObserver constructor)
 */
export interface IntersectParameters extends IntersectionObserverInit {
  /** whether to activate the action. Default to `true` */
  enabled?: boolean;
}

/**
 * `detail` payload for `intersect` and `intersectonce` CustomEvent
 * @public
 * ```
 */
export interface IntersectDetail {
  /** the IntersectionObserver itself */
  readonly observer: IntersectionObserver;
  /** list of IntersectionObserverEntry passed from IntersectionObserver callback */
  readonly entries: IntersectionObserverEntry[];
}

/**
 * Create an IntersectionObserver that observers the node
 * @public
 *
 * @example
 * Typical use to observe the first time the node intersects with viewport for transition effect (like fade-in)
 *
 * ```html
 * <script lang="ts">
 *  import { intersect, type IntersectDetail } from '@svelte-put/intersect';
 *
 *  let once = false;
 *
 *  function onIntersectOnce(event: CustomEvent<IntersectDetail>) {
 *    const { observer, entries } = event.detail;
 *
 *    // because only one threshold is input for the action, only one entry will be recorded here
 *    const entry = entries[0];
 *    once = entry.isIntersecting; // isIntersecting is always true, meaning the section is being scrolled into view.
 *  }
 *
 *  function onIntersect(event: CustomEvent<IntersectDetail>) {
 *    const { observer, entries } = event.detail;
 *    console.log('action intersect was used on element', observer.target);
 *    console.log('list of IntersectionObserverEntry:', entries);
 *  }
 * </script>
 *
 * <section
 *  class="{once ? 'animate-fade-in-up' : 'opacity-0'}"
 *  use:intersect={{ threshold: 0.4 }}
 *  on:intersectonce={onIntersectOnce}
 *  on:intersect={onIntersect}
 * >
 *  <p>
 *    A section that will fade in once, when intersected with viewport by 40%,
 *    and stays static afterwards. No other `intersectonce` event will be dispatched,
 *    but subsequent `intersect` events will still be listened for.
 *  </p>
 * </section>
 * ```
 *
 * @example
 * Typical use to observe intersection
 *
 * ```html
 * <script lang="ts">
 *  import { intersect, type IntersectDetail } from '@svelte-put/intersect';
 *
 *  let intersecting: boolean | undefined = undefined;
 *
 *  function onIntersect(event: CustomEvent<IntersectDetail>) {
 *    const { observer, entries } = event.detail;
 *    console.log('action intersect was used on element', observer.target);
 *    console.log('list of IntersectionObserverEntry:', entries);
 *
 *    // because only one threshold is input for the action, only one entry will be recorded here
 *    const entry = entries[0];
 *    intersecting = entry.isIntersecting;
 *  }
 * </script>
 *
 * <section
 *  use:intersect={{ threshold: 0.4 }}
 *  on:intersect={onIntersect}
 * >
 * >
 *  <p>
 *    A section that reacts to when scrolling in view (intersecting === true)
 *    and scrolling out of view (intersecting === false)
 *  </p>
 *  {#if intersecting !== undefined}
 *    <p>Scrolling {intersecting ? 'into view' : 'out of view'}...</p>
 *  {/if}
 * </section
 * ```
 *
 * @remarks
 *
 * As with any svelte action, `intersect` should be use with element and not component.
 *
 * ```html
 * <-- correct usage-->
 *  <div use:intersect />
 *
 * <-- incorrect usage-->
 * <Component use:intersect/>
 * ```
 *
 * @param node - HTMLElement to observe
 * @param parameters - svelte action parameters
 * @returns svelte action interface
 */
export function intersect(node: HTMLElement, parameters: IntersectParameters = { enabled: true }) {
  let hasIntersect = false;
  let { root, rootMargin, threshold, enabled = true } = parameters;
  const callback: IntersectionObserverCallback = (entries, observer) => {
    if (entries.some((e) => !!e.intersectionRatio)) {
      const detail: IntersectDetail = {
        observer,
        entries,
      };
      node.dispatchEvent(new CustomEvent('intersect', { detail }));
      if (!hasIntersect && entries.some((e) => e.isIntersecting)) {
        node.dispatchEvent(new CustomEvent('intersectonce', { detail }));
        hasIntersect = true;
      }
    }
  };

  let observer = new IntersectionObserver(callback, {
    root,
    rootMargin,
    threshold,
  });

  if (enabled) {
    observer.observe(node);
  }
  return {
    update(update: IntersectParameters) {
      update = { enabled: true, ...update };

      if (!enabled && update.enabled) {
        observer.observe(node);
      } else if (enabled && !update.enabled) {
        observer.unobserve(node);
      }

      if (
        update.root !== root ||
        update.rootMargin !== rootMargin ||
        update.threshold !== threshold
      ) {
        observer.disconnect();
        observer = new IntersectionObserver(callback, {
          root: update.root,
          rootMargin: update.rootMargin,
          threshold: update.threshold,
        });

        if (update.enabled) {
          observer.observe(node);
        }
      }

      ({ root, rootMargin, threshold, enabled = true } = update);
    },
    destroy() {
      observer.disconnect();
    },
  };
}
