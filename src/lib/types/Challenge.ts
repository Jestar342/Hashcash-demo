import type { DateTime } from 'luxon';

export type Challenge = {
  version: string;
  difficulty: number;
  expiry: DateTime;
  resource: string;
  token: string;
  algorithm: string;
};
