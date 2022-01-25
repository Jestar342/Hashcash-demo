import type { Challenge } from '$lib/types';
import * as challengeManager from './challengeManager';

describe('Generate challenge', () => {
  const challenges: Challenge[] = [];
  beforeAll(() =>
    [...Array(5)].forEach((_, i) =>
      challenges.push(challengeManager.generateChallenge('myKey', i + 1))
    )
  );

  it('Should step up the difficulty for the user', () => {
    const difficulties = challenges.map((c) => c.difficulty);
    expect(difficulties).toEqual([1, 2, 3, 4, 5]);
  });

  it('Should persist challenges for user', () => {
    const persisted = challengeManager.challengesFor('myKey');
    expect(persisted).toHaveLength(5);
    expect(persisted.map((p) => p.difficulty)).toIncludeAllMembers([1, 2, 3, 4, 5]);
  });
});
