<script>
	import { SettingsContext } from '$lib/settings/context.svelte';

  const settings = SettingsContext.get();
</script>

## Deprecation Notice

This package has been dropped in favor of [@svelte-put/async-stack](/docs/async-stack). `@svelte-put/async-stack` is a generic implementation inspired by `@svelte-put/modal` and `@svelte-put/noti`, and now is more minimal, unopinionated, and powerful thanks to Svelte runes.

Follow patterns introduced in the `async-stack` ["Recipes" section](/docs/async-stack#modal--dialog) to migrate your existing `@svelte-put/modal` system to `@svelte-put/async-stack`.

To see the original documentation, [visit here](https://02e439f1.svelte-put.pages.dev/docs/modal).

---


Happy migrating 😅

