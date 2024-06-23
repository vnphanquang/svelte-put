<div align="center">

# `@svelte-put/async-stack`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Type-safe and headless async builder for async component stack (notification and modal/dialog systems, for example)

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script lang="ts">
  import { stack } from '@svelte-put/async-stack';

  // any Svelte component to render as
  import MyComponent from './MyComponent.svelte';

  // define somewhere global, reuse across app
  export const myStack = stack()
    // add a minimalistic variant config
    .addVariant('my', MyComponent)
    // add a verbose variant config
    .addVariant('special', {
      timeout: false,
      id: 'counter',
      component: MyComponent,
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
    const pushed = myStack.push('special');

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

<!-- portal ->
<aside class="applicable class">
  {#each myStack.items as item (item.config.id)}
    <div use:myStack.actions.render={item}>
      <!-- StackItem instances rendered as direct children -->
    </div>
  {/each}
</aside>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/async-stack/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/async-stack
[npm]: https://www.npmjs.com/package/@svelte-put/async-stack
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/async-stack?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/async-stack
[docs]: https://svelte-put.vnphanquang.com/docs/async-stack
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue

