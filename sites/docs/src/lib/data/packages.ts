export interface Package {
	id: string;
	name: string;
	publishedAt: number;
	description: string;
	path: string;
	replId?: string;
	status: 'dev' | 'beta' | 'new' | 'flux' | 'stable';
	rune: boolean;
	ready: boolean;
	githubUrl: string;
	changelogUrl: string;
}

export const packages = {
	'async-stack': {
		id: 'async-stack',
		name: '@svelte-put/async-stack',
		publishedAt: 1718900005785,
		description: 'type-safe and headless builder for async component stack',
		path: '/docs/async-stack',
		replId: undefined,
		status: 'new',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/async-stack',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/async-stack/CHANGELOG.md',
	},
	avatar: {
		id: 'avatar',
		name: '@svelte-put/avatar',
		publishedAt: 1670126470519,
		description: 'component & utilities for building avatars',
		path: '/docs/avatar',
		replId: 'd54381946b1c4ebd8e612e4568fbbbd0',
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/avatar',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/avatar/CHANGELOG.md',
	},
	clickoutside: {
		id: 'clickoutside',
		name: '@svelte-put/clickoutside',
		publishedAt: 1670126470519,
		description: 'event for clicking outside node',
		path: '/docs/clickoutside',
		replId: '9e5f9ee41c2c45aa8523993e357f6e78',
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/clickoutside',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/clickoutside/CHANGELOG.md',
	},
	'cloudflare-turnstile': {
		id: 'cloudflare-turnstile',
		name: '@svelte-put/cloudflare-turnstile',
		publishedAt: 1706788671789,
		description: 'action for rendering Cloudflare turnstile into HTML node',
		path: '/docs/cloudflare-turnstile',
		replId: '',
		status: 'new',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/cloudflare-turnstile',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/cloudflare-turnstile/CHANGELOG.md',
	},
	copy: {
		id: 'copy',
		name: '@svelte-put/copy',
		publishedAt: 1670126470519,
		description: 'action & utilities to copy text to clipboard',
		path: '/docs/copy',
		replId: undefined,
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/copy',
		changelogUrl: 'https://github.com/vnphanquang/svelte-put/blob/main/packages/copy/CHANGELOG.md',
	},
	dragscroll: {
		id: 'dragscroll',
		name: '@svelte-put/dragscroll',
		publishedAt: 1670126470519,
		description: 'action to add "drag-to-scroll" behavior',
		path: '/docs/dragscroll',
		replId: undefined,
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/dragscroll',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/dragscroll/CHANGELOG.md',
	},
	'inline-svg': {
		id: 'inline-svg',
		name: '@svelte-put/inline-svg',
		publishedAt: 1677319462005,
		description: 'solution for inlining SVGs in svelte land',
		path: '/docs/inline-svg',
		replId: undefined,
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/inline-svg',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/inline-svg/CHANGELOG.md',
	},
	intersect: {
		id: 'intersect',
		name: '@svelte-put/intersect',
		publishedAt: 1670126470519,
		description: 'svelte action that wraps for IntersectionObserver',
		path: '/docs/intersect',
		replId: '835eacce6ac44aff95a7cb0bb5ca200d',
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/intersect',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/intersect/CHANGELOG.md',
	},
	lockscroll: {
		id: 'lockscroll',
		name: '@svelte-put/lockscroll',
		publishedAt: 1690110240955,
		description: 'locking scroll and hide scrollbar within an HTML element',
		path: '/docs/lockscroll',
		replId: '8bfbdc1af58e43b2af4d625f63358a35',
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/lockscroll',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/lockscroll/CHANGELOG.md',
	},
	movable: {
		id: 'movable',
		name: '@svelte-put/movable',
		publishedAt: 1670126470519,
		description: 'move node on mousedown',
		path: '/docs/movable',
		replId: '88a7c1fc2e134db7b58786d5f385fc5d',
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/popover',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/popover/CHANGELOG.md',
	},
	preaction: {
		id: 'preaction',
		name: '@svelte-put/preaction',
		publishedAt: 1720071667925,
		description:
			'allow Svelte action to spread SSR-friendly attriutes',
		path: '/docs/preaction',
		replId: undefined,
		status: 'beta',
		rune: false,
		ready: true,
		githubUrl:
			'https://github.com/vnphanquang/svelte-put/tree/main/packages/preaction',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/preaction/CHANGELOG.md',
	},
	popover: {
		id: 'popover',
		name: '@svelte-put/popover',
		publishedAt: 1719825644314,
		description: 'Minimal and ssr-friendly enhancements to Popover API with idiomatic Svelte',
		path: '/docs/popover',
		replId: undefined,
		status: 'new',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/popover',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/popover/CHANGELOG.md',
	},
	'preprocess-auto-slug': {
		id: 'preprocess-auto-slug',
		name: '@svelte-put/preprocess-auto-slug',
		publishedAt: 1670126470519,
		description: 'svelte preprocessor to add id attribute and anchor tag',
		path: '/docs/preprocess-auto-slug',
		replId: undefined,
		status: 'stable',
		rune: false,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/auto-slug',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocess-auto-slug/CHANGELOG.md',
	},
	'preprocess-external-link': {
		id: 'preprocess-external-link',
		name: '@svelte-put/preprocess-external-link',
		publishedAt: 1717521500513,
		description:
			'svelte preprocessor to add appropriate attributes to anchor tags for external links',
		path: '/docs/preprocess-external-link',
		replId: undefined,
		status: 'new',
		rune: false,
		ready: true,
		githubUrl:
			'https://github.com/vnphanquang/svelte-put/tree/main/packages/preprocess-external-link',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocess-external-link/CHANGELOG.md',
	},
	qr: {
		id: 'qr',
		name: '@svelte-put/qr',
		publishedAt: 1697514047086,
		description: 'render QR as img or svg, optionally with logo',
		path: '/docs/qr',
		replId: '74c053b447e94244833f9c3d73210ae5',
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/qr',
		changelogUrl: 'https://github.com/vnphanquang/svelte-put/blob/main/packages/qr/CHANGELOG.md',
	},
	resize: {
		id: 'resize',
		name: '@svelte-put/resize',
		publishedAt: 1673513404459,
		description: 'Svelte action wrapper for ResizeObserver',
		path: '/docs/resize',
		replId: undefined,
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/resize',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/resize/CHANGELOG.md',
	},
	// select: {
	//   id: 'select',
	//   name: '@svelte-put/select',
	//   publishedAt: 1670126470519,
	//   description: 'type-safe and extensible select',
	//   path: '/docs/select',
	//   replId: '4f0d701ab5ed411ebbc9a71b0955385d',
	//   status: 'dev',
	// rune: false,
	//   ready: false,
	//   githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/select',
	//   changelogUrl:
	//     'https://github.com/vnphanquang/svelte-put/blob/main/packages/select/CHANGELOG.md',
	// },
	shortcut: {
		id: 'shortcut',
		name: '@svelte-put/shortcut',
		publishedAt: 1670126470519,
		description: 'add keyboard shortcuts to node',
		path: '/docs/shortcut',
		replId: undefined,
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/shortcut',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/main/packages/shortcut/CHANGELOG.md',
	},
	toc: {
		id: 'toc',
		name: '@svelte-put/toc',
		publishedAt: 1670126470519,
		description: 'action and utilities for building table of contents',
		path: '/docs/toc',
		replId: 'd9c896ac62cd41d49f80ffa249d292e6',
		status: 'stable',
		rune: true,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/toc',
		changelogUrl: 'https://github.com/vnphanquang/svelte-put/blob/main/packages/toc/CHANGELOG.md',
	},
} as const satisfies Record<string, Package>;

