import generateToken from './generateToken';

describe('When generating a token', () => {
  it('should match the length requested', () => {
    [2, 5, 8, 9, 25].forEach((x) => {
      const token = generateToken(x);
      expect(token).toHaveLength(x);
    });
  });

  it('should be unique', () => {
    const tokens: string[] = [...Array(5)].map(() => generateToken(10));
    const unique: string[] = [...new Set(tokens)];

    expect(unique).toIncludeAllMembers(tokens);
    expect(unique).toHaveLength(tokens.length);
  });
});
