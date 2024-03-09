<script>
  import DemoQuickStart from './examples/quick-start.svelte';
  import DemoScrollContainer from './examples/scroll-container.svelte';
  import DemoStoreHelper from './examples/store-helper.svelte';
</script>

## Installation

<enhanced-code-block group display="tabs">

```bash
/// title=npm
npm install --save-dev @svelte-put/lockscroll
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/lockscroll
```

```bash
/// title=yarn
yarn add -D @svelte-put/lockscroll
```

</enhanced-code-block>

<h2 id="quick-start">Quick Start</h2>

In this minimal example, try clicking on the button below to toggle scroll-lock on `<body>`.

<fieldset class="not-prose border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <DemoQuickStart />
</fieldset>

```svelte
/// src=./examples/quick-start.svelte
/// title=quick-start.svelte
```

## Locking any Scroll Container

In [Quick Start], `lockscroll` is used on the `<body>`element. In practice, you can place `lockscroll` on any [scroll container], as shown in the example below.

<fieldset class="not-prose border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <DemoScrollContainer />
</fieldset>

```svelte
/// src=./examples/scroll-container.svelte
/// title=on-any-scroll-container.svelte
```

## `createLockScrollStore` Helper

The exported helper `createLockScrollStore` can be used to generate an idiomatic [Svelte store], which is just a `Writable<boolean>` with a builtin `toggle` method. This is helpful if the scroll lock needs to be toggled in non-svelte files. For example, a global store can be created and reused across the site.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <DemoStoreHelper />
</fieldset>

```svelte
/// src=./examples/store-helper.svelte
/// title=store-helper.svelte
```

## `lockscroll:toggle` CustomEvent

When lock scroll state changes, a `lockscroll:toggle` [CustomEvent] is on from the element the action is placed on.

```svelte
/// title=lockscroll-toggle-event
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
<svelte:body use:lockscroll={locked} on:lockscroll:toggle={onToggleLockScroll} />
<button class="c-btn" on:click={toggleLockScroll}>Toggle lock scroll</button>
```

---

Happy locking scroll! 👨‍💻

[Quick Start]: #quick-start
[Scroll Container]: https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container
[Svelte store]: https://svelte.dev/docs/svelte-store
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
