/* eslint-disable @typescript-eslint/no-explicit-any */

import { Action, ActionReturn } from 'svelte/action';
import type { HTMLAttributes } from 'svelte/elements';

import { Preaction } from './public';

export function make<
	Element = HTMLElement,
	Parameter = undefined,
	Attributes extends Record<string, any> = Record<never, any>,
	PreAttributes extends Record<string, any> = HTMLAttributes<HTMLElement>,
>(
	preaction: Preaction<Element, Parameter, Attributes, PreAttributes>,
): (
	...args: undefined extends Parameter ? [param?: Parameter] : [param: Parameter]
) => Action<Element, Parameter, Attributes>;

export function apply<
	Element = HTMLElement,
	Parameter = undefined,
	Attributes extends Record<string, any> = Record<never, any>,
	PreAttributes extends Record<string, any> = HTMLAttributes<HTMLElement>,
>(
	node: Element,
	preaction: ReturnType<ReturnType<typeof make<Element, Parameter, Attributes, PreAttributes>>>,
): void | ActionReturn<Parameter, Attributes>;

