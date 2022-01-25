import type { Solution } from '$lib/types';
import { DateTime, FixedOffsetZone } from 'luxon';

export const parseSolution = (input: string): Solution => {
  const split = input?.split(':');
  if (split?.length != 7) return undefined;
  const [version, difficulty, expiry, resource, token, algorithm, solution] = split;
  return {
    version,
    difficulty: parseInt(difficulty, 10),
    expiry: DateTime.fromSeconds(parseInt(expiry, 10), { zone: FixedOffsetZone.utcInstance }),
    resource,
    token,
    algorithm,
    solution
  };
};
