<script>
  import { movable } from '@svelte-put/movable';
</script>

<div class="grid h-40 w-40 place-items-center bg-blue-200" use:movable={{ ignore: '.to-ignore' }}>
  <p class="to-ignore bg-red-200 p-2 text-sm">To ignore</p>
</div>
