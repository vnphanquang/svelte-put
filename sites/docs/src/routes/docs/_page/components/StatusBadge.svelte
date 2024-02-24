<script lang="ts">
  export let status: 'dev' | 'beta' | 'new' | 'flux' | 'stable';
  let cls = '';
  export { cls as class };

  const BADGE_CLASSES = {
    beta: 'bg-info-surface text-info-text',
    dev: 'bg-warning-surface text-warning-text',
    new: 'bg-success-surface text-success-text',
    flux: 'bg-error-surface text-error-text',
    stable: 'bg-gray-700 text-white',
  } satisfies Record<typeof status, string>;
  $: badgeClass = BADGE_CLASSES[status];
</script>

<span class="text-xs rounded-lg px-1.5 py-px {badgeClass} {cls}">
  <slot>
    {status}
  </slot>
</span>

