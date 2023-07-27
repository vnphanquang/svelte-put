<script lang="ts">
  import { resources as globalResources } from '$shared/data/resources';
  import type { ResourceId } from '$shared/data/resources';

  // eslint-disable-next-line no-undef
  type Resources = $$Generic<Record<string, string> | undefined>;
  // type Resources = R;
  type ResourceKeys = keyof Resources;
  type Key = undefined extends Resources ? ResourceId : ResourceId | ResourceKeys;

  export let resources: Resources = undefined as Resources;
  export let id: string | undefined = undefined;
  export let key: Key | undefined = undefined;
  export let href: string | undefined = undefined;
  export let title = '';
  let cls = '';
  export { cls as class };

  function resolveHref() {
    if (href) return href;
    if (key) {
      const _resources = resources ?? ({} as Record<string, string>);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (key in _resources) return _resources[key as any];
      if (key in globalResources) return globalResources[key as ResourceId];
    }
    if (id) {
      return `#${id}`;
    }
  }

  $: rHref = resolveHref();

  $: additionalProps = {
    ...(rHref?.startsWith('http') && { rel: 'noopener' }),
  };
</script>

<a
  href={rHref}
  {...!id && { target: '_blank' }}
  class="c-link {cls}"
  {title}
  {...additionalProps}
  on:click
>
  <slot>{key}</slot>
</a>

<style lang="postcss">
  :global(main .c-link:not(:has(:is(img, svg)))) {
    @apply text-primary hover:underline;
  }
</style>
