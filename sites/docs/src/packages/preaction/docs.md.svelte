<script>
	import { SettingsContext } from '$lib/settings/context.svelte';

  import Demo from './_page/examples/demo.svelte';

  const settings = SettingsContext.get();
</script>

## Introduction

This is a *proof-of-concept* Svelte preprocessor that allows usage of "**preaction**" - an extension to [Svelte action] with the ability to *add static attributes on server-side*.

<div class="c-callout c-callout--warning c-callout--icon-question">

**Is this stable / production ready?**

It is NOT; use with caution! See "[Why would I need this][why-need-this]" for more information.

</div>

## Installation

Be aware that `@svelte-put/preaction` requires at least Svelte 5 at the time of this writing.

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/preaction
```

```bash title=pnpm
pnpm add -D @svelte-put/preaction
```

```bash title=yarn
yarn add -D @svelte-put/preaction
```

</enhanced-code-block>

## Demo

The example below shows a pattern using [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). In this scenario, `preaction` helps set up SSR-friendly attributes that complies to Popover specs while allowing the use of [Svelte action] to progressively enhance runtime experience.

<fieldset class="border-2 border-violet-500 p-4 not-prose">
  <legend>Example</legend>
  <Demo />
  <p class="mt-4">(core functionalities still work even when JS is not available)</p>
</fieldset>

The source code is:

```svelte title="demo.svelte" src="./_page/examples/demo.svelte"
```

Which is equivalent to:

```svelte title="equivalence.svelte"
<script lang="ts">
	const popover = { /** truncated, same as above */ } ;
  // :::highlight
  const control = popover.control('my-popover');
  const target = popover.target('my-popover');
  // :::
</script>

<!-- :::highlight -->
<button {...(control.attributes ?? {})} use:control.action={'my-popover'}>
<!-- ::: -->
	Open Popover
</button>

<!-- :::highlight -->
<div {...(target.attributes ?? {})} use:target.action={'my-popover'}>
<!-- ::: -->
  My simple popover
</div>
```

<div class="c-callout c-callout--info">

Attribute spread is added before any other `use` directives or attributes to avoid potential conflicts with user-defined attributes.

</div>


## Guides

<h3 id="0-setup-preaction"><span class="c-num align-middle">0</span> set up <code>preaction</code> preprocessor</h3>

Start by adding `preaction` to your Svelte config.

```js title="svelte.config.js"
// :::highlight
import { preaction } from '@svelte-put/preaction';
// :::

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
    // :::highlight
		preaction(),
    // :::
    // other preprocessors
  ],

  // ...truncated...
}
```

<h3 id="1-make-preaction"><span class="c-num align-middle">1</span> <code>make</code> a preaction</h3>

Next, prepare a "preaction" using the `make` helper.

```typescript title="set-my-color.ts"
import type { HTMLAttributes } from 'svelte/elements';
import { make } from '@svelte-put/preaction';

export const setMyColor = make((initialColor = 'blue') => {
  // :::highlight
  // this code runs both both on server and client, as if it is top-level script code.
  // So don't rely on browser stuff such as `document` or `window`.
  // :::

  return {
    action = (node: HTMLElement, color: string) => {
      // :::highlight
      // this code is a typical Svelte action and runs only on client
      // :::
      return {
        update: (newColor: string) => {
          // update the color attribute dynamically at runtime
          node.dataset.color = newColor;
        },
      }
    },

    attributes: {
      // :::highlight
      // this attributes will be statically spread onto the node
      // :::
      'data-color': initialColor;
    } as HTMLAttributes<HTMLElement>,
  };
});

// For typescript users, to take full advantage of language tooling,
// like make sure to provide type parameters and attributes as seen above.
```

Input to `make` is a function that returns an object with the `action` and optionally `attributes`:

```typescript title="make.d.ts (simplified)"
function make<Node, Param>(preaction: Preaction<Node, Param>);

// note: if your action does not use any param, simply exclude it from the declaration
type Preaction<Node, Param> = (param: Param) => {
  action: import('svelte/action').Action<Node, Param>;
  attributes?: Record<string, any>;
};
```

<div class="c-callout c-callout--info">

`make` can be used anywhere in your codebase, not just `.svelte` files

</div>

<h3 id="2-apply-preaction"><span class="c-num align-middle">2</span> <code>apply</code> a preaction</h3>

Finally, call your preaction (created with `make`) within `use:apply` directive to apply the encapsulated action and attributes to an element.

```svelte title="mypage.svelte"
<script>
  import { apply } from '@svelte-put/preaction';
  import { setMyColor } from './set-my-color.ts'; // see previous step
</script>

<!-- add data-color on server, and apply action on client -->
<div use:apply={setMyColor('red')}></div>
```

<h2 id="why-need-this">Why would I need this? (and alternatives)</h2>

You probably don't! The intended use case is to **extract HTML attribute setup with Svelte action logic into reusable modules**. These can already be solved today using either native Svelte action and manual prop spreading...

```svelte title="alternative: manual spread"
<!-- alternative: just spread prop manually -->
<button use:myaction {...myprops}></button>
```

...or encapsulate such logic into a component...

```svelte title="alternative: component"
<script>
  // preparation logics, hidden from user of this component
  const myaction = () => { /** action logic */ };
  const myprops = { /** props */ };
</script>

<button use:myaction {...myprops}></button>
```

Unlike in Svelte 4, the introduction of runes in Svelte 5 as well as simplification of prop declaration and event handler now allows for easier encapsulation than ever.

<div class="c-callout c-callout--info c-callout--icon-bulb">

That being said, I sometimes find myself in need of a solution such as one introduced here because I personally find it more elegant in terms of clear encapsulation and minimal reusability.

Some more discussion about adding SSR-compatible action to Svelte core can be found in [issue#4375](https://github.com/sveltejs/svelte/issues/4375). Although I will be happy to see this get a first-party support, I am not really sure if it will bring enough benefit over complexity.

This package is essentially a way for me to explore in user land the feasibility of such feature without breaking existing Svelte semantics.

</div>

## Shoutout

This package is greatly inspired by [Melt UI](https://melt-ui.com/).

---

Happy pre-acting!

[Svelte action]: https://svelte.dev/docs/svelte-action
[why-need-this]: #why-need-this

