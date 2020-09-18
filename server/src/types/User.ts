import * as iots from 'io-ts';

const TokenSets = iots.partial({
  self: iots.any,
  proxy: iots.any,
  graph: iots.any,
});

export const User = iots.type({
  claims: iots.any,
  tokenSets: TokenSets,
});
export type User = iots.TypeOf<typeof User>;
