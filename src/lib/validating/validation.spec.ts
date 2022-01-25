import type { Solution } from '$lib/types';
import validate from './validate';

describe('When solving Hashcash', () => {
  // known correct solution
  const correctSolution = 'H:20:123456789:example.com:abcdefg:SHA256:201073';

  // made up solution
  const incorrectSolution = 'H:30:123456789:example.com:abcdefg:SHA256:123456';

  let correctResult: [Boolean, Solution];
  let incorrectResult: [Boolean, Solution];
  beforeAll(() => {
    correctResult = validate(correctSolution);
    incorrectResult = validate(incorrectSolution);
  });

  it('Should return true for known correct solution', () => {
    expect(correctResult[0]).toBeTrue();
  });

  it('Should return false for made up solution', () => {
    expect(incorrectResult[0]).toBeFalse();
  });
});
