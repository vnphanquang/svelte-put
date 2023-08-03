export const codes = {
  actionUsage: `<-- correct usage-->
<div use:action />

<-- incorrect usage-->
<Component use:action />`,

  actionEventTypingAuto: `<script lang="ts">
  import { action } from '@svelte-put/package';
</script>

<!-- on:event should be automatically typed -->
<div use:action on:event />`,

  actionEventTypingFallback: `/// <reference types="svelte" />
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:event'?: (event: CustomEvent<import('@svelte-put/package').EventDetail>) => void;
  }
}`,
};