export type PackageId = keyof typeof packages;
export type PackageName = Package['name'];

export const deprecatedPackages = {
	modal: {
		id: 'modal',
		name: '@svelte-put/modal',
		publishedAt: 1670126470519,
		description: 'type-safe async modal builder',
		path: '/docs/modal',
		replId: '0a68001337544b8ab55995fb3d02d1f6',
		status: 'stable',
		rune: false,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/modal',
		changelogUrl: 'https://github.com/vnphanquang/svelte-put/blob/main/packages/modal/CHANGELOG.md',
	},
	noti: {
		id: 'noti',
		name: '@svelte-put/noti',
		publishedAt: 1670126470519,
		description: 'type-safe and headless async notification builder',
		path: '/docs/noti',
		replId: '5beb4357e32e427394f5f6f5ced7b5f1',
		status: 'stable',
		rune: false,
		ready: true,
		githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/noti',
		changelogUrl: 'https://github.com/vnphanquang/svelte-put/blob/main/packages/noti/CHANGELOG.md',
	},
	'preprocess-inline-svg': {
		id: 'preprocess-inline-svg',
		name: '@svelte-put/preprocess-inline-svg',
		publishedAt: 1677056235319,
		description: 'svelte preprocessor to inline static svg at build time',
		path: '/docs/preprocess-inline-svg',
		replId: undefined,
		status: 'stable',
		rune: false,
		ready: true,
		githubUrl:
			'https://github.com/vnphanquang/svelte-put/tree/svelte-4/packages/preprocess-inline-svg',
		changelogUrl:
			'https://github.com/vnphanquang/svelte-put/blob/svelte-4/packages/preprocess-inline-svg/CHANGELOG.md',
	},
	tooltip: {
	  id: 'tooltip',
	  name: '@svelte-put/tooltip',
	  publishedAt: 1670126470519,
	  description:
	    'over-engineered, type-safe, headless,  and extensible tooltip builder via Svelte action',
	  path: '/docs/tooltip',
	  replId: 'ac411d28f87b4b6d9942e050fa29e0cd',
	  status: 'stable',
	rune: true,
	  ready: true,
	  githubUrl: 'https://github.com/vnphanquang/svelte-put/tree/main/packages/tooltip',
	  changelogUrl:
	    'https://github.com/vnphanquang/svelte-put/blob/main/packages/tooltip/CHANGELOG.md',
	},
} as const satisfies Record<string, Package>;

