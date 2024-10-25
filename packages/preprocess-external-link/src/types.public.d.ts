export type ExternalLinkConfig = {
	/** a list of hosts that, if href does NOT match, will be marked as external. `localhost` is already included */
	hosts: string[];
	/** a function that returns true if the file should be processed. By defaults it will matches */
	files?: (filename?: string) => boolean;
	/** a boolean attribute that explicitly marks the anchor tag as external to be processed. Defaults to `'data-external'` */
	markerAttribute?: string;
	/** attributes to add to the anchor tag. Defaults to `{ target: '_blank', rel: 'noopener noreferrer' }` */
	attributes?: Record<string, string>;
};

