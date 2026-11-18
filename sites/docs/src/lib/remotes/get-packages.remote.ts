import { prerender } from '$app/server';

const PACKAGE_JSONS = import.meta.glob<{
	version: string;
	description: string;
}>('../../../../../packages/*/package.json', {
	import: 'default',
});

export const getPackages = prerender(async () => {
	return await Promise.all(
		Object.entries(PACKAGE_JSONS).map(async ([path, loadJSON]) => {
			const name = path.split('/').at(-2);
			const { version, description } = await loadJSON();
			return { name, version, description };
		}),
	);
});
