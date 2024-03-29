<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@svelte-put/select](./select.md) &gt; [SelectProperties](./select.selectproperties.md)

## SelectProperties interface

**Signature:**

```typescript
export interface SelectProperties<O extends BaseOption<V>, M extends true | false | undefined, V = O['value']>
```

## Properties

| Property                                                                       | Modifiers | Type                                                  | Description  |
| ------------------------------------------------------------------------------ | --------- | ----------------------------------------------------- | ------------ |
| [class?](./select.selectproperties.class.md)                                   |           | string                                                | _(Optional)_ |
| [clearable?](./select.selectproperties.clearable.md)                           |           | boolean                                               | _(Optional)_ |
| [collapseOnSelection?](./select.selectproperties.collapseonselection.md)       |           | boolean                                               | _(Optional)_ |
| [disabled?](./select.selectproperties.disabled.md)                             |           | boolean                                               | _(Optional)_ |
| [generateLiId?](./select.selectproperties.generateliid.md)                     |           | (option: O) =&gt; string                              | _(Optional)_ |
| [generateUlId?](./select.selectproperties.generateulid.md)                     |           | () =&gt; string                                       | _(Optional)_ |
| [group?](./select.selectproperties.group.md)                                   |           | [GroupProp](./select.groupprop.md)<!-- -->&lt;O&gt;   | _(Optional)_ |
| [hideExpansionIndicator?](./select.selectproperties.hideexpansionindicator.md) |           | boolean                                               | _(Optional)_ |
| [id?](./select.selectproperties.id.md)                                         |           | string                                                | _(Optional)_ |
| [multiple?](./select.selectproperties.multiple.md)                             |           | M                                                     | _(Optional)_ |
| [nullable?](./select.selectproperties.nullable.md)                             |           | boolean                                               | _(Optional)_ |
| [open?](./select.selectproperties.open.md)                                     |           | boolean                                               | _(Optional)_ |
| [options](./select.selectproperties.options.md)                                |           | O\[\]                                                 |              |
| [placeholder?](./select.selectproperties.placeholder.md)                       |           | string                                                | _(Optional)_ |
| [required?](./select.selectproperties.required.md)                             |           | boolean                                               | _(Optional)_ |
| [search?](./select.selectproperties.search.md)                                 |           | [SearchProp](./select.searchprop.md)<!-- -->&lt;O&gt; | _(Optional)_ |
| [selected?](./select.selectproperties.selected.md)                             |           | undefined extends M ? O : true extends M ? O\[\] : O  | _(Optional)_ |
| [value?](./select.selectproperties.value.md)                                   |           | undefined extends M ? V : true extends M ? V\[\] : V  | _(Optional)_ |
