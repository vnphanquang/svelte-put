<div align="center">

# @svelte-put/docs

Documentation site for `@svelte-put`

https://svelte-put.vnphanquang.com

</div>

## Splitting Fonts into Subsets

Using [fonttools], specifically the [pyftsubset](https://fonttools.readthedocs.io/en/latest/subset/index.html) command to split fonts into subsets. For example:

<details open>
  <summary>pyftsubset inter variable font</summary>

```bash
pyftsubset Inter.var.woff2 --unicodes="U+0000-00ff,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd" --output-file="inter-latin.woff2"

pyftsubset Inter.var.woff2 --unicodes="U+0100-024f, U+0259, U+1e00-1eff, U+2020, U+20a0-20ab, U+20ad-20cf, U+2113, U+2c60-2c7f, U+a720-a7ff" --output-file="inter-latin-ext.woff2"

pyftsubset Inter.var.woff2 --unicodes="U+0400-045f, U+0490-0491, U+04b0-04b1, U+2116" --output-file="inter-cyrillic.woff2"

pyftsubset Inter.var.woff2 --unicodes="U+0460-052f, U+1c80-1c88, U+20b4, U+2de0-2dff, U+a640-a69f, U+fe2e-fe2f" --output-file="inter-cyrillic-ext.woff2"

pyftsubset Inter.var.woff2 --unicodes="U+0370-03ff" --output-file="inter-greek.woff2"

pyftsubset Inter.var.woff2 --unicodes="U+1f00-1fff" --output-file="inter-greek-ext.woff2"
```

</details>

will generate a collection of subsets as seen at [static/fonts/inter](https://github.com/vnphanquang/svelte-put/tree/main/sites/docs/static/fonts/inter), with css seen at [src/lib/ui/styles/fonts/inter.font.css](https://github.com/vnphanquang/svelte-put/blob/main/sites/docs/src/lib/ui/styles/fonts/inter.font.css).

This strategy was [discussed here](https://github.com/vuejs/vitepress/discussions/1648)

[fonttools]: https://github.com/fonttools/fonttools
