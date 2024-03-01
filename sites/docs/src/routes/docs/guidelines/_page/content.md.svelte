# Guidelines

This page includes common guidelines shared among packages in the `svelte-put` collections.

## Action as Element Directive

Any [svelte action](https://svelte.dev/docs/svelte-action) exported by a package should be used with `element` and not `component`.

```svelte
/// filename=example.svelte
<!-- :::diff - -->
<Component use:action /> <-- incorrect usage-->
<!-- ::: -->
<!-- :::diff + -->
<div use:action /> <-- correct usage-->
<!-- ::: -->
```

## Action Event Typescript Support

If an action supports some [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) but they are not picked up by your editor or some type error is displayed, you are probably still on an older version of Svelte or one of its ecosystem toolings. It is recommended to [migrate to Svelte 4](https://svelte.dev/docs/v4-migration-guide) and upgrade to latest relevant editor extensions/plugins.

```svelte
/// filename=example.svelte
<script lang="ts">
  import { action } from '@svelte-put/package';
</script>

<!-- on:event should be automatically typed -->
<div use:action on:event />
```

If the above option is not possible for your use case. Try declaring types for the events manually as follows.

```typescript
/// filename=src/app.d.ts
/// <reference types="svelte" />
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:event'?: (event: CustomEvent<import('@svelte-put/package').EventDetail>) => void;
  }
}
```

:::div c-callout c-callout--info
`event`, `package`, and `EventDetail` in code examples above depend on the actual package you are importing from.
:::

## Svelte Store Reactive Syntax

Note that the [$ syntax](https://svelte.dev/docs/svelte-components#script-4-prefix-stores-with-$-to-access-their-values) for unpacking reactive store value is only available in `j.svelte` files and not in JS/TS. Instead, use the `.subscribe` method on the store instance itself in such cases.
