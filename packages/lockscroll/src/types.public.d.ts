import type { ActionReturn, Action } from 'svelte/action';

export type LockScrollParameter = boolean;
export type LockScrollDetail = {
	locked: boolean;
};
export type LockScrollAttributes = {
	onlockscrolltoggle?: (event: CustomEvent<LockScrollDetail>) => void;
};
export type LockScrollAction = Action<HTMLElement, LockScrollParameter, LockScrollAttributes>;
export type LockScrollActionReturn = ActionReturn<LockScrollParameter, LockScrollAttributes>;
