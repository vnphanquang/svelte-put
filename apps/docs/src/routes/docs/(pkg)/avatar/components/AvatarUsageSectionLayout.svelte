<div class="flex items-start justify-between">
  <div>
    <slot />
  </div>
  <div class="not-prose shrink-0 p-5">
    <slot name="avatar" />
  </div>
</div>
<slot name="code" />
