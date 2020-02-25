import passport from "passport";
import express from "express";
import { TokenSet, IdTokenClaims } from "openid-client";

interface _TokenSet {
  self: TokenSet;
  proxy: TokenSet[];
}

declare global {
  namespace Express {
    interface User {
      tokenSets?: _TokenSet;
      claims: IdTokenClaims;
    }
  }
}
