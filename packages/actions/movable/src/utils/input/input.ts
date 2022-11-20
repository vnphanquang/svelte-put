import type { MovableParameters } from '../../movable.types';
import { normalizeDelta } from '../normalizeDelta';

/**
 *
 * @internal
 *
 * @param node
 * @param parameters
 * @returns
 */
export function input(node: HTMLElement, parameters: MovableParameters) {
  const handle = parameters.handle ?? parameters.trigger ?? node;
  const selector = (
    parameters.ignore
      ? typeof parameters.ignore === 'string'
        ? [parameters.ignore]
        : parameters.ignore
      : []
  ).join(',');
  let ignore: HTMLElement[] = [];
  if (selector) {
    ignore = Array.from(handle.querySelectorAll(selector));
  }
  return {
    enabled: parameters.enabled ?? true,
    parent: parameters.limit?.parent,
    normalizedDelta: normalizeDelta(parameters.limit?.delta),
    handle,
    ignore,
    cursor: parameters.cursor ?? true,
  };
}
