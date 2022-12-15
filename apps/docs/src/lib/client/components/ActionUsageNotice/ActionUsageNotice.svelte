<script lang="ts">
  import Code from '$client/components/Code/Code.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  export let action: string;

  const code = `<-- correct usage-->
<div use:${action} />

<-- incorrect usage-->
<Component use:${action} />`;
</script>

<section>
  <h2>Action Usage Notice</h2>

  As with any <ResourceLink key="svelte action" />, <code>{action}</code> should be use with
  <code>element</code>
  and not <code>component</code>.

  <Code lang="svelte" {code} title="use:action is an element directive" icon="warning" />
</section>
