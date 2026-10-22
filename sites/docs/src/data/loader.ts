import { type LinkGroup, type Loaders } from '@internals/docpage';

export const loaders = import.meta.glob<Loaders>('../../../../packages/*/src/docs/index.ts');

export const packages = Object.keys(loaders).map((p) => p.split('/')[5]);

export async function getLoadersByPackage(pkg: string): Promise<Loaders | null> {
	const path = `../../../../packages/${pkg}/src/docs/index.ts`;
	if (!loaders[path]) return null;
	return await loaders[path]();
}

export const packageLinkGroup: LinkGroup = {
	type: 'group',
	title: 'Packages',
	pages: packages.map((pkg) => ({
		type: 'page',
		title: pkg,
		id: `package.${pkg}`,
		href: `/packages/${pkg}`,
	})),
};
