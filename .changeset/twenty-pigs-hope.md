---
'@svelte-put/async-stack': patch
---

call import('svelte').tick() before resolution to make sure DOM updates are applied
