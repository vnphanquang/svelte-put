---
'@svelte-put/toc': patch
---

when injecting anchor tag, if position is set as `'wrap'` or `'content'` but the element already contains some anchor tags, fallback to another strategy instead
