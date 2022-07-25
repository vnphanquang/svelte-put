<script lang="ts">
  import { onMount } from 'svelte';

  import type { GravatarOptions, UIAvatarOptions } from '$lib/avatar';
  import { gravatar as constructGravatarUrl, uiAvatar as constructUIAvatarUrl } from '$lib/avatar';

  const DEFINITIVE_FALLBACK = 'https://www.gravatar.com/avatar?d=mp';

  /** Highest priority, src attribute */
  export let src: string | undefined = undefined;
  /**
   * Second priority, see {@link https://en.gravatar.com/site/implement/images | Gravatar }
   */
  export let gravatar: GravatarOptions | string | undefined = undefined;
  /**
   * Third priority, see {@link https://ui-avatars.com | UIAvatar }
   */
  export let uiAvatar: string | UIAvatarOptions | undefined = undefined;
  /**
   * Lowest priority
   */
  export let fallback = DEFINITIVE_FALLBACK;

  /**
   * value for "width" & "height" attribute of <img>.
   * Will have no effect if default slot is overridden
   */
  export let size = 32;

  /**
   * value for "alt" attribute of <img>.
   * Default to uiAvatar.name or gravatar.email if any.
   * Will have no effect if default slot is overridden
   */
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

  $: trials = resolve(src, gravatar, uiAvatar, fallback);
  let resolvedSrc = DEFINITIVE_FALLBACK;

  onMount(async () => {
    for (const url of trials) {
      try {
        const response = await fetch(url);
        if (response.status.toString().startsWith('2')) {
          resolvedSrc = url;
          break;
        }
      } catch {
        //
      }
    }
  });

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
    if (_gravatar && (rUIAvatar || rFallback)) {
      if (typeof _gravatar === 'object') {
        _gravatar.default = '404';
      } else {
        _gravatar = {
          email: _gravatar,
          default: '404',
        };
      }
      rGravatar = constructGravatarUrl(_gravatar);
    }

    return [_src, rGravatar, rUIAvatar, rFallback].filter(nonNullableFilter);
  }
</script>

<slot src={resolvedSrc}>
  <img src={resolvedSrc} {alt} height={size} width={size} class={$$props.class} />
</slot>
