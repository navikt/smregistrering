import fs from 'fs';
import path from 'path';
import { Server, AzureAd, Redis, ReverseProxy } from './types/Config';
import * as iotsPromise from 'io-ts-promise';
import logger from './logging';

if (process.env.NODE_ENV === 'development') {
  logger.info('Loading environmentvariables from .env file');
  require('dotenv/config');
}

export interface Config {
  server: Server;
  azureAd: AzureAd;
  redis: Redis;
  reverseProxy: ReverseProxy;
}

const loadConfig = async (): Promise<Config> => {
  const server = await iotsPromise.decode(Server, {
    host: process.env['HOST'],
    port: process.env['PORT'],
    proxy: process.env['HTTP_PROXY'], // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
    sessionKey: process.env['SESSION_KEY'],
    cookieName: 'smregistrering',
  });
  const azureAd = await iotsPromise.decode(AzureAd, {
    discoveryUrl: process.env['AAD_DISCOVERY_URL'],
    clientId: process.env['CLIENT_ID'],
    clientSecret: process.env['CLIENT_SECRET'],
    redirectUri: process.env['AAD_REDIRECT_URL'],
    logoutRedirectUri: process.env['AAD_LOGOUT_REDIRECT_URL'],
    tokenEndpointAuthMethod: 'client_secret_post',
    responseTypes: ['code'],
    responseMode: 'query',
  });
  const redis = await iotsPromise.decode(Redis, {
    host: process.env['REDIS_HOST'],
    port: process.env['REDIS_PORT'],
    password: process.env['REDIS_PASSWORD'],
  });
  const reverseProxy = await iotsPromise.decode(ReverseProxy, {
    clientId: process.env['DOWNSTREAM_API_CLIENT_ID'],
    path: process.env['DOWNSTREAM_API_PATH'],
    url: process.env['DOWNSTREAM_API_URL'],
    scopes: process.env['DOWNSTREAM_API_SCOPES'],
  });

  return { server, azureAd, redis, reverseProxy };
};

export default loadConfig;
