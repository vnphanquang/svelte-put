<script lang="ts">
  import { onMount } from 'svelte';

  import type { AvatarProps } from './avatar.types';
  import type { AvatarSlots, GravatarOptions, UIAvatarOptions } from './avatar.types';
  import { resolveAlt, resolveSize, resolveSrc, DEFINITIVE_FALLBACK } from './avatar.utils';

  type $$Props = AvatarProps;
  type $$Slots = AvatarSlots;

  export let src: string | undefined = undefined;
  export let gravatar: GravatarOptions | string | undefined = undefined;
  export let uiAvatar: string | UIAvatarOptions | undefined = undefined;
  export let fallback = DEFINITIVE_FALLBACK;
  export let size: number | undefined = undefined;
  export let alt: string | undefined = undefined;

  $: rAlt = resolveAlt(alt, gravatar, uiAvatar);
  $: rSize = resolveSize(32, size, src, gravatar, uiAvatar);
  $: trials = resolveSrc(src, gravatar, uiAvatar, fallback);
  let resolvedSrc = DEFINITIVE_FALLBACK;

  onMount(async () => {
    for (const url of trials) {
      try {
        const response = await fetch(url, { mode: 'cors' });
        if (response.status.toString().startsWith('2')) {
          resolvedSrc = url;
          break;
        }
      } catch {
        //
      }
    }
  });
</script>

<!--
  @component
  Svelte `<img>` wrapper component for displaying avatar
  @public
-->
<slot src={resolvedSrc} size={rSize} alt={rAlt}>
  <img src={resolvedSrc} alt={rAlt} height={rSize} width={rSize} class={$$props.class} />
</slot>

<style>
  :where(img) {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center;
  }
</style>
