import passport from 'passport';
import express from 'express';
import { TokenSet, IdTokenClaims } from 'openid-client';

interface TokenSets {
  self: TokenSet;
  proxy?: TokenSet;
  graph?: TokenSet;
}

declare global {
  namespace Express {
    interface User {
      tokenSets: TokenSets;
      claims: IdTokenClaims;
      redirectTo?: string;
    }
  }
}
