# Changelog

## 2.0.0-next.1

### Minor Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`eb68654`](https://github.com/vnphanquang/svelte-put/commit/eb686548fe22a54bfd3fee2c9826eeaac7b76d80) Thanks [@github-actions](https://github.com/apps/github-actions)! - update Component typing, add `pause` & `resume` proxies on `NotificationController`, and return `resolution` in `resolve`

## 2.0.0-next.0

### Major Changes

- [`796ff16`](https://github.com/vnphanquang/svelte-put/commit/796ff16d4ffad1f7943b6a293e435da2616db6ed) Thanks [@vnphanquang](https://github.com/vnphanquang)! - drop support for Svelte 4 and below. Now using runes for fine-grained reactivity. See [docs page](https://svelte-put.vnphanquang.com/docs/noti) for more information

## 1.1.1

### Patch Changes

- [`5ca7d70`](https://github.com/vnphanquang/svelte-put/commit/5ca7d701a61b6d2f90e7a6b21f644b8ad93fc33e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - restrict to svelte 3 and 4 (not compatible with 5)

## 1.1.0

### Minor Changes

- [#225](https://github.com/vnphanquang/svelte-put/pull/225) [`e050621`](https://github.com/vnphanquang/svelte-put/commit/e0506210da96a0d13a5b899a6c16852dea922725) Thanks [@vnphanquang](https://github.com/vnphanquang)! - rename `PushedNotification` to `NotificationInstance` for better naming consistency

- [#225](https://github.com/vnphanquang/svelte-put/pull/225) [`dc21171`](https://github.com/vnphanquang/svelte-put/commit/dc211715f36b8fbf99b499ab9a2acefc5c7d04cf) Thanks [@vnphanquang](https://github.com/vnphanquang)! - inject `config` prop (`NotificationInstanceConfig`) is now `nofitication` (`NotificationInstance`), to enable better granular access and expose more helpful api to users

- [#225](https://github.com/vnphanquang/svelte-put/pull/225) [`12a321a`](https://github.com/vnphanquang/svelte-put/commit/12a321ab6e2a4c635378953a202ce565c1a64dbc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - support progress store in `NotificationInstance`, allowing pause & resume noti midway

- [#225](https://github.com/vnphanquang/svelte-put/pull/225) [`0b8791f`](https://github.com/vnphanquang/svelte-put/commit/0b8791ff3ca2cfd6cdc7bda565259b6f94b38d92) Thanks [@vnphanquang](https://github.com/vnphanquang)! - export a `Notification` component for easer custom portal building

## 1.0.0

### Major Changes

- [#216](https://github.com/vnphanquang/svelte-put/pull/216) [`64c6352`](https://github.com/vnphanquang/svelte-put/commit/64c63524ac12d22af1ed57f2f988d75b8082721d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - v1 here be dragons
