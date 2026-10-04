export type ExternalLinkPreprocessorOptions = {
	/**
	 * a function that returns true if the file should be processed, process all files by default
	 */
	files?: (filename?: string) => boolean;
	/**
	 * a list of hosts that, if href does NOT match, will be marked as external
	 * `localhost` is always included
	 */
	hosts?: string[];
	/**
	 * a boolean attribute that explicitly marks the anchor tag as external to be processed
	 * @default 'data-external'
	 */
	markerAttribute?: string;
	/**
	 * attributes to add to the anchor tag. Note that when specified, attributes are replaced, not merged
	 * @default { target: '_blank', rel: 'noopener noreferrer' }
	 */
	attributes?: Record<string, string>;
};
