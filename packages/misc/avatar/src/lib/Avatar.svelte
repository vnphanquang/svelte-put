<script lang="ts">
  import { onMount } from 'svelte';

  import type { AvatarSlots, GravatarOptions, UIAvatarOptions } from '$lib/avatar';
  import { gravatar as constructGravatarUrl, uiAvatar as constructUIAvatarUrl } from '$lib/avatar';

  import type { AvatarProps } from './avatar';

  const DEFINITIVE_FALLBACK = 'https://www.gravatar.com/avatar?d=mp';

  type $$Props = AvatarProps;
  type $$Slots = AvatarSlots;

  export let src: string | undefined = undefined;
  export let gravatar: GravatarOptions | string | undefined = undefined;
  export let uiAvatar: string | UIAvatarOptions | undefined = undefined;
  export let fallback = DEFINITIVE_FALLBACK;
  export let size: number | undefined = undefined;
  export let alt = (function () {
    if (typeof uiAvatar === 'string') {
      return uiAvatar;
    } else if (typeof uiAvatar === 'object') {
      return uiAvatar.name;
    } else if (typeof gravatar === 'string') {
      return gravatar;
    } else if (typeof gravatar === 'object') {
      return gravatar.email;
    } else {
      return '';
    }
  })();

  $: rSize = resolveSize(32, size, src, gravatar, uiAvatar);
  $: trials = resolve(src, gravatar, uiAvatar, fallback);
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

  function getSizeFromUrl(url: string): number | undefined {
    const matchS = url.match(/s=(\d+)/g) ?? [];
    const matchSize = url.match(/size=(\d+)/g) ?? [];
    const match = [...matchS, ...matchSize].filter((m) => url[url.indexOf(m) - 1] !== '-');
    if (match) {
      return Number(match[0].split('=')[1]);
    }
    return undefined;
  }
  function resolveSize(
    fallback: number,
    _size?: number,
    src?: string,
    _gravatar?: typeof gravatar,
    _uiAvatar?: typeof uiAvatar,
  ) {
    try {
      if (_size) return _size;
      if (_gravatar && typeof _gravatar === 'object') return _gravatar.size || fallback;
      if (_uiAvatar && typeof _uiAvatar === 'object') return _uiAvatar.size || fallback;
      if (src) return getSizeFromUrl(src) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function nonNullableFilter<TValue>(value: TValue | null | undefined): value is TValue {
    if (value === null || value === undefined) return false;
    return true;
  }

  function resolve(
    _src: typeof src,
    _gravatar: typeof gravatar,
    _uiAvatar: typeof uiAvatar,
    _fallback: typeof fallback,
  ) {
    let rUIAvatar = _uiAvatar ? constructUIAvatarUrl(_uiAvatar) : null;
    let rGravatar: string | null = null;
    let rFallback: string | null = _fallback === DEFINITIVE_FALLBACK ? null : _fallback;
    if (_gravatar) {
      if (rUIAvatar || rFallback) {
        if (typeof _gravatar === 'object' && !_gravatar.default) {
          _gravatar.default = '404';
        } else {
          _gravatar = {
            email: _gravatar,
            default: '404',
          } as typeof _gravatar;
        }
      }
      rGravatar = constructGravatarUrl(_gravatar);
    }

    return [_src, rGravatar, rUIAvatar, rFallback].filter(nonNullableFilter);
  }
</script>

<!--
  @component
  Svelte `<img>` wrapper component for displaying avatar
  @public
-->
<slot src={resolvedSrc}>
  <img src={resolvedSrc} {alt} height={rSize} width={rSize} class={$$props.class} />
</slot>

<style>
  :where(img) {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center;
  }
</style>
