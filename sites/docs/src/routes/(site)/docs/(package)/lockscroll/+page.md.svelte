<script>
  import { SettingsContext } from '$lib/contexts/settings.svelte';

  import DemoQuickStart from './_page/examples/quick-start.svelte';
  import DemoScrollContainer from './_page/examples/scroll-container.svelte';
  import DemoSvelteRune from './_page/examples/svelte-rune.svelte';

  const settings = SettingsContext.get();
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/lockscroll@next
```

```bash title=pnpm
pnpm add -D @svelte-put/lockscroll@next
```

```bash title=yarn
yarn add -D @svelte-put/lockscroll@next
```

</enhanced-code-block>

<div class="c-callout c-callout--success c-callout--megaphone">

  New to Svelte 5? See [Migration Guides](#migration-guides).

</div>

<h2 id="quick-start">Quick Start</h2>

In this minimal example, try clicking on the button below to toggle scroll-lock on `<body>`.

<fieldset class="not-prose border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <DemoQuickStart />
</fieldset>

```svelte src=./_page/examples/quick-start.svelte title=quick-start.svelte
```

## Locking any Scroll Container

In [Quick Start], `lockscroll` is used on the `<body>`element. In practice, you can place `lockscroll` on any [scroll container], as shown in the example below.

<fieldset class="not-prose border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <DemoScrollContainer />
</fieldset>

```svelte src=./_page/examples/scroll-container.svelte title=on-any-scroll-container.svelte
```

## Usage with Svelte Rune

`lockscroll` can be used with any boolean Svelte rune, nested or not. The following example shows a useful pattern of using a class with rune-based property and a toggle helper. This can, for example, be exported an app-wide singleton and passed around using Svelte context.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <DemoSvelteRune />
</fieldset>

```svelte src=./_page/examples/svelte-rune.svelte title=svelte-rune.svelte
```

## `lockscroll:toggle` CustomEvent

When lock scroll state changes, a `lockscroll:toggle` [CustomEvent] is fired from the element the action is placed on.

```svelte title=lockscroll-toggle-event
<script lang="ts">
  import { lockscroll, type LockScrollDetail } from '@svelte-put/lockscroll';

  let locked = false;
  function toggleLockScroll() {
    locked = !locked;
  }

  function onToggleLockScroll(e: CustomEvent<LockScrollDetail>) {
    console.log('New scroll lock state:', e.detail.locked);
  }
</script>

<!-- event should be automatically typed if used in Typescript -->
<svelte:body use:lockscroll={locked} onlockscrolltoggle={onToggleLockScroll} />
<button class="c-btn" onclick={toggleLockScroll}>Toggle lock scroll</button>
```

## Migration Guides

### From V1 -> V2 (Svelte 5 in Runes mode)

When migrating to v2, you first need to update event attribute syntax to remove colon `:`:

```svelte
<!-- :::diff - -->
<div use:intersect on:lockscroll:toggle></div>
<!-- ::: -->
<!-- :::diff + -->
<div use:intersect onlockscrolltoggle></div>
<!-- ::: -->
```

If you previously used the `createLockScrollStore` helper, that is no longer supported. Instead, extend from the pattern introduced in [Usage with Svelte Rune](#usage-with-svelte-rune).

```svelte title="Migration to Svelte 5"
<script>
  // :::diff -
  import { lockscroll, createLockScrollStore } from '@svelte-put/lockscroll';
  // :::
  // :::diff +
  import { lockscroll } from '@svelte-put/lockscroll';
  // :::

	// can be created in js/ts files or within a Svelte context
  // :::diff -
  let lock = createLockScrollStore();
  // :::
  // :::diff +
	class ScrollLock {
		locked = $state(false);

		toggle(force = !this.locked) {
			this.locked = force;
		}
	}

	const lock = new ScrollLock();
  // :::
</script>

<!-- :::diff - -->
<svelte:body use:lockscroll={lock} />
<!-- ::: -->
<!-- :::diff + -->
<svelte:body use:lockscroll={lock.locked} />
<!-- ::: -->
<div class="flex gap-4 justify-center">
  <button class="c-btn" on:click={() => lock.toggle()}>Toggle lock scroll</button>
  <button class="c-btn c-btn--outlined" on:click={() => lock.toggle(true)}>Force locked</button>
  <button class="c-btn c-btn--outlined" on:click={() => lock.toggle(false)}>Force unlocked</button
  >
</div>
```

---

Happy locking scroll! 👨‍💻

[Quick Start]: #quick-start
[Scroll Container]: https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container
[Svelte store]: https://svelte.dev/docs/svelte-store
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

