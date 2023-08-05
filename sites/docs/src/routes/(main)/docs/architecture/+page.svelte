<script lang="ts">
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
</script>

<h1 class="font-fingerpaint">Architecture</h1>

<p class="c-callout-info">
  svelte-put is currently migrating away from Typescript for package source code to vanilla
  Javascript with JSDoc. This is very much inspired by the initiative taken by the svelte core team
  that did the same for svelte & kit repo. You can track the progress at <ResourceLink
    href="https://github.com/vnphanquang/svelte-put/issues/203">this Github issue</ResourceLink
  >.
  <br />Note that packages are still fully typed, the experience stays the same for Typescript
  users.
</p>

<p>
  Packages within the <code>svelte-put</code> collection follow, as much as possible, the following design
  decisions:
</p>
<ul>
  <li>
    Minimalism. Stay small, with as few dependencies as possible. Do one thing at a time, and do it
    well.
  </li>
  <li>
    Headless UI. Stay away from UI component abstraction as much as possible to avoid opinionated UI
    patterns and lock-in solutions, and in turn enable greater flexibility for users.
  </li>
  <li>
    Typescript support. Provide type-safety with self-documented code for code discovery and
    intellisense.
  </li>
</ul>
<p>
  Because of the philosophies above, you will find that the majority of packages rely primarily on
  <ResourceLink key="svelte action" /> and <ResourceLink key="svelte store" /> to encapsulate only the
  necessary logics and leave the UI to be defined by users.
</p>
<p>
  The tradeoff, however, is that sometimes it takes more verbose setup to achieve a desired system
  (in packages such as <ResourceLink key="@svelte-put/noti" /> and <ResourceLink
    key="@svelte-put/tooltip"
  />, for example). In my case, this forces me to "own" my code and get familiar with pieces of the
  package; if issues or customization demand arises, I will be more capable of providing solutions
  than say if I were to use a highly abstract prebuilt component.
</p>

<p>
  Shout out to <ResourceLink href="https://grail-ui.vercel.app/">Grail UI</ResourceLink>, one of a
  few libraries with similar headless pattern. Make sure to give it a look.
</p>
