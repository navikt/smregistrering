import passport from 'passport';
import express from 'express';
import { TokenSet, IdTokenClaims } from 'openid-client';

interface _TokenSet {
  self: TokenSet;
  proxy: TokenSet;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      HOST: string;
      PORT?: string;
      HTTP_PROXY?: string;
      SESSION_KEY: string;
      AAD_DISCOVERY_URL: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      AAD_REDIRECT_URL: string;
      AAD_LOGOUT_REDIRECT_URL?: string;
      REDIS_HOST?: string;
      REDIS_PASSWORD?: string;
      DOWNSTREAM_APIS_CONFIG_PATH?: string;
      DOWNSTREAM_APIS_CONFIG?: string;
      DOWNSTREAM_API_CLIENT_ID: string;
      DOWNSTREAM_API_PATH?: string;
      DOWNSTREAM_API_URL?: string;
      DOWNSTREAM_API_SCOPES?: string;
    }
  }
  namespace Express {
    interface User {
      tokenSets?: _TokenSet;
      claims: IdTokenClaims;
    }
  }
}
