export function createNpmUrl(pkg: string) {
  return `https://www.npmjs.com/package/${pkg}`;
}

export function createNpmBadgeUrl(pkg: string) {
  return `https://img.shields.io/npm/v/${pkg}?style=for-the-badge`;
}

export function createBundlephobiaUrl(pkg: string) {
  return `https://bundlephobia.com/package/${pkg}`;
}

export function createBundlephobiaBadgeUrl(pkg: string) {
  return `https://img.shields.io/bundlephobia/minzip/${pkg}?label=minzipped&style=for-the-badge`;
}

export function createSvelteReplUrl(id: string) {
  return `https://svelte.dev/repl/${id}`;
}

export function createSvelteReplBadgeUrl() {
  return 'https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00&style=for-the-badge';
}

export function createChangelogBadgeUrl() {
  return 'https://img.shields.io/badge/-changelog-blue?style=for-the-badge';
}
