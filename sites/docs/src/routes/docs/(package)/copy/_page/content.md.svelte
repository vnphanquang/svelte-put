<script>
  import DemoNoParameters from './examples/no-parameters.svelte';
  import DemoCustomTrigger from './examples/custom-trigger.svelte';
  import DemoCustomTextCallback from './examples/custom-text.svelte';
  import DemoSyntheticCopy from './examples/synthetic-copy.svelte';
  import memeImage from './images/copy-meme.webp';

	import { getSettingsContext } from '$lib/contexts/settings';
  const { packageManager } = getSettingsContext();
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={$packageManager}>

```bash
/// title=npm
npm install --save-dev @svelte-put/copy
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/copy
```

```bash
/// title=yarn
yarn add -D @svelte-put/copy
```

</enhanced-code-block>

## Minimal Usage

By default, `copy` will trigger a `click` <span class="c-num">1</span> event listener on the same node <span class="c-num">2</span> it is used on. The triggered listener will then copy [innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) of said node <span class="c-num">3</span> to the default clipboard. The next sections show how <span class="c-num">1</span>, <span class="c-num">2</span>, <span class="c-num">3</span> can be customized.

Below is a minimal demo of `copy` with default options. Try clicking on the <span class="bg-green-500 text-black px-2">green</span> button to observe the text within being copied to the <span class="bg-blue-200 px-2 text-black">blue</span> box.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>

  <DemoNoParameters />
</fieldset>

```svelte
/// src=./examples/no-parameters.svelte
/// title=copy-with-default-options.svelte
```

## <span class="c-num align-middle">1</span> Customizing the Event Types

Pass one or more event types to the `event` option.

```svelte
/// src=./examples/custom-event.svelte
/// title=custom-event.svelte
```

## <span class="c-num align-middle">2</span> Customizing the Trigger

The `trigger` option, which typically takes an `HTMLElement`, specifies the node to which the event listener is attached.

:::div c-callout c-callout--info
The copy <svg inline-src="lucide/clipboard" class="inline" height="16" width="16" /> button seen in code blocks on this site is powered by this very action.
:::

A typical use case is clicking on a node to copy text within some other node. In the demo below, try clicking on the <span class="bg-green-500 text-black px-2">green</span> button to copy text in the <span class="border-yellow-500 border px-2">yellow</span>-bordered box.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>

  <DemoCustomTrigger />
</fieldset>

```svelte
/// src=./examples/custom-trigger.svelte
/// title=custom-trigger.svelte
```

## <span class="c-num align-middle">3</span> Customizing How Text is Copied

The `text` option can receive a **literal** string or a sync/async **callback** that returns a string, which if provided, will be used for copying instead of the default `innerText` attribute of the node the action is placed on.

### Literal

```svelte
<button use:copy={{ text: 'some static text' }}>Copy me</button>
```

### Callback

Here, `text` is a callback; its parameter contains information about the forwarded event, reference to `node` (on which the action is placed), and the `trigger` (to which event is attached).

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>

  <DemoCustomTextCallback />
</fieldset>

```svelte
/// src=./examples/custom-text.svelte
/// title=custom-text-callback.svelte
```

## Simulating the `copy` Event

If the `synthetic` option is set to `true`, a "fake" [copy event](https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event) will be dispatched alongside the `copied` [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), should that be of any use.

:::div c-callout c-callout--warning
Note that since this synthetic `copy` event is not "real", operations on [clipboardData](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent/clipboardData) will have no effect on the actual copied text.
:::

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>

  <DemoSyntheticCopy />
</fieldset>

```svelte
/// src=./examples/synthetic-copy.svelte
/// title=synthetic-copy.svelte
```

## The `copyToClipboard` Helper

Behind the scene, `copy` uses a `copyToClipboard` helper (See [its source code here](https://github.com/vnphanquang/svelte-put/blob/08c868417e68b963e2b5a51f4664e0a3b0b6242e/packages/copy/src/copy.helpers.js)). You may skip the action and use this utility directly to build your own custom solution that fits your exact need.

```typescript
/// title=copy-helper.ts
import { copyToClipboard } from '@svelte-put/copy';

export function customCopy(text: string) {
  copyToClipboard(text);
}
```

Happy copying! 👨‍💻

---

<figure>
  <img class="mx-auto" src={memeImage} alt="a meme showing an episode of Mr. Bean where he is copying another student's answers during an exam" width="300" height="217" loading="lazy" decoding="async" />
  <figcaption>This package was made during <a class="c-link" href="https://en.wikipedia.org/wiki/COVID-19">Covid</a>. Or was it? How could I remember anything from those years...</figcaption>
</figure>
