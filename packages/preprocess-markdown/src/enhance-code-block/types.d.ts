import { HTMLAttributes } from 'svelte/elements';

interface EnhancedCodeBlockProps extends HTMLAttributes<HTMLElement> {
	/**
	 * the programming language
	 */
	lang?: string;
	/**
	 * title for the code block
	 */
	title?: string;
	/**
	 * whether should hide the line number at start of each line
	 */
	hideLineNumber?: string;
	/**
	 * total number of lines in the code block
	 */
	numLines?: string;
	/**
	 * bindable
	 */
	collapsed?: 'disabled' | string;
}

interface EnhancedCodeBlockGroupProps extends HTMLAttributes<HTMLElement> {
	/**
	 * number of code blocks inside group
	 * Required but should be injected automatically
	 * by the `enhance-code-block` preprocessor
	 */
	cols: number;
	/**
	 * unique name for group.
	 * Required but should be injected automatically
	 * by the `enhance-code-block` preprocessor
	 */
	name: string;
	/**
	 * display mode for group. Default to `files`
	 */
	display?: 'files' | 'tabs';
	/**
	 * bindable, title of the current active child code block
	 */
	title?: string;
}

