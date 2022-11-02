import type { BaseNode } from 'estree';
import type BananaSlug from 'github-slugger';

/** @internal */
type PartialAutoSlugOptions = Omit<AutoSlugOptions, 'anchor'> & {
  anchor?: Partial<AutoSlugOptions['anchor']>;
};

/**
 * @public
 */
export type AutoSlugInput =
  | PartialAutoSlugOptions
  | ((defaultOptions: AutoSlugOptions) => PartialAutoSlugOptions);

/**
 * @public
 */
export interface AutoSlugAnchorOptions {
  enabled: boolean;
  /**
   * where to create the anchor tag
   *
   * - 'prepend' — inject link before the target tag text
   * - 'append' — inject link after the target tag text
   * - 'wrap' — wrap the whole target tag text with the link
   * - 'before' — insert link before the target tag
   * - 'after' — insert link after the target tag
   */
  position: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
  /** default to '#', ignored when behavior is `wrap` */
  content: string;
  /** defaults to { 'aria-hidden': 'true', 'tab-index': '-1' } */
  properties: Record<string, string>;
  href: (slug: string) => string;
}

/**
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
 * @public
 */
export interface AutoSlugOptions {
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
