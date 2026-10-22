import { defineParams } from '@sveltejs/kit/params';

import { packages } from '#data/loader';

export const params = defineParams({
	pkg: (param) => {
		if (!packages.includes(param)) return;
		return param;
	},
});
