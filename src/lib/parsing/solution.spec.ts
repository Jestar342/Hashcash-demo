import { parseSolution } from './solution';
import type { Solution } from '../types';
import { DateTime } from 'luxon';

describe('When parsing a Solution', () => {
  let parsed: Solution;

  beforeAll(() => {
    const raw = 'H:25:397506720:foo.com/lol/rofl.html:46asdfe_jloij=:SHA-256:1965984';
    parsed = parseSolution(raw);
  });

  it('Should parse version', () => expect(parsed.version).toBe('H'));
  it('Should parse difficulty', () => expect(parsed.difficulty).toBe(25));
  it('Should parse expiry', () =>
    expect(parsed.expiry).toStrictEqual(DateTime.fromSeconds(397506720, { zone: 'utc' })));
  it('Should parse resource', () => expect(parsed.resource).toBe('foo.com/lol/rofl.html'));
  it('Should parse token', () => expect(parsed.token).toBe('46asdfe_jloij='));
  it('Should parse algorithm', () => expect(parsed.algorithm).toBe('SHA-256'));
  it('Should parse solution', () => expect(parsed.solution).toBe('1965984'));
});
