<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import ImgAction from './_page/codes/img-action.svelte';
  import ImgComponentWithDefaultSlot from './_page/codes/img-component-with-custom-default-slot.svelte';
  import ImgComponent from './_page/codes/img-component.svelte';
  import SvgAction from './_page/codes/svg-action.svelte';
  import SvgComponentWithDefaultSlot from './_page/codes/svg-component-with-custom-default-slot.svelte';
  import SvgComponent from './_page/codes/svg-component.svelte';

  export let data: PageData;

  let svgVariant: keyof typeof codes.svg;
  let imgVariant: keyof typeof codes.img;
</script>

<Installation pkg={data.package.name} />

<section>
  <h2>SVG</h2>
  <div class="grid gap-8 grid-cols-1 sm:grid-cols-[2fr,1fr]">
    <div class="flex-1">
      <p class="mt-0">
        <code>@svelte-put/qr</code> allows rendering QR as <code>svg</code>. Depending on the
        scenario, you may find certain strategy more convenient than others.
      </p>
      <ul>
        <li>
          <button class="c-btn-text-secondary" on:click={() => (svgVariant = 'action')}
            >action</button
          >: quick and minimal, enough if you do not care about server side rendering (SSR) /
          prerendering, and especially helpful if you need access to the <code>SVGElement</code> (for
          styling or custom event handling).
        </li>
        <li>
          <button class="c-btn-text-secondary" on:click={() => (svgVariant = 'component')}
            >component</button
          >: good if you prefer having component abstraction, also applicable to SSR / prerendering.
          However, you lose direct access to the <code>SVGElement</code>.
        </li>
        <li>
          <button class="c-btn-text-secondary" on:click={() => (svgVariant = 'default slot')}
            >component with custom default slot</button
          >: good if you want a component and also be able to customize the <code>SVGElement</code>.
        </li>
      </ul>
    </div>

    <div>
      {#if svgVariant === 'action'}
        <SvgAction />
      {:else if svgVariant === 'component'}
        <SvgComponent />
      {:else}
        <SvgComponentWithDefaultSlot />
      {/if}
    </div>
  </div>
  <p class="c-callout-info">
    Note the imports from subpackage <code>@svelte-put/qr/svg</code> in the examples of this section.
  </p>

  <Code code={codes.svg} bind:variant={svgVariant} title="SVG rendering strategies" />
</section>

<section>
  <h2>Image</h2>
  <div class="grid gap-8 grid-cols-1 sm:grid-cols-[2fr,1fr]">
    <div class="flex-1">
      <p class="mt-0">
        <code>@svelte-put/qr</code> also allows rendering QR as <code>img</code>. The strategies are
        similar to those found in the previous section.
      </p>
      <ul>
        <li>
          <button class="c-btn-text-secondary" on:click={() => (imgVariant = 'action')}
            >action</button
          >: quick and minimal, but only rendered at runtime in browser.
        </li>
        <li>
          <button class="c-btn-text-secondary" on:click={() => (imgVariant = 'component')}
            >component</button
          >: useful for SSR and prerendering.
        </li>
        <li>
          <button class="c-btn-text-secondary" on:click={() => (imgVariant = 'default slot')}
            >component with custom default slot</button
          >: useful if you need to custom the <code>HTMLImageElement</code>.
        </li>
      </ul>
      <p>Underneath, the image is just an inline base64 encoding of the rendered svg.</p>
    </div>

    <div>
      {#if imgVariant === 'action'}
        <ImgAction />
      {:else if imgVariant === 'component'}
        <ImgComponent />
      {:else}
        <ImgComponentWithDefaultSlot />
      {/if}
    </div>
  </div>
  <p class="c-callout-info">
    Note the imports from subpackage <code>@svelte-put/qr/img</code> in the examples of this section.
  </p>

  <Code code={codes.img} bind:variant={imgVariant} title="Image rendering strategies" />
</section>

<section>
  <h2>Configuration</h2>
  <p>
    Rendering strategies exported by <code>@svelte-put/qr</code> (<code>img</code> or
    <code>svg</code>, component or action) all share the following configuration interface.
  </p>
  <Code code={codes.config} title="configuration interface" lang={typescript} />
</section>

<section>
  <h2>Events</h2>
  <p>
    All rendering strategies share a <code>qr:init</code>
    <ResourceLink key="CustomEvent" /> that fires when the rendering is completed. The
    <code>event.detail</code>
    is the element (either <code>SVGElement</code> or <code>HTMLImageElement</code>).
  </p>
  <p>
    <code>@svelte-put/qr/img/QR.svelte</code> might also fire another <ResourceLink
      key="CustomEvent"
    /> named <code>logofetch</code>, the <code>detail</code> of which is the base64 encoded logo.
    This only happens if you specify the <code>logo</code> prop as <code>/http*./</code>, which has
    to be fetched manually to be compatible for conversion to static base64 svg.
  </p>
  <Code code={codes.events} title="event handling examples" expanded={false} />
</section>

<section>
  <h1>Kudos</h1>
  <p>
    This package is made possible by <ResourceLink
      href="https://www.npmjs.com/package/qrcode-generator">qrcode-generator</ResourceLink
    > and heavily inspired by <ResourceLink href="https://github.com/bitjson/qr-code"
      >bitjson/qr-code</ResourceLink
    >. Please go check their work for more information.
  </p>
</section>
