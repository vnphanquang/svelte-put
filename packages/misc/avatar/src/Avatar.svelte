<script>
  import { onMount } from 'svelte';

  import { resolveAlt, resolveSize, resolveSrc, DEFINITIVE_FALLBACK } from './avatar.utils.js';

  /** @type {import('./Avatar.svelte.d.ts').AvatarProps['src']} */
  export let src = undefined;
  /** @type {import('./Avatar.svelte.d.ts').AvatarProps['gravatar']} */
  export let gravatar = undefined;
  /** @type {import('./Avatar.svelte.d.ts').AvatarProps['uiAvatar']} */
  export let uiAvatar = undefined;
  /** @type {import('./Avatar.svelte.d.ts').AvatarProps['fallback']} */
  export let fallback = undefined;
  /** @type {import('./Avatar.svelte.d.ts').AvatarProps['size']} */
  export let size = undefined;
  /** @type {import('./Avatar.svelte.d.ts').AvatarProps['alt']} */
  export let alt = undefined;

  $: rAlt = resolveAlt(alt, gravatar, uiAvatar, src);
  $: rSize = resolveSize(32, size, src, gravatar, uiAvatar);
  $: sources = resolveSrc(src, gravatar, uiAvatar, fallback);
  let rSrc = DEFINITIVE_FALLBACK;

  /** @type {HTMLImageElement} */
  let element;
  onMount(async () => {
    let rElement = element;
    if ($$slots.default) {
      rElement = new Image();
      rElement.style.display = 'none';
      document.body.appendChild(rElement);
    }
    let currentSourceIndex = 0;
    if (rElement) {
      rElement.addEventListener('error', (_) => {
        if (currentSourceIndex < sources.length - 1) {
          currentSourceIndex++;
          rElement.src = rSrc = sources[currentSourceIndex];
        } else {
          rElement.src = rSrc = DEFINITIVE_FALLBACK;
        }
      });
      rElement.src = rSrc = sources[currentSourceIndex] ?? DEFINITIVE_FALLBACK;
    }
  });
</script>

<!--
  @component
  Svelte image wrapper component for displaying avatar
  @public
-->
<slot src={rSrc} size={rSize} alt={rAlt} {sources}>
  <img
    src={rSrc}
    alt={rAlt}
    height={rSize}
    width={rSize}
    class="svelte-put-avatar {$$props.class ?? ''}"
    data-sources={sources.join(',')}
    bind:this={element}
    {...$$restProps}
  />
</slot>

<style>
  :global(:where(.svelte-put-avatar)) {
    aspect-ratio: 1 / 1;
  }
</style>
