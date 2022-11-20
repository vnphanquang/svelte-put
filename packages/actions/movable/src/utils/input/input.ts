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
  return {
    enabled: parameters.enabled ?? true,
    parent: parameters.limit?.parent,
    normalizedDelta: normalizeDelta(parameters.limit?.delta),
    handle: parameters.handle ?? parameters.trigger ?? node,
    ignore: parameters.ignore
      ? typeof parameters.ignore === 'string'
        ? [parameters.ignore]
        : parameters.ignore
      : [],
  };
}
