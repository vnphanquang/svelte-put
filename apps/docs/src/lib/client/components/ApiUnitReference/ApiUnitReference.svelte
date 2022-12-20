<script lang="ts">
  export let name = '';
  export let type = '';
  export let d = '';
</script>

<section>
  {#if name || $$slots.name}
    <slot name="name">
      <h3><code>{name}</code></h3>
    </slot>
  {/if}
  <div class="pl-6 prose-p:m-0">
    {#if type || $$slots.type}
      <slot name="type">
        <p>
          <strong>Type</strong>: <code>{type}</code>
        </p>
      </slot>
    {/if}
    {#if d || $$slots.d}
      <slot name="d">
        <p>
          <strong>Default</strong>: <code>{d}</code>
        </p>
      </slot>
    {/if}
    {#if $$slots.default}
      <p class="pt-3">
        <slot />
      </p>
    {/if}
  </div>
</section>
