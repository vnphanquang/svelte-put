# Cloudflare Workers Types

> :warning: If you're upgrading from version 2, make sure to remove `webworker` from the `lib` array in your
> `tsconfig.json`. These types are now included in `@cloudflare/workers-types`.

## Install

```bash
npm install -D @cloudflare/workers-types
-- Or
yarn add -D @cloudflare/workers-types
```

## Usage

The following is a minimal `tsconfig.json` for use alongside this package:

**`tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020"],
    "types": ["@cloudflare/workers-types"]
  }
}
```

### Using bindings

It's recommended that you create an ambient type file for any bindings your Worker uses. Create a file named
`bindings.d.ts` in your src directory:

**`bindings.d.ts`**

```typescript
export {};

declare global {
  const MY_ENV_VAR: string;
  const MY_SECRET: string;
  const myKVNamespace: KVNamespace;
}
```

## Auto-Generation

Types are automatically generated from the Workers runtime's source code on every release. However, these generated
types don't include any generics or overloads, so to improve ergonomics, some of them are overridden.

The [`overrides`](./overrides) directory contains partial TypeScript declarations. If an override has a different type
classification than its generated counterpart – for example, an `interface` is declared to override a generated `class`
definition – then the override is used instead of the generated output. However, if they're the same type classification
(e.g. both the override and the generated output are using `class`), then their member properties are merged:

- Members in the override but not in the generated type are included in the output
- If a member in the override has the same name as one in the generated type, the generated one is removed from the
  output, and the override is included instead
- If the member is declared type `never` in the override, it is removed from the output

If a named type override is declared as a type alias to `never`, that named type is removed from the output.

JSDoc comments from overrides will also be copied over to the output.

Comment overrides can also be written in Markdown. The [`docs`](./docs) directory contains these overrides.
2<sup>nd</sup> level headings are the names of top level declarations (e.g. <code>## \`KVNamespace\`</code>),
3<sup>rd</sup> level headings are for member names (e.g. <code>### \`KVNamespace#put\`</code>), and 4<sup>th</sup> level
headings correspond to JSDoc sections for members:

- `#### Parameters`: a list with parameters of the form <code>- \`param\`: param description</code>, these will be
  formatted as `@param` tags
- `#### Returns`: contents will be copied as-is to the `@returns` tag
- `#### Examples`: fenced code blocks with the language set to `js`, `ts`, `javascript` or `typescript` will be copied
  to `@example` tags
