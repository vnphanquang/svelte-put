// Copyright (c) Quang Phan. All rights reserved. Licensed under the MIT license.

/**
 * svelte preprocessor for inlining static svg at build time
 *
 * @packageDocumentation
 */

import { inlineSvg } from './inline-svg';

export * from './sources';
export * from './inline-svg';

export default inlineSvg;
