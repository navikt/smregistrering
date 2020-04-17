import fs from 'fs';
import path from 'path';

if (process.env.NODE_ENV === 'development') {
  console.log('Loading environmentvariables from .env file');
  require('dotenv/config');
}

const server = {
  host: process.env['HOST'],
  port: process.env['PORT'] || 3000,
  proxy: process.env['HTTP_PROXY'], // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
  sessionKey: process.env['SESSION_KEY'],
  cookieName: 'smregistrering',
};

const azureAd = {
  discoveryUrl: process.env['AAD_DISCOVERY_URL'],
  clientId: process.env['CLIENT_ID'],
  clientSecret: process.env['CLIENT_SECRET'],
  redirectUri: process.env['AAD_REDIRECT_URL'],
  logoutRedirectUri: process.env['AAD_LOGOUT_REDIRECT_URL'],
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'query',
};

const redis = {
  host: process.env['REDIS_HOST'] || 'smregistrering-redis.default.svc.nais.local',
  port: 6379,
  password: process.env['REDIS_PASSWORD'],
};

const reverseProxy = {
  configPath: process.env['DOWNSTREAM_APIS_CONFIG_PATH'],
  jsonConfig: process.env['DOWNSTREAM_APIS_CONFIG'],
  clientId: process.env['DOWNSTREAM_API_CLIENT_ID'],
  path: process.env['DOWNSTREAM_API_PATH'],
  url: process.env['DOWNSTREAM_API_URL'],
  scopes: process.env['DOWNSTREAM_API_SCOPES'],
};

const ensureMandatoryEnvVars = () => {
  if (!server.sessionKey || !azureAd.clientId || !azureAd.clientSecret || !azureAd.redirectUri) {
    console.error('Missing mandatory environment variable');
    process.exit(1);
  }
};

ensureMandatoryEnvVars();

export interface Api {
  clientId: string;
  path: string;
  url: string;
  scopes: string[];
}

interface ReverseProxyConfig {
  apis: Api[];
}

const reverseProxyConfig = () => {
  let config: ReverseProxyConfig | undefined = undefined;
  if (reverseProxy.configPath) {
    try {
      console.log(`Loading reverse proxy config from '${reverseProxy.configPath}'`);
      config = JSON.parse(fs.readFileSync(path.resolve(reverseProxy.configPath), 'utf-8'));
    } catch (error) {
      console.log(`Could not read config: '${error}'`);
    }
  }

  if (!config) {
    if (reverseProxy.jsonConfig) {
      console.log(`Loading reverse proxy config from DOWNSTREAM_APIS_CONFIG`);
      config = JSON.parse(reverseProxy.jsonConfig);
    } else {
      console.log(`Loading reverse proxy config from DOWNSTREAM_API_* [CLIENT_ID, PATH, URL]`);
      config = {
        apis: [
          {
            clientId: reverseProxy.clientId,
            path: reverseProxy.path,
            url: reverseProxy.url,
            scopes: reverseProxy.scopes ? reverseProxy.scopes.split(',') : [],
          },
        ],
      };
    }
  }

  // Ensure that the config has all neccessary properties:
  if (config) {
    config.apis.forEach((entry, index) => {
      if (!entry.path) {
        console.error(`API entry ${index} is missing 'prefix'`);
        process.exit(1);
      }
      if (!entry.url) {
        console.error(`API entry ${index} is missing 'host'`);
        process.exit(1);
      }
      if (!entry.clientId) {
        console.error(`API entry ${index} is missing 'clientId'`);
        process.exit(1);
      }
    });
    return config;
  } else {
    console.error('Could not load config (was empty)');
    process.exit(1);
  }
};

export default { server, azureAd, reverseProxy: reverseProxyConfig, redis };
