<script lang="ts">
  import { clsx } from 'clsx';

  import { resources } from '$data/resources';
  import type { ResourceId } from '$data/resources';

  export let key: ResourceId | undefined = undefined;
  export let string = key;
  export let href = key ? resources[key] : '';
</script>

<a {href} target="__blank" class={clsx($$props.class)}>
  <slot>{string}</slot>
</a>
