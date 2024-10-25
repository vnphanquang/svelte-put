/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ActionReturn } from 'svelte/action';
import type { HTMLAttributes } from 'svelte/elements';

export interface Preaction<
	Element = HTMLElement,
	Parameter = undefined,
	Attributes extends Record<string, any> = Record<never, any>,
	PreAttributes extends Record<string, any> = HTMLAttributes<HTMLElement>,
> {
	(param: Parameter): {
		action: ( ...args: undefined extends Parameter ? [node: Element, parameter?: Parameter] : [node: Element, parameter: Parameter]) => void | ActionReturn<Parameter, Attributes>;
		attributes?: PreAttributes;
	};
	__preaction__?: true;
}

