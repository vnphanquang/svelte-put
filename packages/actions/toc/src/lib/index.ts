// Copyright (c) Quang Phan. All rights reserved. Licensed under the MIT license.

/**
 * Svelte action `use:toc` for building table of contents
 *
 * @packageDocumentation
 */

export * from './toc.action';
export type { TocDataAttributes, TocEventAttributes } from './toc.attributes';
export type { TocChangeEventDetails, TocEventDetails, TocInitEventDetails } from './toc.events';
export type { TocItem } from './toc.item';
export type { TocAnchorParameters, TocObserveParameters, TocParameters } from './toc.parameters';
export type { TocStore, TocStoreValue } from './toc.store';
export { createTocStore } from './toc.store';
