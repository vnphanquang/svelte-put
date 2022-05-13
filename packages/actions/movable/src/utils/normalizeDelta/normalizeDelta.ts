import type { MovableLimit } from '../../types';

/**
 * @internal
 *
 * MovableLimit interface normalized to use in runtime
 */
type NormalizedLimit = {
  unit: 'px' | '%';
  value: number;
};

/**
 * @internal
 *
 * @param delta - MovableLimit to normalize
 * @returns
 */
export function normalizeDelta(delta?: MovableLimit['delta']): {
  x: NormalizedLimit;
  y: NormalizedLimit;
} {
  const x: NormalizedLimit = { unit: 'px', value: 0 };
  const y: NormalizedLimit = { unit: 'px', value: 0 };

  const extractUnit = (text: string, axis?: 'x' | 'y'): 'px' | '%' => {
    let unit: 'px' | '%' = 'px';
    if (text.slice(-1) === '%') {
      unit = '%';
    } else if (text.slice(-2) === 'px') {
      unit = 'px';
    } else {
      throw new Error(`Invalid delta ${axis ?? ''} unit. Only 'px' and '%' are supported.`);
    }
    return unit;
  };

  if (delta) {
    if (typeof delta === 'string') {
      x.unit = y.unit = extractUnit(delta);
      x.value = y.value = parseInt(delta, 10);
      x.value = y.value = parseInt(delta.slice(0, -1));
    } else {
      x.unit = extractUnit(delta.x, 'x');
      x.value = parseInt(delta.x.slice(0, -1));

      y.unit = extractUnit(delta.y, 'y');
      y.value = parseInt(delta.y.slice(0, -1));
    }
  }

  return { x, y };
}
