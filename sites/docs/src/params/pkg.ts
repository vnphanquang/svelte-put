import type { ParamMatcher } from '@sveltejs/kit';

import { ids } from '$packages';

export const match = ((param: string) => ids.includes(param)) satisfies ParamMatcher;
