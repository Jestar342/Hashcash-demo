import { parseChallenge } from '$lib/parsing/challenge';
import type { Solution } from '$lib/types';

const hashFunction = async (algorithm: string, input: string): Promise<string> => {
  const array = new TextEncoder().encode(input);
  const buffer = await window.crypto.subtle.digest(algorithm, array);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(2).padStart(8, '0'))
    .join('');
};

export const solve = async (input: string): Promise<[solution: Solution, hash: string]> => {
  const { difficulty, algorithm, ...others } = parseChallenge(input);

  let nonce = -1;
  let attempt: string;
  let valid = false;
  let line: string;

  do {
    line = `${input}:${(++nonce).toString(10)}`;
    attempt = await hashFunction(algorithm, line);
    valid = attempt.startsWith(''.padStart(difficulty, '0'));
  } while (!valid);

  return [{ difficulty, algorithm, solution: nonce.toString(10), ...others }, attempt];
};
