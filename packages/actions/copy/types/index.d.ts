declare module '@svelte-put/copy' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * Copy text to clipboard on `click` event
   * @param node - HTMLElement to register action
   * @param parameter - svelte action parameters
   * */
  export function copy<K extends keyof HTMLElementEventMap>(
    node: HTMLElement,
    parameter?: Partial<CopyConfig<K>>,
  ): CopyReturn<K>;
  /**
   * Deprecated, use `CopyParameter` and `CopyConfig` instead
   */
  export type CopyParameters<K extends keyof HTMLElementEventMap> = CopyConfig<K>;
  /**
   * Copy a text to the clipboard. Will attempt to use the new `navigator.clipboard` API,
   * but will fallback to the `execCommand()` if `navigator.clipboard` is not available.
   * @remarks
   *
   * This is shamelessly "copied" from {@link https://github.com/vuejs/vitepress/blob/43c89d66c0d8c87e244a0a0e73a897509b977e65/src/client/app/composables/copyCode.ts | vitepress source code}
   *
   * @param text - text to copy
   */
  export function copyToClipboard(text: string): Promise<void>;
  /**
   * the input passed to {@link TextResolver}
   * */
  interface TextResolverInput<K extends keyof HTMLElementEventMap> {
    /** the node the action was registered on */
    node: HTMLElement;
    /**
     * the trigger element, as specified by the action parameter,
     * otherwise same as `node`
     */
    trigger: HTMLElement;
    /** the event that triggered the listener */
    event: HTMLElementEventMap[K];
  }

  /**
   * a sync/async function that return the text to be copied
   * */
  type TextResolver<K extends keyof HTMLElementEventMap> = (
    input: TextResolverInput<K>,
  ) => string | Promise<string>;

  /**
   * svelte action parameters to config behavior of `copy`
   * */
  interface CopyConfig<K extends keyof HTMLElementEventMap> {
    /** whether to activate the action. Default to `true` */
    enabled: boolean;
    /**
     * The event to trigger the copy action,
     * passed to `addEventListener` on `trigger`.
     * Default to `click`
     */
    event: K | K[];
    /**
     * the `HTMLElement` to register event on.
     * Default to the `node` on which the action is registered.
     */
    trigger: HTMLElement;
    /** the text to copy, or a sync/async function that returns it */
    text: string | TextResolver<K>;
    /** whether to dispatch a synthetic `copy` event. Defaults to `false` */
    synthetic: boolean;
  }

  /**
   * the input received from action
   * */
  type CopyParameter<K extends keyof HTMLElementEventMap> = Partial<CopyConfig<K>> | undefined;

  /**
   * `detail` payload for `copy` `CustomEvent`
   * */
  interface CopyDetail {
    /** the copied text */
    text: string;
  }

  /**
   * Additional attributes extended from `svelte-put/copy`
   * @remarks
   * The ambient types for these extended attributes should be available automatically
   * whenever `svelte-put/copy` is imported.
   *
   * ```html
   * <script lang="ts">
   *   import { copy } from '@svelte-put/copy';
   *   let trigger: HTMLElement;
   * </script>
   *
   * <!-- on:copied should be typed -->
   * <div
   *   use:copy={{ trigger }}
   *   on:copied
   * />
   * ```
   */
  interface CopyAttributes {
    'on:copied'?: (event: CustomEvent<CopyDetail>) => void;
  }
  type CopyReturn<K extends keyof HTMLElementEventMap> = ActionReturn<
    CopyParameter<K>,
    CopyAttributes
  >;
}

//# sourceMappingURL=index.d.ts.map
