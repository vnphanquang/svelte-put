<script lang="ts">
  import { movable, type MovableEventDetails } from '@svelte-put/movable';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import arrows from 'svelte-awesome/icons/arrows';
  import close from 'svelte-awesome/icons/close';
  import { fade } from 'svelte/transition';

  let modal = false;
  let containerNode: HTMLElement;
  let triggerNode: HTMLElement;

  let lastKnownPosition: MovableEventDetails['position'] = { left: 0, top: 0 };
  let actionStatus: 'idle' | 'started' | 'stopped' = 'idle';

  function updateLastKnownPosition(
    event: CustomEvent<MovableEventDetails>,
    status: 'started' | 'stopped',
  ) {
    lastKnownPosition = event.detail.position;
    actionStatus = status;
  }
</script>

<title>dev | @svelte-put</title>

<main class="flex flex-1 flex-col p-4">
  <h1 class="mt-10 text-center text-4xl font-bold">Development Environment</h1>
  <div class="mt-10 grid flex-1 gap-y-10 md:grid-cols-2">
    <section
      class="flex h-[50vh] flex-col items-center justify-center md:h-auto"
      id="control-panel"
    >
      <fieldset class="grid h-full w-full place-items-center border-2 border-red-500">
        <legend>Boundary</legend>
        <fieldset class="container relative border-2 border-blue-500" bind:this={containerNode}>
          <legend>Container Node</legend>
          {#if modal}
            <div
              transition:fade={{ duration: 200 }}
              class="modal inset-center absolute overflow-y-auto border-2 border-border bg-bg p-8 drop-shadow-lg hover:shadow-xl"
              use:movable={{
                limit: {
                  delta: '50px',
                  parent: containerNode,
                },
                trigger: triggerNode,
              }}
              on:movablestart={(e) => updateLastKnownPosition(e, 'started')}
              on:movableend={(e) => updateLastKnownPosition(e, 'stopped')}
            >
              <button class="c-btn-icon absolute top-4 right-4" on:click={() => (modal = false)}>
                <Icon data={close} />
              </button>
              <button
                bind:this={triggerNode}
                class="c-btn-icon absolute top-4 right-10 hover:cursor-move"
              >
                <Icon data={arrows} />
              </button>
              <p class="text-xl">Modal content goes here</p>
              <p class="mt-10">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, quasi
                repellendus voluptatem consequatur sed quia blanditiis, iure nam, incidunt quibusdam
                velit quo soluta corrupti? Explicabo voluptas voluptate adipisci incidunt
                perspiciatis!
              </p>
            </div>
          {/if}
        </fieldset>
      </fieldset>
    </section>
    <section class="px-10" id="demo">
      <h2 class="text-center text-2xl">Control Panel</h2>
      <div class="mt-10 md:p-20">
        <p class="mt-10">
          Last Known Position: <span class="font-bold"
            >{JSON.stringify(lastKnownPosition, null, 2)}</span
          >
        </p>
        <p class="mt-10">Action status: <span class="font-bold">{actionStatus}</span></p>
      </div>
      <div class="flex items-center justify-center">
        <button
          type="button"
          class="mt-10 bg-primary p-6 drop-shadow-lg hover:bg-orange-700"
          on:click={() => (modal = true)}
        >
          Click to open modal
        </button>
      </div>
    </section>
  </div>
</main>

<style>
  .container {
    width: calc(100% - 100px);
    height: calc(100% - 100px);
  }
  .modal {
    width: 75%;
    height: 75%;
  }
</style>
