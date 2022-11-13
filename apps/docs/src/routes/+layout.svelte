<script lang="ts">
  import { onMount } from 'svelte';

  import { dev, browser } from '$app/environment';
  import { page } from '$app/stores';
  import { webVitals } from '$lib/services/web-vitals';

  import '../lib/ui/styles/app.css';

  $: meta = $page.data.meta;

  $: title = meta?.title ?? '@svelte-put';
  $: description = meta?.description ?? 'Useful svelte actions, components, utilities';
  $: keywords = meta?.keywords ?? ['svelte', 'put', 'action', 'component', 'utility', 'collection'];

  $: ogTitle = meta?.og?.title ?? title;
  $: ogDescription = meta?.og?.description ?? description;
  $: ogType = meta?.og?.type ?? 'website';
  $: ogUrl = meta?.og?.url ?? 'https://svelte-put.vnphanquang.com';
  $: ogImage = meta?.og?.image ?? 'https://svelte-put.vnphanquang.com/images/og/svelte-put.png';

  $: twitterTitle = meta?.twitter?.title ?? ogTitle;
  $: twitterDescription = meta?.twitter?.description ?? ogDescription;
  $: twitterCard = meta?.twitter?.card ?? 'summary_large_image';
  $: twitterImage = meta?.twitter?.img ?? ogImage;
  $: twitterImageAlt = meta?.twitter?.imageAlt ?? '@svelte-put site';
  $: twitterSite = meta?.twitter?.site ?? '@vnphanquang';

  // eslint-disable-next-line no-undef
  let analyticsId = VERCEL_ANALYTICS_ID;
  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId,
    });
  }
  onMount(async () => {
    const inject = (await import('@vercel/analytics')).inject;
    if (inject && !dev) {
      inject();
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

  <meta name="twitter:title" content={twitterTitle} />
  <meta name="twitter:description" content={twitterDescription} />
  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:image" content={twitterImage} />
  <meta name="twitter:image:alt" content={twitterImageAlt} />
  <meta name="twitter:site" content={twitterSite} />
</svelte:head>

<slot />
