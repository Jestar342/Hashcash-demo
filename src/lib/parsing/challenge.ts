import { DateTime, FixedOffsetZone } from 'luxon';
import type { Challenge } from '../types';

export const parseChallenge = (input: string): Challenge => {
  const [version, difficulty, expiry, resource, token, algorithm] = input.split(':');
  return {
    version,
    difficulty: parseInt(difficulty, 10),
    expiry: DateTime.fromSeconds(parseInt(expiry, 10), { zone: FixedOffsetZone.utcInstance }),
    resource,
    token,
    algorithm
  };
};
