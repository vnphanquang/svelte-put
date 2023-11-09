---
'@svelte-put/movable': minor
---

Support touch devices by switching `MouseEvent` to `PointerEvent` and forcing `touch-action: none` on `handle` (prevent touch events from being registered as scroll) (#242)
