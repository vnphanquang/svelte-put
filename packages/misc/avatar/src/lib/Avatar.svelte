<script lang="ts">
  import { onMount } from 'svelte';

  import type { AvatarSlots, AvatarProps } from './avatar.types';
  import { resolveAlt, resolveSize, resolveSrc, DEFINITIVE_FALLBACK } from './avatar.utils';

  type $$Props = AvatarProps;
  type $$Slots = AvatarSlots;

  export let src: $$Props['src'] = undefined;
  export let gravatar: $$Props['gravatar'] = undefined;
  export let uiAvatar: $$Props['uiAvatar'] = undefined;
  export let fallback: $$Props['fallback'] = undefined;
  export let size: $$Props['size'] = undefined;
  export let alt: $$Props['alt'] = undefined;

  $: rAlt = resolveAlt(alt, gravatar, uiAvatar, src);
  $: rSize = resolveSize(32, size, src, gravatar, uiAvatar);
  $: sources = resolveSrc(src, gravatar, uiAvatar, fallback);
  let rSrc = DEFINITIVE_FALLBACK;

  let element: HTMLImageElement;
  onMount(async () => {
    let rElement = element;
    if ($$slots.default) {
      rElement = new Image();
      rElement.style.display = 'none';
      document.body.appendChild(rElement);
    }
    let currentSourceIndex = 0;
    if (rElement) {
      rElement.addEventListener('error', (e) => {
        console.log(e);
        if (currentSourceIndex < sources.length - 1) {
          currentSourceIndex++;
          rElement.src = rSrc = sources[currentSourceIndex];
        } else {
          rElement.src = rSrc = DEFINITIVE_FALLBACK;
        }
      });
      rElement.src = rSrc = sources[currentSourceIndex];
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
  />
</slot>

<style>
  :global(:where(.svelte-put-avatar)) {
    aspect-ratio: 1 / 1;
  }
</style>
