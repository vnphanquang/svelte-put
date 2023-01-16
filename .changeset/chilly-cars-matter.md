---
'@svelte-put/toc': patch
---

deprecate internal svelte store (for tracking active item within action operations, no effect on the user-provided `store` parameter) in favor of simple callback for smaller bundle size
