<script lang="ts">
  import { turnstile } from '@svelte-put/cloudflare-turnstile';
</script>

<div
  use:turnstile
  turnstile-sitekey="3x00000000000000000000FF"
  turnstile-theme="dark"
  on:turnstile={(e) => {
    console.log('on:turnstile', e.detail);
  }}
  on:turnstile:before-interactive={(e) => {
    console.log('on:turnstile:before-interactive', e.detail);
  }}
  on:turnstile:after-interactive={(e) => {
    console.log('on:turnstile:after-interactive', e.detail);
  }}
  on:turnstile:error={(e) => {
    console.log('on:turnstile:error', e.detail);
  }}
  on:turnstile:expired={(e) => {
    console.log('on:turnstile:expired', e.detail);
  }}
  on:turnstile:timeout={(e) => {
    console.log('on:turnstile:timeout', e.detail);
  }}
  on:turnstile:unsupported={(e) => {
    console.log('on:turnstile:unsupported', e.detail);
  }}
/>
