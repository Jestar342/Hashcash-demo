import { DateTime } from 'luxon';
import type { Challenge } from '../types';
import { parseChallenge } from './challenge';

describe('When parsing a Challenge', () => {
  let parsed: Challenge;

  beforeAll(() => {
    const raw = 'H:20:1:example.com:token:SHA-256';
    parsed = parseChallenge(raw);
  });

  it('Should parse version', () => expect(parsed.version).toBe('H'));
  it('Should parse difficulty', () => expect(parsed.difficulty).toBe(20));
  it('Should parse expiry', () =>
    expect(parsed.expiry).toStrictEqual(DateTime.fromSeconds(1, { zone: 'utc' })));
  it('Should parse resource', () => expect(parsed.resource).toBe('example.com'));
  it('Should parse token', () => expect(parsed.token).toBe('token'));
  it('Should parse algorithm', () => expect(parsed.algorithm).toBe('SHA-256'));
});
