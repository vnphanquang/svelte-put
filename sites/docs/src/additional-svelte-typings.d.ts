declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
  // interface HTMLAttributes<T> extends TocDataAttributes {}
  interface SVGAttributes {
    'inline-src'?: import('@svelte-put/preprocess-inline-svg').Source;
  }
}
