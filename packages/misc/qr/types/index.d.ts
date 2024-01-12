declare module '@svelte-put/qr' {
  /**
   * create SVG parts that make up a QR. You should typically use {@link createSVG} instead
   *
   */
  export function createSVGParts(
    config: QRConfig,
    qr?: QRCode | undefined,
  ): {
    attributes: {
      viewBox: string;
      'data-qr': string;
      xmlns: string;
      version: string;
    };
    anchors: string;
    modules: string;
    logo: string;
  };
  /**
   * create QR as an SVG string
   * */
  export function createSVG(config: QRConfig): string;
  /**
   * create QR as a base64 data URL (image/svg+xml)
   * */
  export function createBase64Image(config: QRConfig): string;
  /**
   * instructions to render a QR
   * */
  type QRConfig = {
    /** the data to encode in QR, typically an URL */
    data: string;
    /**
     * the quite zone along the edges of QR
     */
    margin?: number;
    /**
     * determine what shape to render the elements
     *
     * - `square` (default): each module or anchor is a sharp-edged square
     * - `circle`: each module is a circle, each anchor is a round-edged square
     */
    shape?: 'square' | 'circle';
    /**
     * logo to render in the middle of QR
     */
    logo?: string;
    /** width : height */
    logoRatio?: number;

    /* styling */
    /** fill for each module */
    moduleFill?: string;
    /** fill for the outer ring of each anchor (big positioning square at the corner) */
    anchorOuterFill?: string;
    /** fill for the inner square of each anchor */
    anchorInnerFill?: string;
  };
}

declare module '@svelte-put/qr/img' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * Fetch a remote image and convert to base64 string
   * */
  export function toDataURL(url: string): Promise<string>;
  /**
   * Svelte action for rendering a QR as base64 data URL into the src attribute of this HTMLImageElement
   * */
  export function qr(node: HTMLImageElement, param: ImgQRParameter): ImgQRActionReturn;
  export namespace DEFAULT_FILLS {
    let moduleFill: string;
    let anchorOuterFill: string;
    let anchorInnerFill: string;
  }
  type ImgQRParameter = QRConfig;

  /**
   * Configurations available for
   * */
  type ImgQRAttributes = {
    'on:qr:init'?: (event: CustomEvent<HTMLImageElement>) => void;
  };

  type ImgQRActionReturn = ActionReturn<ImgQRParameter, ImgQRAttributes>;
  /**
   * instructions to render a QR
   * */
  type QRConfig = {
    /** the data to encode in QR, typically an URL */
    data: string;
    /**
     * the quite zone along the edges of QR
     */
    margin?: number;
    /**
     * determine what shape to render the elements
     *
     * - `square` (default): each module or anchor is a sharp-edged square
     * - `circle`: each module is a circle, each anchor is a round-edged square
     */
    shape?: 'square' | 'circle';
    /**
     * logo to render in the middle of QR
     */
    logo?: string;
    /** width : height */
    logoRatio?: number;

    /* styling */
    /** fill for each module */
    moduleFill?: string;
    /** fill for the outer ring of each anchor (big positioning square at the corner) */
    anchorOuterFill?: string;
    /** fill for the inner square of each anchor */
    anchorInnerFill?: string;
  };
}

declare module '@svelte-put/qr/svg' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * Svelte action for rendering a QR as innerHTML of this SVGElement
   * */
  export function qr(node: SVGElement, param: SvgQRParameter): SvgQRActionReturn;
  type SvgQRParameter = QRConfig;

  /**
   * Configurations available for
   * */
  type SvgQRAttributes = {
    'on:qr:init'?: (event: CustomEvent<SVGElement>) => void;
  };

  type SvgQRActionReturn = ActionReturn<SvgQRParameter, SvgQRAttributes>;
  /**
   * instructions to render a QR
   * */
  type QRConfig = {
    /** the data to encode in QR, typically an URL */
    data: string;
    /**
     * the quite zone along the edges of QR
     */
    margin?: number;
    /**
     * determine what shape to render the elements
     *
     * - `square` (default): each module or anchor is a sharp-edged square
     * - `circle`: each module is a circle, each anchor is a round-edged square
     */
    shape?: 'square' | 'circle';
    /**
     * logo to render in the middle of QR
     */
    logo?: string;
    /** width : height */
    logoRatio?: number;

    /* styling */
    /** fill for each module */
    moduleFill?: string;
    /** fill for the outer ring of each anchor (big positioning square at the corner) */
    anchorOuterFill?: string;
    /** fill for the inner square of each anchor */
    anchorInnerFill?: string;
  };
}

//# sourceMappingURL=index.d.ts.map
