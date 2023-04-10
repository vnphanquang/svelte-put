<!-- this will have width="20" height="20" as specified in the config -->
<svg inline-src="svelte" />

<!-- nested -->
<svg inline-src="google/arrow-right.svg" />
<!-- .svg can be omitted -->
<svg inline-src="simpleicons/github" />

<!-- with custom attributes -->
<svg inline-src="diagram" width="100" height="100" />

<!-- alternatively, you can provide a per-case path that is relative to the current source file -->
<svg inline-src="./local-icon.svg" />

<!-- if the source svg is not found for any of the above, an error will be thrown -->
