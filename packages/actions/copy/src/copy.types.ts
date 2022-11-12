/**
 * svelte action parameters to config behavior of `copy`
 * @internal
 */
export interface CopyParameters {
  /** whether to activate the action. Default to `true` */
  enabled: boolean;
  /**
   * the `HTMLElement` to register event on.
   * Default to the `node` on which the action is registered.
   */
  trigger: HTMLElement;
  /** the text to copy, or a function (sync/async) that returns it */
  text: string | (() => string | Promise<string>);
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
  oncopy?: (event: CustomEvent<CopyDetail>) => void; // on:copy
}
