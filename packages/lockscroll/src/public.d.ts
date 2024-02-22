import type { ActionReturn, Action } from 'svelte/action';
import { Readable } from 'svelte/store';

import type { createLockScrollStore } from './lockscroll.js';

export type LockScrollStore = ReturnType<typeof createLockScrollStore>;

/** @public */
export type LockScrollParameter = boolean | LockScrollStorePattern;

export type LockScrollStorePattern = LockScrollStore | Readable<boolean>;

/** @public */
export type LockScrollDetail = {
	locked: boolean;
};

/** @public */
export type LockScrollAttributes = {
	'on:lockscroll:toggle'?: (event: CustomEvent<LockScrollDetail>) => void;
};

/** @public */
export type LockScrollAction = Action<HTMLElement, LockScrollParameter, LockScrollAttributes>;

/** @public */
export type LockScrollActionReturn = ActionReturn<LockScrollParameter, LockScrollAttributes>;
