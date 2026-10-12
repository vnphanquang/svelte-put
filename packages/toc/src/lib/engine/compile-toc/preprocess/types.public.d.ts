export interface CompileTocOptions {
	/**
	 * name of the package / alias used in the imports
	 * @default '@svelte-put/toc'
	 */
	importSource?: string;
	/**
	 * whether to inject a `VariableDeclaration` that holds the Table-of-Contents data collected at
	 * compile-time to the "module" script. It is the equivalence using the `compileToc` manually:
	 *
	 * ```svelte
	 * <script module>
	 *   import { compileToc } from '@svelte-put/toc'
	 *   export const toc = compileToc(); // manually
	 * </script>
	 * ```
	 */
	autoDeclare?: CompileTocAutoDeclareOptions | boolean;
}

export type CompileTocAutoDeclareEnableResolver = (filename?: string) => boolean | undefined;

export interface CompileTocAutoDeclareOptions {
	/**
	 * turn on globally or filter out which file to auto-declare
	 */
	enabled?: CompileTocAutoDeclareEnableResolver | boolean;
	/**
	 * the variable name to set the data to. Note that name collison is not guarded.
	 * @default 'toc'
	 */
	identifier?: string;
}

export type ResolvedCompileToc = Required<Omit<CompileTocOptions, 'autoDeclare'>> & {
	autoDeclare: Required<Omit<CompileTocAutoDeclareOptions, 'enabled'>> & {
		enabled: CompileTocAutoDeclareEnableResolver;
	};
};
