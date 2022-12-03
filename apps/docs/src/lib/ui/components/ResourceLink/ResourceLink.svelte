<script lang="ts">
  import { clsx } from 'clsx';

  import { resources as globalResources } from '$data/resources';
  import type { ResourceId } from '$data/resources';

  type Resources = $$Generic<Record<string, string> | undefined>;
  type ResourceKeys = keyof Resources;
  type Key = undefined extends Resources ? ResourceId : ResourceId | ResourceKeys;

  export let resources: Resources = undefined as Resources;
  export let id: string | undefined = undefined;
  export let key: Key | undefined = undefined;
  export let href = resolveHref();
  export let title = '';

  function resolveHref() {
    if (key) {
      const _resources = resources ?? ({} as Record<string, string>);
      if (key in _resources) return _resources[key as any];
      if (key in globalResources) return globalResources[key as ResourceId];
    }
    if (id) {
      return `#${id}`;
    }
  }
</script>

<a {href} {...!id && { target: '_blank' }} class={clsx('c-link', $$props.class)} {title}>
  <slot>{key}</slot>
</a>
