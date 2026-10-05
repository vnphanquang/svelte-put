export type TocPreprocessorOptions = {
	/**
	 * a function that returns true if the file should be processed, process all files by default
	 */
	files?: (filename?: string) => boolean;
};
