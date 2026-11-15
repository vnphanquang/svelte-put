<script lang="ts">
	import { onMount } from 'svelte';
  import { stack } from '@svelte-put/async-stack';

  // any Svelte component to render as
  import Notification from './Notification.svelte';

  // define somewhere global, reuse across app
  export const notiStack = stack()
		// add a minimalistic variant config
    .addVariant('my', Notification)
    // add a verbose variant config
    .addVariant('special', {
      timeout: false,
      id: 'counter',
      component: Notification,
      props: {
        // inferred from Notification component
        special: true,
        content: 'A very special thing',
      },
    })
    // build the actual stack
    .build();

  onMount(async () => {
    // push a special item
    const pushed = notiStack.push('special');

    // wait for some user action for the item
    // to be resolved (popped) from within the component
    const { userAction } = await pushed.resolution;

    // push another item with custom props
    notiStack.push('info', {
      props: {
        content: 'An example information',
      },
    });
  });
</script>

<!-- portal -->
<aside class="applicable class">
  {#each notiStack.items as item (item.config.id)}
    <div use:notiStack.actions.render={item}>
      <!-- StackItem instances rendered as direct children -->
    </div>
  {/each}
</aside>