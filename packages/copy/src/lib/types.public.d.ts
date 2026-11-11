import { Action, ActionReturn } from 'svelte/action';

/**
 * the input passed to {@link TextResolver}
 *
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
 *
 */
export type TextResolver<K extends keyof HTMLElementEventMap> = (
	input: TextResolverInput<K>,
) => string | Promise<string>;

/**
 * svelte action parameters to config behavior of `copy`
 *
 */
export interface CopyConfig<K extends keyof HTMLElementEventMap> {
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
 *
 */
export type CopyParameter<K extends keyof HTMLElementEventMap> = Partial<CopyConfig<K>> | undefined;

/**
 * `detail` payload for `copy` `CustomEvent`
 *
 */
export interface CopyDetail {
	/** the copied text */
	text: string;
}

/**
 * Additional attributes extended from `svelte-put/copy`
 *
 *
 *
 * The ambient types for these extended attributes should be available automatically
 * whenever `svelte-put/copy` is imported.
 *
 * ```html
 * <script lang="ts">
 *   import { copy } from '@svelte-put/copy';
 *   let trigger: HTMLElement;
 * </script>
 *
 * <!-- oncopied should be typed -->
 * <div
 *   use:copy={{ trigger }}
 *   oncopied
 * />
 * ```
 */
export interface CopyAttributes {
	oncopied?: (event: CustomEvent<CopyDetail>) => void;
}

export type CopyAction<K extends keyof HTMLElementEventMap> = Action<
	HTMLElement,
	CopyParameter<K>,
	CopyAttributes
>;
export type CopyReturn<K extends keyof HTMLElementEventMap> = ActionReturn<
	CopyParameter<K>,
	CopyAttributes
>;
