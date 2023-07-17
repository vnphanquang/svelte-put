<script lang="ts">
  import { writable } from 'svelte/store';
  import shell from 'svelte-highlight/languages/shell';

  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import Code from '$client/components/Code/Code.svelte';
  import { PUBLIC_COOKIE_PACKAGE_MANAGER } from '$env/static/public';
  import { PACKAGE_MANAGERS, type PackageManager } from '$lib/shared/constants';

  export let pkg: string;
  export let dev = true;

  $: code = {
    npm: `npm install ${dev ? '--save-dev ' : ''}${pkg}`,
    pnpm: `pnpm add ${dev ? '-D ' : ''}${pkg}`,
    yarn: `yarn add ${dev ? '-D ' : ''}${pkg}`,
  } satisfies Record<PackageManager, string>;

  // NOTICE: This component is using page data and will fail in non svelte-kit context
  // Let's keep it as is, since it's minimal enough, and we have no need to scale this
  let preferredPackageManager = writable<PackageManager>(
    $page.data?.packageManager ?? PACKAGE_MANAGERS[0],
  );
  $: if (browser) {
    document.cookie = `${PUBLIC_COOKIE_PACKAGE_MANAGER}=${$preferredPackageManager}; path=/; SameSite=Lax; Secure`;
  }
</script>

<section>
  <h2>Installation</h2>
  <Code {code} lang={shell} title="terminal" bind:variant={$preferredPackageManager} />
</section>
