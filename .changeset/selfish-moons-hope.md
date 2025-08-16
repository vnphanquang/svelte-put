---
'@svelte-put/async-stack': patch
---

use `Set` instead of array for `StackItemResolveListener` to **help** avoid duplicated callbacks (should discourage the usage of arrow functions)
