---
'@svelte-put/async-stack': patch
---

(experimental) proactively invoke `preventDefault` on "Escape" keydown to ensure consistency for `preventResolution` option in `enhanceDialog` on Chrome, where the second Escape keydown will bypass the cancel event
