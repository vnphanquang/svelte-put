declare module '@svelte-put/intersect' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * Create an IntersectionObserver that observers the node
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
   * @param param - svelte action parameters
   * */
  export function intersect(node: HTMLElement, param?: IntersectParameter): IntersectActionReturn;
  /**
   * Deprecated, use `IntersectParameter` and `IntersectConfig` instead
   */
  export type IntersectParameters = IntersectConfig;
  /**
   * Additional attributes extended from `svelte-put/intersect`
   * @remarks
   * The ambient types for these extended attributes should be available automatically
   * whenever `svelte-put/intersect` is imported.
   *
   * ```html
   * <script lang="ts">
   *   import { intersect } from '@svelte-put/intersect';
   * </script>
   *
   * <!-- on:intersect, on:intersectonce should be typed -->
   * <div
   *   use:intersect
   *   on:intersect
   *   on:intersectonce
   * />
   * ```
   */
  interface IntersectAttributes {
    'on:intersect'?: (event: CustomEvent<IntersectDetail>) => void;
    'on:intersectonce'?: (event: CustomEvent<IntersectDetail>) => void;
  }

  /**
   * config behavior of `intersect`
   * @remarks
   *
   * parameters for `intersect` extends {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver | IntersectionObserverInit }
   * (second parameter passed to IntersectionObserver constructor)
   */
  interface IntersectConfig extends IntersectionObserverInit {
    /** whether to activate the action. Default to `true` */
    enabled?: boolean;
  }

  /**
   * `detail` payload for `intersect` and `intersectonce` CustomEvent
   * */
  interface IntersectDetail {
    /** the IntersectionObserver itself */
    readonly observer: IntersectionObserver;
    /** list of IntersectionObserverEntry passed from IntersectionObserver callback */
    readonly entries: IntersectionObserverEntry[];
    /** scrolling direction */
    readonly direction: 'up' | 'down';
  }

  /**
   * parameter received from action input
   * */
  type IntersectParameter = IntersectConfig | undefined;

  type IntersectActionReturn = ActionReturn<IntersectParameter, IntersectAttributes>;
}

//# sourceMappingURL=index.d.ts.map
