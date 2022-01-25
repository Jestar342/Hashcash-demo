import { createHash } from 'crypto';
import { parseSolution } from '../parsing';
import type { Solution } from '$lib/types';
import { Algorithm } from '$lib/types';

const validate = (input: string): [isValid: Boolean, solution: Solution] => {
  const parsed = parseSolution(input);
  if (!parsed) {
    return [false, parsed];
  }
  const { difficulty, algorithm } = parsed;

  const algo =
    (Algorithm[algorithm] && algorithm) ||
    Object.keys(Algorithm).find((k) => Algorithm[k] === algorithm);

  if (!algo) {
    return [false, parsed];
  }
  const buffer = createHash(algo).update(input).digest();
  const binary: string = Array.prototype.map
    .call(buffer, (b: number) => b.toString(2).padStart(8, '0'))
    .join('');

  return [binary.startsWith(''.padStart(difficulty, '0')), parsed];
};

export default validate;
