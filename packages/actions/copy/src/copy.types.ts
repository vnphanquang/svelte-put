/**
 * the input passed to {@link TextResolver}
 * @public
 */
export interface TextResolverInput<K extends keyof HTMLElementEventMap> {
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
 * @public
 */
export type TextResolver<K extends keyof HTMLElementEventMap> = (
  input: TextResolverInput<K>,
) => string | Promise<string>;

/**
 * svelte action parameters to config behavior of `copy`
 * @public
 */
export interface CopyParameters<K extends keyof HTMLElementEventMap> {
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
}

/**
 * `detail` payload for `copy` `CustomEvent`
 * @public
 */
export interface CopyDetail {
  /** the copied text */
  text: string;
}

/**
 * Additional attributes extended from `svelte-put/copy`
 * @public
 *
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
 * <!-- on:copy should be typed -->
 * <div
 *   use:copy={{ trigger }}
 *   on:copy
 * />
 * ```
 */
export interface CopyAttributes {
  'on:copy'?: (event: CustomEvent<CopyDetail>) => void;
}
