import type { ActionReturn, Action } from 'svelte/action';
import { Readable } from 'svelte/store';

import type { createLockScrollStore } from './lockscroll.js';

export type LockScrollStore = ReturnType<typeof createLockScrollStore>;
export type LockScrollParameter = boolean | LockScrollStorePattern;
export type LockScrollStorePattern = LockScrollStore | Readable<boolean>;
export type LockScrollDetail = {
	locked: boolean;
};
export type LockScrollAttributes = {
	'onlockscrolltoggle'?: (event: CustomEvent<LockScrollDetail>) => void;
};
export type LockScrollAction = Action<HTMLElement, LockScrollParameter, LockScrollAttributes>;
export type LockScrollActionReturn = ActionReturn<LockScrollParameter, LockScrollAttributes>;
