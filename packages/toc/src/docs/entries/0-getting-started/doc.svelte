<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Getting Started',
	});
</script>

{markdown`
[Svelte preprocessor]: https://svelte.dev/docs/svelte-compiler#preprocess

## Part 1

### Part 1.1

## Part 2

## Part 3

### Part 3.1

#### Part 3.1.1

#### Part 3.1.2

#### Part 3.1.3

## Part 4
`}
