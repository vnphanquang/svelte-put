<script>
  import { page } from '$app/stores';

  function back() {
    history.back();
  }
</script>

<main class="grid h-screen w-screen place-items-center">
  <div class="space-y-10 text-center">
    <h1 class="text-5xl font-bold tracking-widest">{$page.status}</h1>
    <p class="text-xl">
      {$page.error?.message ?? 'Something went wrong...'}
    </p>
    <div class="flex items-center space-x-10">
      <button class="c-btn-primary" on:click={back}> Back </button>
      <a class="c-btn-primary-outline" href="/"> Home </a>
    </div>
  </div>
</main>
