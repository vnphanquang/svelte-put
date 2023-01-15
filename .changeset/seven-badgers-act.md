---
'@svelte-put/toc': patch
---

use as few IntersectionObserver as possible, only create for each new threshold, otherwise reuse
