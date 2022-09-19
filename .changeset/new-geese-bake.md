---
"@svelte-put/modal": minor
---

- set default `clickoutside` to false in favor of backdrop
- better typing for modal store `pop`
- consistent typing of `push` output and modal stack item, merge `PushedModal` into `ModalPushOutput`
- add `resolved` to `ModalPushOutput`
- let the `ModalPortal` fixed container click-through-able with `pointer-events` set to `none`
