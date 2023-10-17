<script>
  import { createEventDispatcher, onMount } from 'svelte';

  import { createSVGParts } from '../qr/index.js';

  $: ({ anchors, attributes, logo, modules } = createSVGParts(
    /** @type {import('./QR.svelte').QRProps} */ ($$props),
  ));
  $: innerHTML = `${anchors}${modules}${logo}`;

  /** @type {SVGElement}*/
  let element;
  /** @type {ReturnType<typeof createEventDispatcher<{ 'qr:init': typeof element }>>}*/
  const dispatch = createEventDispatcher();
  onMount(() => {
    if (element) dispatch('qr:init', element);
  });
</script>

<!-- eslint-disable svelte/no-at-html-tags  -->
<slot {attributes} {innerHTML}>
  <svg {...attributes} {...$$restProps} bind:this={element}>
    {@html innerHTML}
  </svg>
</slot>
