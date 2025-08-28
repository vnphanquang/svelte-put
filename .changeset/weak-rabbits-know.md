---
'@svelte-put/async-stack': patch
---

use `import('svelte/events').on` instead of `addEventListener` (ref: [svelte/events docs](https://svelte.dev/docs/svelte/svelte-events#on))
