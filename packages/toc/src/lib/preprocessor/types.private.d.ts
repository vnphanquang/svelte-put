import type {
	TocPreprocessorAnchorOptions,
	TocPreprocessorAttributes,
	TocPreprocessorAutoDeclareOptions,
	TocPreprocessorExperimental,
	TocPreprocessorIndexOptions,
	TocPreprocessorOptions,
} from './types.public';

export interface Position {
	start: number;
	end: number;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type ResolvedAttributes = Extract<TocPreprocessorAttributes, Function>;
export type ResolvedAnchor = Required<Omit<TocPreprocessorAnchorOptions, 'attributes'>> & {
	attributes: ResolvedAttributes;
};
export type ResolvedIndex = Required<Omit<TocPreprocessorIndexOptions, 'attributes'>> & {
	attributes: ResolvedAttributes;
};
export type ResolvedAutoDeclare = Required<Omit<TocPreprocessorAutoDeclareOptions, 'enabled'>> & {
	enabled: (filename?: string) => boolean | undefined;
};
export type ResolvedExperimental = Required<TocPreprocessorExperimental>;

export type ResolvedOptions = Required<
	Omit<TocPreprocessorOptions, 'index' | 'anchor' | 'autoDeclare' | 'experimental'>
> & {
	index: ResolvedIndex;
	anchor: ResolvedAnchor;
	autoDeclare: ResolvedAutoDeclare;
	experimental: ResolvedExperimental;
};
