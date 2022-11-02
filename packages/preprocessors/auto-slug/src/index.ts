// Copyright (c) Quang Phan. All rights reserved. Licensed under the MIT license.

/**
 * svelte preprocessor for generating slug from text content, to add `id` to heading tags for example.
 *
 * @packageDocumentation
 */
import { autoSlug } from './auto-slug';

export * from './auto-slug';
export * from './auto-slug.constants';
export * from './auto-slug.types';

export default autoSlug;
