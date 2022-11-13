<script lang="ts">
  import { onMount } from 'svelte';

  import { dev } from '$app/environment';
  import { page } from '$app/stores';

  import '../lib/ui/styles/app.css';

  $: meta = $page.data.meta;

  $: title = meta?.title ?? '@svelte-put';
  $: description = meta?.description ?? 'Useful svelte actions, components, utilities';
  $: keywords = meta?.keywords ?? ['svelte', 'put', 'action', 'component', 'utility', 'collection'];

  $: ogTitle = meta?.og?.title ?? title;
  $: ogDescription = meta?.og?.description ?? description;
  $: ogType = meta?.og?.type ?? 'website';
  $: ogImage = meta?.og?.image ?? '/images/screenshots/screenshot-428x926.png';
  $: ogUrl = meta?.og?.url ?? 'https://svelte-put.vnphanquang.com';

  $: twitterCard = meta?.twitter?.card ?? 'summary_large_image';
  $: twitterImageAlt = meta?.twitter?.imageAlt ?? '@svelte-put site';
  $: twitterSite = meta?.twitter?.site ?? '@vnphanquang';

  onMount(async () => {
    const inject = (await import('@vercel/analytics')).inject;
    if (inject && !dev) {
      inject();
    }
    const webVitals = (await import('$lib/services/web-vitals')).webVitals;
    // eslint-disable-next-line no-undef
    const analyticsId = VERCEL_ANALYTICS_ID;
    if (webVitals && analyticsId) {
      webVitals({
        path: $page.url.pathname,
        params: $page.params,
        analyticsId,
      });
    }
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
  <meta property="og:url" content={ogUrl} />

  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:image:alt" content={twitterImageAlt} />
  <meta name="twitter:site" content={twitterSite} />
</svelte:head>

<slot />
