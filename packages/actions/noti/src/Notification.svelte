<script>
  /** @type {import('./public').NotificationInstance<string, import('svelte').SvelteComponent>}*/
  export let notification;
</script>

<svelte:component
  this={notification.component}
  {...notification.props}
  {notification}
  on:resolve={notification.$resolve}
/>
