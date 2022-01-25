import type { RequestHandler } from '@sveltejs/kit';
import { generateChallenge, challengesFor } from '$lib/generation';
import { validate } from '$lib/validating';
import { serialise } from '$lib/shared';

const newChallengeFor = (userKey: string, difficulty: string) => {
  const diff = difficulty ? parseInt(difficulty, 10) : undefined;
  return {
    status: 402,
    headers: {
      'Hashcash-Challenge': serialise(generateChallenge(userKey, diff))
    },
    body: { message: 'Client must complete the Hashcash to proceed' }
  };
};

export const get: RequestHandler = (ctx) => {
  const searchParams = ctx.url.searchParams;

  const userKey = searchParams.get('u');
  const difficulty = searchParams.get('d');

  if (!userKey) {
    return {
      status: 400,
      body: { message: 'Must provide a userKey (?u=123)' }
    };
  }

  const hashcash = ctx.request.headers.get('hashcash');
  const [valid, solution] = validate(hashcash);
  if (!valid) return newChallengeFor(userKey, difficulty);
  const existingChallenges = challengesFor(userKey);
  const challenge = solution && existingChallenges.find((c) => c.token === solution.token);
  if (!challenge) return newChallengeFor(userKey, difficulty);

  return {
    status: 200,
    body: { message: 'Welcome to the promised land!' }
  };
};
