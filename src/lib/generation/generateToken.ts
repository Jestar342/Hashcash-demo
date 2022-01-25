import crypto from 'crypto';

const generateToken = (length: number) =>
  Array.prototype.map
    .call(crypto.randomBytes(Math.floor(length / 2)), (i: number) =>
      i.toString(36).padStart(2, '_')
    )
    .join('')
    .padEnd(length, '=');

export default generateToken;
