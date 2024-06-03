type ExternalLinkConfig = {
	hosts: string[];
	files: (filename?: string) => boolean;
	/** a boolean attribute that explicitly marks the anchor tag as external to be processed */
	markerAttribute?: string;
	attributes: Record<string, string>;
};
