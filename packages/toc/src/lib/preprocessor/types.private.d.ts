import {
	TocPreprocessorAnchorOptions,
	TocPreprocessorAutoDeclareOptions,
	TocPreprocessorOptions,
} from './types.public';

export interface Position {
	start: number;
	end: number;
}

export type ResolvedOptions = Required<Omit<TocPreprocessorOptions, 'anchor' | 'autoDeclare'>> & {
	anchor: Required<Omit<TocPreprocessorAnchorOptions, 'properties'>> & {
		properties: Record<string, string>;
	};
	autoDeclare: Required<Omit<TocPreprocessorAutoDeclareOptions, 'enabled'>> & {
		enabled: (filename?: string) => boolean;
	};
};
