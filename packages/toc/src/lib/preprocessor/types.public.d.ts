import type {
	ResolvedTocAnchor,
	ResolvedTocIndex,
	ResolvedTocTrack,
	TocAnchorOptions,
	TocIndexOptions,
	TocTrackOptions,
	TocTrackResolver,
} from '../engine';
import type { CompileTocOptions, ResolvedCompileToc } from '../engine/compile-toc/preprocess';

export type TocPreprocessorIdResolver = ((input: { filename?: string }) => number);

export interface TocPreprocessorOptions {
	/**
	 * distinguish items indexed by this Toc instance from other Toc instances; helpful to avoid styling
	 * conflict when there are multiple Toc instances on the same page with overlapping indexable contents
	 */
	id?: number | TocPreprocessorIdResolver;
	/**
	 * a function that returns true if the file should be processed, process all files by default
	 */
	files?: (filename?: string) => boolean;
	/** instructions for tracking "active" content in Table-of-Contents */
	track?: Omit<TocTrackOptions, 'flat'> | TocTrackResolver | boolean;
	/** instructions for indexing the Table-of-Contents entries */
	index?: TocIndexOptions;
	/** instructions for adding anchor tag to the matching tag */
	anchor?: TocAnchorOptions | boolean;
	/** instructions for handling \`compileToc\` */
	compileToc?: CompileTocOptions;
}

export type ResolvedTocPreprocessorOptions = Required<Pick<TocPreprocessorOptions, 'files'>> & {
	id?: TocPreprocessorIdResolver;
	track: ResolvedTocTrack;
	index: ResolvedTocIndex;
	anchor: ResolvedTocAnchor;
	compileToc: ResolvedCompileToc;
};
