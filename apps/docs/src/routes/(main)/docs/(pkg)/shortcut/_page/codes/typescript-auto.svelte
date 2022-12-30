<script lang="ts">
  import { shortcut } from '@svelte-put/shortcut';
</script>

<!-- on:shortcut should be automatically typed -->
<div use:shortcut={{ trigger: [] }} on:shortcut />
