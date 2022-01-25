import { DateTime, Duration } from 'luxon';
import generateToken from './generateToken';
import { Algorithm, Challenge } from '$lib/types';

const TOKEN_LENGTH = 8;
const CHALLENGE_TTL = Duration.fromObject({ minutes: 5 });
const DIFFICULTY_STEP = 2;
const INITIAL_DIFFICULTY = 15;

const challenges: {
  [userKey: string]: { token: string; expiry: DateTime; difficulty: number }[];
} = {};

export const generateChallenge = (
  userKey: string,
  difficulty: number = undefined,
  algorithm: Algorithm = Algorithm.SHA256
): Challenge => {
  difficulty = difficulty ?? (challenges[userKey]?.length ?? INITIAL_DIFFICULTY) + DIFFICULTY_STEP; // scale with how many attempts are stacked
  const expiry = DateTime.now().plus(CHALLENGE_TTL);
  const token = generateToken(TOKEN_LENGTH);

  if (challenges[userKey] === undefined) challenges[userKey] = [];
  challenges[userKey].push({ difficulty, token, expiry });

  return {
    version: 'H',
    difficulty,
    expiry: expiry,
    resource: 'blah.com',
    token,
    algorithm
  };
};

export const challengesFor = (userKey: string) =>
  challenges[userKey]?.filter((c) => DateTime.now() < c.expiry) ?? [];

export const resetFor = (userKey: string) => delete challenges[userKey];
