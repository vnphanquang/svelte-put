<script lang="ts">
  export let open = true;
</script>

<div class="box {$$props.class}" {open}>
  <div class="box-content">
    <img src="/images/svelte-logo.svg" alt="svelte" height="128" width="107" />
  </div>
  <div class="box-side box-side--front">
    <div class="box-side-front-em-top" />
    <div class="box-side-front-em-right" />
  </div>
  <div class="box-side box-side--back" />

  <div class="box-side box-side--right" />
  <div class="box-side box-side--left" />

  <div class="box-side box-side--top">
    <div class="box-side-top-left" />
    <div class="box-side-top-right" />
  </div>

  <div class="box-side box-side--bottom" />
</div>

<style lang="postcss">
  .box {
    --box-size-x: 100px;
    --box-size-y: 60px;
    --box-size-z: 40px;

    width: var(--box-size-x);
    height: var(--box-size-y);
    perspective: 400px;
    perspective-origin: 280px -50px;
    transform-style: preserve-3d;
  }

  .box-side {
    transform-style: preserve-3d;
    --box-side-w: 0;
    --box-side-h: 0;

    --box-side-rx: 0;
    --box-side-ry: 0;
    --box-side-rz: 0;

    --box-side-x: 0;
    --box-side-y: 0;
    --box-side-z: 0;

    width: var(--box-side-w);
    height: var(--box-side-h);

    transform: translate3d(var(--box-side-x), var(--box-side-y), var(--box-side-z))
      rotateX(var(--box-side-rx)) rotateY(var(--box-side-ry)) rotateZ(var(--box-side-rz));

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    backside-visibility: inherit;

    @apply border-2 border-white bg-svelte;
  }

  .box-side.box-side--front,
  .box-side.box-side--back {
    --box-side-w: var(--box-size-x);
    --box-side-h: var(--box-size-y);
  }
  .box-side.box-side--front {
    --box-side-z: calc(var(--box-size-z) / 2);
    /* background: rgba(90, 90, 90, 0.7); */
  }
  .box-side.box-side--back {
    --box-side-z: calc(var(--box-size-z) / -2);
    --box-side-ry: -180deg;
    /* background: rgba(0, 210, 0, 0.7); */
  }

  .box-side.box-side--right,
  .box-side.box-side--left {
    --box-side-w: var(--box-size-z);
    --box-side-h: var(--box-size-y);
  }
  .box-side.box-side--right {
    --box-side-x: calc(var(--box-size-x) - var(--box-size-z) / 2);
    --box-side-ry: 90deg;
    /* background: rgba(210, 0, 0, 0.7); */
  }
  .box-side.box-side--left {
    --box-side-x: calc(var(--box-size-z) / -2);
    --box-side-ry: -90deg;
    /* background: rgba(0, 0, 210, 0.7); */
  }

  .box-side.box-side--top,
  .box-side.box-side--bottom {
    --box-side-w: var(--box-size-x);
    --box-side-h: var(--box-size-z);
  }
  .box-side.box-side--top {
    --box-side-y: calc(var(--box-size-z) / -2);
    --box-side-rx: 90deg;
    background: none;
    /* background: rgba(210, 210, 0, 0.7); */
  }
  .box-side.box-side--bottom {
    --box-side-y: calc(var(--box-size-y) - var(--box-size-z) / 2);
    --box-side-rx: -90deg;
    /* background: rgba(210, 0, 210, 0.7); */
  }

  .box-side-front-em-top {
    @apply absolute top-0 left-1/2 h-1/4 w-1/3 -translate-x-1/2 border-2 border-t-0 border-white;
  }
  .box-side-front-em-right {
    @apply absolute bg-svelte;
    width: 8px;
    height: 10px;
    right: 0px;
    bottom: 14px;
    transform: translateX(50%);
  }

  .box-side-top-left,
  .box-side-top-right {
    @apply absolute inset-y-0 border-2 border-white bg-svelte;
    transition-property: transform;
    transition-duration: 200ms;
    transition-timing-function: ease-out;
  }

  .box-side-top-left {
    transition-delay: 250ms;
    transform-origin: left;
    left: 0;
    right: 50%;
  }
  .box-side-top-right {
    transition-delay: 100ms;
    transform-origin: right;
    left: 50%;
    right: 0;
  }
  .box-content {
    transition-property: transform, opacity;
    transition-duration: 200ms;
    transition-timing-function: ease-out;

    width: 107px;
    height: 128px;

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    opacity: 0;
  }

  .box[open='true'] {
    & .box-side-top-left,
    & .box-side-top-right,
    & .box-content {
      transition-timing-function: ease-in;
    }

    & .box-side-top-left {
      transform: rotateY(-120deg);
    }
    & .box-side-top-right {
      transition-delay: 100ms;
      transform: rotateY(120deg);
    }
    & .box-content {
      transition-delay: 250ms;
      transform: translate(-50%, -125%);
      opacity: 1;
    }
  }
</style>
