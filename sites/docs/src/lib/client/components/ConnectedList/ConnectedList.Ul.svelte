<script lang="ts">
  import { setIndexContext } from './ConnectedList.context';

  let cls = '';
  export { cls as class };

  setIndexContext();
</script>

<ul class="prose-p:m-0 prose-ul:m-0 prose-li:m-0 {cls}">
  <slot />
</ul>
