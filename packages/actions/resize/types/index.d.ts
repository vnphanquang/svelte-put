declare module '@svelte-put/resize' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * Create an {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver | ResizeObserver} that observers this node
   * @example
   *
   * ```html
   * <script lang="ts">
   *  import { resize, type ResizeDetail } from '@svelte-put/resize';
   *
   *  function onResized(event: CustomEvent<ResizeDetail>) {
   *    const { observer, entries } = event.detail;
   *    console.log('action resize was used on element', observer.target);
   *    console.log('list of ResizeObserverEntry:', entries);
   *
   *   // see MDN docs for what you can do with ResizeObserverEntry
   *   // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
   *  }
   * </script>
   *
   * <section use:resize on:resized={onResized}>
   *   ...
   * </section
   * ```
   *
   * @remarks
   *
   * As with any svelte action, `resize` should be use with element and not component.
   *
   * ```html
   * <-- correct usage-->
   *  <div use:resize />
   *
   * <-- incorrect usage-->
   * <Component use:resize/>
   * ```
   *
   * @param node - HTMLElement to observe
   * @param param - svelte action parameters
   * */
  export function resize(node: HTMLElement, param?: ResizeParameter): ResizeActionReturn;
  /**
   * Deprecated, use `ResizeConfig` and `ResizeParameter` instead
   */
  export type ResizeParameters = ResizeConfig;
  /**
   * Additional attributes extended from `svelte-put/resize`
   * @remarks
   * The ambient types for these extended attributes should be available automatically
   * whenever `svelte-put/resize` is imported.
   *
   * ```html
   * <script lang="ts">
   *   import { resize } from '@svelte-put/resize';
   * </script>
   *
   * <!-- on:resized should be typed -->
   * <div
   *   use:resize
   *   on:resized
   * />
   * ```
   */
  interface ResizeAttributes {
    'on:resized'?: (event: CustomEvent<ResizeDetail>) => void;
  }

  /**
   * config behavior of `resize`
   * */
  interface ResizeConfig {
    /**
     * whether to activate the action. Default to `true`
     * @defaultValue true
     */
    enabled?: boolean;
    /**
     * @remarks
     * Be default, a singleton ResizeObserver is used for all actions for
     * better performance. You can use this option to create a new ResizeObserver
     * or provide your own.
     *
     * @defaultValue 'singleton'
     */
    observer?: 'singleton' | 'new' | ResizeObserver;
  }

  /**
   * parameter received from action input
   * */
  type ResizeParameter = ResizeConfig | undefined;

  /**
   * `detail` payload for `resize` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent}
   * */
  interface ResizeDetail {
    /** the ResizeObserver itself */
    readonly observer: ResizeObserver;
    /** list of ResizeObserverEntry passed from ResizeObserver callback */
    readonly entry: ResizeObserverEntry;
  }

  type ResizeActionReturn = ActionReturn<ResizeParameter, ResizeAttributes>;
}

//# sourceMappingURL=index.d.ts.map
