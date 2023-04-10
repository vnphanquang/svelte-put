---
'@svelte-put/preprocess-inline-svg': patch
---

directly manipulate source with `magic-string` instead of replacing with parsed svg, to avoid stripping svelte-specific attributes & syntax. Resolves #186
