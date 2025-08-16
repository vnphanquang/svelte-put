---
'@svelte-put/async-stack': patch
---

(experimental) use `Set` instead of array for `StackItemResolveListener` to **help** avoid duplicated callbacks

NOTE: should discourage user from using arrow functions.
