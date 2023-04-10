import type { Options as HastUtilToHtmlOptions } from 'hast-util-to-html';

/**
 * @public
 * sources for the inline svg
 */
export type SourceConfig = {
  /**
   * options for `hast-util-to-html` during serialization
   */
  serializeOptions?: HastUtilToHtmlOptions;
  /**
   * directories relative to which the svg source path will be resolved
   */
  directories?: string[] | string;
  /**
   * default attributes to add to the svg element, will override the attributes from the svg source,
   * but be overridden by the attributes from the element itself (in svelte source)
   */
  attributes?: Record<string, string>;
};

/**
 * @public
 * global options for configuring behaviors of the inline-svg preprocessor
 */
export type PreprocessConfig = {
  /** attribute to get the svg source from, default to `data-inline-src` */
  inlineSrcAttributeName?: string;
  /** whether to keep the inline src attribute after build, default to `false` */
  keepInlineSrcAttribute?: boolean;
};
