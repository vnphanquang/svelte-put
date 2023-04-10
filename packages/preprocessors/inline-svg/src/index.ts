// Copyright (c) Quang Phan. All rights reserved. Licensed under the MIT license.

/**
 * svelte preprocessor for inlining static svg at build time
 *
 * @packageDocumentation
 */

import { inlineSvg } from './preprocessor';

export * from './preprocessor';
export * from './sources.generated';

export default inlineSvg;
