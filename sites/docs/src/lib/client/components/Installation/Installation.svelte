<script lang="ts" context="module">
  import { writable } from 'svelte/store';

  import { browser } from '$app/environment';

  const LS_KEY = 'preferredPackageManager';
  const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn'] as const;
  type PackageManager = (typeof PACKAGE_MANAGERS)[number];

  let preferredPackageManager = writable<PackageManager>(
    browser ? loadPreference() : PACKAGE_MANAGERS[0],
  );

  function loadPreference(): PackageManager {
    //`preferred` is actually string | null, but we explicitly check afterwards.
    //TS's type-inference is not very good around `Array.prototype.includes`
    const preferred = localStorage.getItem(LS_KEY) as PackageManager;

    return PACKAGE_MANAGERS.includes(preferred) ? preferred : PACKAGE_MANAGERS[0];
  }

  if (browser)
    preferredPackageManager.subscribe((preference) => localStorage.setItem(LS_KEY, preference));
</script>

<script lang="ts">
  import shell from 'svelte-highlight/languages/shell';

  import Code from '$client/components/Code/Code.svelte';

  export let pkg: string;
  export let dev = true;

  $: code = {
    npm: `npm install ${dev ? '--save-dev ' : ''}${pkg}`,
    pnpm: `pnpm add ${dev ? '-D ' : ''}${pkg}`,
    yarn: `yarn add ${dev ? '-D ' : ''}${pkg}`,
  } satisfies Record<PackageManager, string>;
</script>

<section>
  <h2>Installation</h2>
  <Code {code} lang={shell} title="terminal" bind:variant={$preferredPackageManager} />
</section>
