// import('@svelte-put/inline-svg/preprocess').Source
export type Source =
  | `./${string}`
  | `../${string}`
  | 'svelte'
  | 'google/arrow-right'
  | 'simpleicons/github'
  | 'diagram';
