import fs from 'fs';
import path from 'path';

if (process.env.NODE_ENV === 'development') {
  console.log('Loading environmentvariables from .env file');
  require('dotenv/config');
}

const envVar = (name: string, required = true) => {
  if (!process.env[name] && required) {
    console.error(`Missing required environment variable '${name}'`);
    process.exit(1);
  }
  return process.env[name];
};

const server = {
  host: envVar('HOST') || 'localhost',
  port: envVar('PORT', false) || 3000,
  proxy: envVar('HTTP_PROXY', false), // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
  sessionKey: envVar('SESSION_KEY') || '',
  cookieName: 'smregistrering',
};

const azureAd = {
  discoveryUrl: envVar('AAD_DISCOVERY_URL') || '',
  clientId: envVar('CLIENT_ID') || '',
  clientSecret: envVar('CLIENT_SECRET') || '',
  redirectUri: envVar('AAD_REDIRECT_URL') || '',
  logoutRedirectUri: envVar('AAD_LOGOUT_REDIRECT_URL', false),
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'query',
};

const redis = {
  host: envVar('REDIS_HOST', false) || 'smregistrering-redis.default.svc.nais.local',
  port: 6379,
  password: envVar('REDIS_PASSWORD', false),
};

const reverseProxyConfig = () => {
  const config = loadReverseProxyConfig();
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

export interface Api {
  clientId: string | undefined;
  path: string | undefined;
  url: string | undefined;
  scopes: string[];
}

interface ReverseProxyConfig {
  apis: Api[];
}

const loadReverseProxyConfig = () => {
  const configPath = envVar('DOWNSTREAM_APIS_CONFIG_PATH', false);
  let config: ReverseProxyConfig | null = null;
  if (configPath) {
    try {
      console.log(`Loading reverse proxy config from '${configPath}' (defined by DOWNSTREAM_APIS_CONFIG_PATH)`);
      config = JSON.parse(fs.readFileSync(path.resolve(configPath), 'utf-8'));
    } catch (err) {
      console.log(`Could not read config: '${err}'`);
    }
  }
  if (!config) {
    const jsonConfig = envVar('DOWNSTREAM_APIS_CONFIG', false);
    if (jsonConfig) {
      console.log(`Loading reverse proxy config from DOWNSTREAM_APIS_CONFIG`);
      config = JSON.parse(jsonConfig);
    } else {
      console.log(`Loading reverse proxy config from DOWNSTREAM_API_* [CLIENT_ID, PATH, URL]`);
      const scopes = envVar('DOWNSTREAM_API_SCOPES', false);
      config = {
        apis: [
          {
            clientId: envVar('DOWNSTREAM_API_CLIENT_ID', false) || '1234',
            path: envVar('DOWNSTREAM_API_PATH', false) || 'backend',
            url: envVar('DOWNSTREAM_API_URL', false) || '.',
            scopes: scopes ? scopes.split(',') : [],
          },
        ],
      };
    }
  }
  console.log(config);
  return config;
};

export default { server, azureAd, reverseProxy: reverseProxyConfig, redis };
