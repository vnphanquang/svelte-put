<script lang="ts">
  import clsx from 'clsx';

  export let status: 'dev' | 'beta' | 'new' | 'flux' | 'stable';
  let cls = '';
  export { cls as class };
</script>

<span
  class={clsx(
    'text-xs',
    status === 'stable' && 'c-badge-gray',
    status === 'dev' && 'c-badge-primary',
    status === 'new' && 'c-badge-secondary',
    status === 'beta' && 'c-badge-blue',
    status === 'flux' && 'c-badge-red',
    cls,
  )}
>
  <slot>
    {status}
  </slot>
</span>
