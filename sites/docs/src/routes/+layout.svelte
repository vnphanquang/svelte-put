<script lang="ts">
  import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';
  import { onMount } from 'svelte';

  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { modalStore } from '$client/services/modal';
  import { PUBLIC_MODE } from '$env/static/public';
  import { PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID, PUBLIC_ROOT_URL } from '$env/static/public';
  import { createGtagScriptTag, createPartytownSnippetScriptTag } from '$shared/utils/htmlScript';

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
  $: ogImage = meta?.og?.image ?? `${PUBLIC_ROOT_URL}/images/og/svelte-put.jpg`;
  $: ogImageAlt = meta?.og?.imageAlt ?? 'svelte-put';

  $: twitterTitle = meta?.twitter?.title ?? ogTitle;
  $: twitterDescription = meta?.twitter?.description ?? ogDescription;
  $: twitterCard = meta?.twitter?.card ?? 'summary_large_image';
  $: twitterImage = meta?.twitter?.img ?? ogImage;
  $: twitterImageAlt = meta?.twitter?.imageAlt ?? '@svelte-put site';
  $: twitterSite = meta?.twitter?.site ?? '@vnphanquang';

  $: analyticsEnabled = PUBLIC_MODE === 'production';

  let analyticsId = $page.data.vercelAnalyticsId;
  let webVitals: typeof import('$client/services/web-vitals').webVitals;
  $: if (browser && analyticsId && webVitals) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId,
    });
  }
  $: if (browser && analyticsEnabled && gtag) {
    gtag('config', PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: $page.url.href,
      page_path: $page.url.pathname,
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

  <script>
    partytown = {
      // forward the necessary functions to the web worker layer
      forward: ['gtag'],
    };
  </script>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html createPartytownSnippetScriptTag()}

  {#if analyticsEnabled}
    <script src="/_vercel/insights/script.js" type="text/partytown"></script>

    <!-- Google tag (gtag.js) -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html createGtagScriptTag(PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID)}
    <script type="text/partytown">
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        dataLayer.push(arguments);
      };
      gtag('js', new Date());
    </script>
  {/if}
</svelte:head>

<slot />

<ModalPortal store={modalStore} class="z-overlay" />
