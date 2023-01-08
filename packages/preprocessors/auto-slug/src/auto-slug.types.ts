import type { BaseNode } from 'estree';
import type BananaSlug from 'github-slugger';
import type { MarkupPreprocessor } from 'svelte/types/compiler/preprocess';

/** @internal */
type PartialAutoSlugOptions = Partial<Omit<AutoSlugOptions, 'anchor'>> & {
  anchor?: Partial<AutoSlugOptions['anchor']>;
};

/**
 * input to preprocessor. Either on object of options or a
 * function that returns one (with the defaultOptions as its parameter).
 * @public
 */
export type AutoSlugInput =
  | PartialAutoSlugOptions
  | ((defaultOptions: AutoSlugOptions) => PartialAutoSlugOptions);

/**
 * instructions for adding anchor tag
 * @public
 */
export interface AutoSlugAnchorOptions {
  /** whether to insert an anchor tag for each matching node */
  enabled: boolean;
  /**
   * where to create the anchor tag
   *
   * - 'prepend' — inject link before the target tag text
   *
   * - 'append' — inject link after the target tag text
   *
   * - 'wrap' — wrap the whole target tag text with the link
   *
   * - 'before' — insert link before the target tag
   *
   * - 'after' — insert link after the target tag
   *
   * default to `prepend`
   */
  position: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
  /**
   * content of the inserted anchor tag,
   * ignored when behavior is `wrap`.
   * Default to '#'
   */
  content: string;
  /**
   * properties set to the inserted anchor tag,
   * defaults to `{ 'aria-hidden': 'true', 'tab-index': '-1' }`
   */
  properties: Record<string, string>;
  /** href attribute of the inserted anchor tag */
  href: (slug: string) => string;
}

/**
 * information passed as parameter to slug resolver
 * @public
 */
export interface SlugResolverInput {
  /** generated slug, by default slug will resolve to this */
  generated: string;
  /** text extracted from original node */
  nodeText: string;
  /** the {@link https://github.com/Flet/github-slugger | BananaSlug} object */
  slugger: BananaSlug;
}

/**
 * options to config preprocess-auto-slug
 * @public
 */
export interface AutoSlugOptions {
  /**
   * filter which files the preprocessor will run on
   */
  files: (options: Parameters<MarkupPreprocessor>[0]) => boolean;
  /** target tag, default to all heading tags */
  tags: string[];
  /** default to `id` */
  attributeName: string;
  /** instructions to add the anchor tag */
  anchor: AutoSlugAnchorOptions;
  /** slug resolver */
  slug: (SlugResolverInput) => string;
}

/**
 * @internal
 */
export interface Node extends BaseNode {
  name: string;
  start: number;
  end: number;
  attributes: Array<{ name: string; type: string }>;
  children?: Array<Node>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
