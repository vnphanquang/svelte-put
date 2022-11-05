<script lang="ts">
  import { clsx } from 'clsx';

  import { resources } from '$data/resources';
  import type { ResourceId } from '$data/resources';

  export let key: ResourceId;
  export let string = key;
</script>

<a href={resources[key]} target="__blank" class={clsx($$props.class)}>{string}</a>

<style lang="postcss">
</style>
