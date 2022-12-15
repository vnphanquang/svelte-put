<script lang="ts">
  export let status: 'dev' | 'beta' | 'new' | 'flux' | 'stable';
  let cls = '';
  export { cls as class };

  const BADGE_CLASSES = {
    beta: 'c-badge-blue',
    dev: 'c-badge-primary',
    new: 'c-badge-secondary',
    flux: 'c-badge-red',
    stable: 'c-badge-gray',
  } satisfies Record<typeof status, string>;
  $: badgeClass = BADGE_CLASSES[status];
</script>

<span class="text-xs {badgeClass} {cls}">
  <slot>
    {status}
  </slot>
</span>
