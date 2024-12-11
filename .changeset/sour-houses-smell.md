---
'@svelte-put/shortcut': patch
---

implement stricter modifier matching. Now all definitions are mutually exclusive. For example, `[['ctrl', 'alt']]` will no longer trigger `ctrl`, and vice versa
