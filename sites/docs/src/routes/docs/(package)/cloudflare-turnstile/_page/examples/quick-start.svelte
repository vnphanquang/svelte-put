<script lang="ts">
	import { turnstile } from '@svelte-put/cloudflare-turnstile';

	import { PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY } from '$env/static/public';

  let token: string;
  $: console.log(`Token:`, token);
</script>

<div
  use:turnstile
  turnstile-sitekey={PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
  turnstile-theme="auto"
  turnstile-size="normal"
  turnstile-language="en"
  turnstile-response-field-name="turnstile"
  turnstile-response-field
  on:turnstile={(e) => (token = e.detail.token)}
/>
<p class="text-center">
	Captured Token: <span class="bg-success-surface text-success-text px-2">{token ?? 'pending'}</span>
</p>