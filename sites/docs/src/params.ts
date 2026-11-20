import { defineParams } from '@sveltejs/kit/params';

// FIXME: should get from #data/loader.ts but currently failing build
// please fix once resolved in upstream
const packages = [
	'async-stack',
	'avatar',
	'clickoutside',
	'cloudflare-turnstile',
	'copy',
	'dragscroll',
	'intersect',
	'inline-svg',
	'lockscroll',
	'movable',
	'preprocess-external-link',
	'qr',
	'resize',
	'shortcut',
	'swipeable',
	'toc',
];

export const params = defineParams({
	pkg: (param) => {
		if (!packages.includes(param)) return;
		return param;
	},
});
