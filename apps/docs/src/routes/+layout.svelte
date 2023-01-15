<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { partytownSnippet } from '@builder.io/partytown/integration';
  import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';
  import { onMount } from 'svelte';

  import { dev, browser } from '$app/environment';
  import { page } from '$app/stores';
  import { appStore } from '$client/services/modal';
  import { PUBLIC_ROOT_URL } from '$env/static/public';

  import '../lib/client/styles/app.css';

  $: meta = $page.data.meta;

  $: title = meta?.title ?? '@svelte-put';
  $: description =
    meta?.description ??
    'Useful svelte actions, components, utilities battle-tested in real work projects';
  $: keywords = meta?.keywords ?? ['svelte', 'put', 'action', 'component', 'utility', 'collection'];

  $: ogTitle = meta?.og?.title ?? title;
  $: ogDescription = meta?.og?.description ?? description;
  $: ogType = meta?.og?.type ?? 'website';
  $: ogUrl = meta?.og?.url ?? `${PUBLIC_ROOT_URL}${$page.url.pathname}`;
  $: ogImage = meta?.og?.image ?? `${PUBLIC_ROOT_URL}/images/og/svelte-put.png`;
  $: ogImageAlt = meta?.og?.imageAlt ?? 'svelte-put';

  $: twitterTitle = meta?.twitter?.title ?? ogTitle;
  $: twitterDescription = meta?.twitter?.description ?? ogDescription;
  $: twitterCard = meta?.twitter?.card ?? 'summary_large_image';
  $: twitterImage = meta?.twitter?.img ?? ogImage;
  $: twitterImageAlt = meta?.twitter?.imageAlt ?? '@svelte-put site';
  $: twitterSite = meta?.twitter?.site ?? '@vnphanquang';

  // eslint-disable-next-line no-undef
  let analyticsId = $page.data.vercelAnalyticsId;
  let webVitals: typeof import('$client/services/web-vitals').webVitals;
  $: if (browser && analyticsId && webVitals) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId,
    });
  }
  onMount(async () => {
    webVitals = (await import('$client/services/web-vitals')).webVitals;
  });
</script>

<svelte:head>
  <!-- SEO meta tags -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords.join(', ')} />

  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={ogDescription} />
  <meta property="og:type" content={ogType} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:alt" content={ogImageAlt} />
  <meta property="og:url" content={ogUrl} />

  <meta name="twitter:title" content={twitterTitle} />
  <meta name="twitter:description" content={twitterDescription} />
  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:image" content={twitterImage} />
  <meta name="twitter:image:alt" content={twitterImageAlt} />
  <meta name="twitter:site" content={twitterSite} />

  <link href={ogUrl} rel="canonical" />
  <link type="text/plain" rel="author" href="{PUBLIC_ROOT_URL}/humans.txt" />

  <!-- partytown scripts -->
  <script>
    // Forward the necessary functions to the web worker layer
    partytown = {
      forward: ['dataLayer.push'],
    };
  </script>
  {@html `<script>${partytownSnippet()}</script>`}
  {#if !dev}
    <script src="/_vercel/insights/script.js" type="text/partytown"></script>
    <!-- Google tag (gtag.js) -->
    <script
      type="text/partytown"
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-YMF3X1CHQL"
    ></script>
    <script type="text/partytown">
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', 'G-YMF3X1CHQL');
    </script>
  {/if}
  <!-- partytown scripts -->
</svelte:head>

<slot />

<ModalPortal store={appStore} class="z-overlay" />
