import type { LinkGroup, Loaders, Manifest } from '@internals/docpage';

const docs = import.meta.glob<Loaders>('../../../../packages/*/src/docs/index.ts');
const ogs = import.meta.glob<string>('../../../../packages/*/src/docs/og.jpg', {
	query: 'url',
	import: 'default',
});
const manifests = import.meta.glob<Manifest>('../../../../packages/*/package.json', {
	import: 'default',
});

export const packages = Object.keys(docs).map((p) => p.split('/')[5]);

export async function getLoadersByPackage(pkg: string): Promise<Loaders | null> {
	const path = `../../../../packages/${pkg}/src/docs/index.ts`;
	if (!docs[path]) return null;
	return await docs[path]();
}

export async function getManifestByPackage(pkg: string): Promise<Manifest | null> {
	const path = `../../../../packages/${pkg}/package.json`;
	if (!manifests[path]) return null;
	return await manifests[path]();
}

export async function getOgImageUrlByPackage(pkg: string): Promise<string | null> {
	const path = `../../../../packages/${pkg}/src/docs/og.jpg`;
	if (!ogs[path]) return null;
	return await ogs[path]();
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
