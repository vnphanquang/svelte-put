<script lang="ts">
  export let open = true;
  let cls = '';
  export { cls as class };
</script>

<div class="box {cls}" data-open={open}>
  <div class="box-content">
    <img
      src="/images/svelte-logo.svg"
      alt="svelte"
      height="128"
      width="107"
      loading="eager"
      decoding="sync"
    />
  </div>
  <div class="box-side box-side-front">
    <div class="box-side-front-em-top" />
    <div class="box-side-front-em-right" />
  </div>
  <div class="box-side box-side-back" />

  <div class="box-side box-side-right" />
  <div class="box-side box-side-left" />

  <div class="box-side box-side-top">
    <div class="box-side-top-left" />
    <div class="box-side-top-right" />
  </div>

  <div class="box-side box-side-bottom" />
</div>

<style lang="postcss">
  .box {
    --box-size-x: 100px;
    --box-size-y: 60px;
    --box-size-z: 40px;
    --border-color: #f28c28;

    transform-style: preserve-3d;

    width: var(--box-size-x);
    height: var(--box-size-y);

    perspective: 400px;
    perspective-origin: 280px -50px;
    border-color: var(--border-color);
  }

  @mixin dark .box, global {
    --border-color: white;
  }

  .box-side {
    --box-side-w: 0;
    --box-side-h: 0;
    --box-side-rx: 0;
    --box-side-ry: 0;
    --box-side-rz: 0;
    --box-side-x: 0;
    --box-side-y: 0;
    --box-side-z: 0;

    position: absolute;
    transform-style: preserve-3d;
    transform: translate3d(var(--box-side-x), var(--box-side-y), var(--box-side-z))
      rotateX(var(--box-side-rx)) rotateY(var(--box-side-ry)) rotateZ(var(--box-side-rz));

    display: flex;
    align-items: center;
    justify-content: center;

    width: var(--box-side-w);
    height: var(--box-side-h);

    backface-visibility: inherit;
    background-color: theme('backgroundColor.svelte');
    border-color: inherit;
    border-width: theme('borderWidth.2');
  }

  .box-side.box-side-front,
  .box-side.box-side-back {
    --box-side-w: var(--box-size-x);
    --box-side-h: var(--box-size-y);
  }

  .box-side.box-side-front {
    --box-side-z: calc(var(--box-size-z) / 2);

    /* background: rgba(90, 90, 90, 0.7); */
  }

  .box-side.box-side-back {
    --box-side-z: calc(var(--box-size-z) / -2);
    --box-side-ry: -180deg;

    /* background: rgba(0, 210, 0, 0.7); */
  }

  .box-side.box-side-right,
  .box-side.box-side-left {
    --box-side-w: var(--box-size-z);
    --box-side-h: var(--box-size-y);
  }

  .box-side.box-side-right {
    --box-side-x: calc(var(--box-size-x) - var(--box-size-z) / 2);
    --box-side-ry: 90deg;

    /* background: rgba(210, 0, 0, 0.7); */
  }

  .box-side.box-side-left {
    --box-side-x: calc(var(--box-size-z) / -2);
    --box-side-ry: -90deg;

    /* background: rgba(0, 0, 210, 0.7); */
  }

  .box-side.box-side-top,
  .box-side.box-side-bottom {
    --box-side-w: var(--box-size-x);
    --box-side-h: var(--box-size-z);
  }

  .box-side.box-side-top {
    --box-side-y: calc(var(--box-size-z) / -2);
    --box-side-rx: 90deg;

    background: none;

    /* background: rgba(210, 210, 0, 0.7); */
  }

  .box-side.box-side-bottom {
    --box-side-y: calc(var(--box-size-y) - var(--box-size-z) / 2);
    --box-side-rx: -90deg;

    /* background: rgba(210, 0, 210, 0.7); */
  }

  .box-side-front-em-top {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    width: 33.3333%;
    height: 25%;

    border-color: inherit;
    border-width: theme('borderWidth.2');
    border-top-width: 0;
  }

  .box-side-front-em-right {
    position: absolute;
    right: 0;
    bottom: 14px;
    transform: translateX(50%);

    width: 8px;
    height: 10px;

    background-color: theme('backgroundColor.svelte');
  }

  .box-side-top-left,
  .box-side-top-right {
    position: absolute;
    inset: 0 auto;

    background-color: theme('backgroundColor.svelte');
    border-color: inherit;
    border-width: theme('borderWidth.2');

    transition-timing-function: ease-out;
    transition-duration: 200ms;
    transition-property: transform;
  }

  .box-side-top-left {
    right: 50%;
    left: 0;
    transform-origin: left;
    transition-delay: 250ms;
  }

  .box-side-top-right {
    right: 0;
    left: 50%;
    transform-origin: right;
    transition-delay: 100ms;
  }

  .box-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);

    width: 107px;
    height: 128px;

    opacity: 0;

    transition-timing-function: ease-out;
    transition-duration: 200ms;
    transition-property: transform, opacity;
  }

  .box[data-open='true'] {
    & .box-side-top-left,
    & .box-side-top-right,
    & .box-content {
      transition-timing-function: ease-in;
    }

    & .box-side-top-left {
      transform: rotateY(-120deg);
    }

    & .box-side-top-right {
      transform: rotateY(120deg);
      transition-delay: 100ms;
    }

    & .box-content {
      transform: translate(-50%, -125%);
      opacity: 1;
      transition-delay: 250ms;
    }
  }
</style>
