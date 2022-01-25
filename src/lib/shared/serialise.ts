import type { Challenge, Solution } from '../types';

export const serialise = (obj: Challenge | Solution): string =>
  [
    obj.version,
    obj.difficulty,
    obj.expiry.toSeconds().toFixed(0),
    obj.resource,
    obj.token,
    obj.algorithm,
    obj['solution']
  ]
    .filter((s) => s !== undefined)
    .join(':');
