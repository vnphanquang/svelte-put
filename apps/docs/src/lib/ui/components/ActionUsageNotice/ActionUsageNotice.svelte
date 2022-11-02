<script lang="ts">
  import Code from '$lib/ui/components/Code/Code.svelte';
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';
  export let action: string;

  const code = `<-- correct usage-->
<div use:${action} />

<-- incorrect usage-->
<Component use:${action} />`;
</script>

<h2>Action Usage Notice</h2>

As with any <ResourceLink key="svelte action" />, <code>clickoutside</code> should be use with
<code>element</code>
and not <code>component</code>.

<Code lang="svelte" {code} title="use:action is an element directive" icon="warning" />
