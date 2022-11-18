<script lang="ts">
  import { clsx } from 'clsx';

  import { resources } from '$data/resources';
  import type { ResourceId } from '$data/resources';

  export let id: string | undefined = undefined;
  export let key: ResourceId | undefined = undefined;
  export let href = key ? resources[key] : id ? `#${id}` : undefined;
  export let title = '';
</script>

<a {href} {...!id && { target: '_blank' }} class={clsx('c-link', $$props.class)} {title}>
  <slot>{key}</slot>
</a>
