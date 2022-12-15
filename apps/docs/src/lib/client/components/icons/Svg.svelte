<script lang="ts">
  // eslint-disable-next-line no-undef
  type $$Props = svelteHTML.IntrinsicElements['svg'] & {
    title?: string;
  };
  export let title = '';
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...$$restProps}>
  {#if title}
    <title>{title}</title>
  {/if}
  <slot />
</svg>
