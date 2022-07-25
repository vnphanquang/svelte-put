# Prettier for Svelte 3 components

Format your Svelte components using Prettier.

## Features

-   Format your HTML, CSS, and JavaScript using prettier
-   Format Svelte syntax, e.g. each loops, if statements, await blocks, etc.
-   Format the JavaScript expressions embedded in the Svelte syntax
    -   e.g. expressions inside of `{}`, event bindings `on:click=""`, and more

## How to use in VS Code and Atom

This plugin comes with [Svelte for VS Code](https://github.com/sveltejs/language-tools) and [Svelte for Atom](https://github.com/UnwrittenFun/svelte-atom) so just install the extension for your favorite editor and enjoy.

If you want to customize some formatting behavior, see section "Options" below.

Some of the extensions let you define options through extension-specific configuration. These settings are ignored however if there's any configuration file (`.prettierrc` for example) present.

## How to install manually

```bash
npm i --save-dev prettier-plugin-svelte prettier
```

## How to use (CLI)

Install `prettier` and `prettier-plugin-svelte` as dev dependencies in your project.

Then format your code using Prettier CLI. You may need to add `--plugin-search-dir=.`

```
prettier --write --plugin-search-dir=. ./**/*.html
```

If you want to customize some formatting behavior, see section "Options" below.

## Options

``Configurations are optional``

Make a `.prettierrc` file in your project directory and add your preferred [options](https://prettier.io/docs/en/options.html) to [configure Prettier](https://prettier.io/docs/en/configuration.html). When using Prettier through the CLI, you can also pass options through CLI flags, but a `.prettierrc` file is recommended.

### Svelte Sort Order

Sort order for `svelte:options`, scripts, markup, and styles.

Format: join the keywords `options`, `scripts`, `markup`, `styles` with a `-` in the order you want.

| Default                         | CLI Override                   | API Override                |
| ------------------------------- | ------------------------------ | --------------------------- |
| `options-scripts-markup-styles` | `--svelte-sort-order <string>` | `svelteSortOrder: <string>` |

> The `options` order option only exists since version 2. If you use version 1 of `prettier-plugin-svelte`, omit that option (so for example only write `scripts-markup-styles`).

### Svelte Strict Mode

More strict HTML syntax: less self-closed tags, quotes in attributes, no attribute shorthand (overrules `svelteAllowShorthand`).

Example:

```html
<!-- svelteStrictMode: true -->
<div foo="{bar}"></div>

<!-- svelteStrictMode: false -->
<div foo={bar} />
```

| Default | CLI Override                  | API Override               |
| ------- | ----------------------------- | -------------------------- |
| `false` | `--svelte-strict-mode <bool>` | `svelteStrictMode: <bool>` |

### Svelte Allow Shorthand

Option to enable/disable component attribute shorthand if attribute name and expression are same.

Example:

```html
<!-- allowShorthand: true -->
<input type="text" {value} />

<!-- allowShorthand: false -->
<input type="text" value={value} />
```

| Default | CLI Override                      | API Override                   |
| ------- | --------------------------------- | ------------------------------ |
| `true`  | `--svelte-allow-shorthand <bool>` | `svelteAllowShorthand: <bool>` |

### Svelte Bracket New Line

> Deprecated since 2.5.0. Use Prettier 2.4.0 and [bracketSameLine](https://prettier.io/docs/en/options.html#bracket-line) instead.

Put the `>` of a multiline element on a new line. Roughly the Svelte equivalent of the [jsxBracketSameLine](https://prettier.io/docs/en/options.html#jsx-brackets) rule. Setting this to `false` will have no effect for whitespace-sensitive tags (inline elements) when there's no whitespace between the `>` of the start tag and the inner content, or when there's no whitespace after the `>` of the end tag. You can read more about HTML whitespace sensitivity [here](https://prettier.io/blog/2018/11/07/1.15.0.html#whitespace-sensitive-formatting). You can adjust whitespace sensitivity through [this setting](https://prettier.io/docs/en/options.html#html-whitespace-sensitivity). 

Example:

```html
<!-- before formatting -->
<span><div>foo</div><span>bar</span></span>
<div pretend break>content</div>

<!-- after formatting, svelteBracketNewLine true -->
<span
    ><div>foo</div>
    <span>bar</span></span
>
<div
     pretend
     break
>
    content
</div>

<!-- after formatting, svelteBracketNewLine false -->
<span
    ><div>foo</div>
    <span>bar</span></span>
<div
     pretend
     break>
    content
</div>
```

| Default | CLI Override                       | API Override                   |
| ------- | ---------------------------------- | ------------------------------ |
| `true`  | `--svelte-bracket-new-line <bool>` | `svelteBracketNewLine: <bool>` |

### Svelte Indent Script And Style

Whether or not to indent the code inside `<script>` and `<style>` tags in Svelte files. This saves an indentation level, but might break code folding in your editor.

| Default | CLI Override                              | API Override                         |
| ------- | ----------------------------------------- | ------------------------------------ |
| `true`  | `--svelte-indent-script-and-style <bool>` | `svelteIndentScriptAndStyle: <bool>` |

### `.prettierrc` example

```json
{
  "svelteSortOrder" : "options-styles-scripts-markup",
  "svelteStrictMode": true,
  "svelteBracketNewLine": false,
  "svelteAllowShorthand": false,
  "svelteIndentScriptAndStyle": false
}
```

## Usage with Tailwind Prettier Plugin

There's a Tailwind Prettier Plugin to format classes in a certain way. This plugin bundles `prettier-plugin-svelte`, so if you want to use the Tailwind plugin, uninstall `prettier-plugin-svelte` and use the Tailwind plugin instead. If you are using VS Code, make sure to have the Prettier extension installed and switch the default formatter for Svelte files to it.

More info: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
