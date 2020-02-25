import fs from "fs";
import path from "path";

if (process.env.NODE_ENV === "development") {
  console.log("Loading environmentvariables from .env file");
  require("dotenv/config");
  console.log(process.env);
}

const envVar = (name: string, required = true) => {
  if (!process.env[name] && required) {
    console.error(`Missing required environment variable '${name}'`);
    process.exit(1);
  }
  return process.env[name];
};

const getVaultCredential = (path: string) => {
  let credentail;
  if (process.env.NODE_ENV === "development") {
    return envVar(path.replace(/([-/])/g, ""), false); // Only for dev. get variable from .env without "/" og "-" in the env-var-name
  } else {
    try {
      credentail = fs.readFileSync(path, "utf8");
      return credentail;
    } catch (error) {
      console.error(`Could not get vault credentials for path: '${path}'`);
      process.exit(1);
    }
  }
};

const server = {
  host: envVar("HOST", false) || "localhost",
  port: envVar("PORT", false) || 3000,
  proxy: envVar("HTTP_PROXY", false), // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
  sessionKey:
    getVaultCredential("/secrets/default/syfosmmanuell/session_key") ||
    "test-key", // should be set to a random key of significant length for signing session ID cookies
  cookieName: "syfosmmanuell"
};

const azureAd = {
  discoveryUrl: envVar("AAD_DISCOVERY_URL") || "",
  clientId:
    getVaultCredential("/secrets/azuread/syfosmmanuell/client_id") || "",
  clientSecret:
    getVaultCredential("/secrets/azuread/syfosmmanuell/client_secret") || "",
  redirectUri: envVar("AAD_REDIRECT_URL") || "",
  logoutRedirectUri: envVar("AAD_LOGOUT_REDIRECT_URL", false) || "",
  tokenEndpointAuthMethod: "client_secret_post",
  responseTypes: ["code"],
  responseMode: "query"
};

//console.log(azureAd);

const redis = {
  host:
    envVar("REDIS_HOST", false) || "syfosmmanuell-redis.default.svc.nais.local",
  port: 6379,
  password: envVar("REDIS_PASSWORD", false)
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
    console.error("Could not load config (was empty)");
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
  const configPath = envVar("DOWNSTREAM_APIS_CONFIG_PATH", false);
  let config: ReverseProxyConfig | null = null;
  if (configPath) {
    try {
      console.log(
        `Loading reverse proxy config from '${configPath}' (defined by DOWNSTREAM_APIS_CONFIG_PATH)`
      );
      config = JSON.parse(fs.readFileSync(path.resolve(configPath), "utf-8"));
    } catch (err) {
      console.log(`Could not read config: '${err}'`);
    }
  }
  if (!config) {
    const jsonConfig = envVar("DOWNSTREAM_APIS_CONFIG", false);
    if (jsonConfig) {
      console.log(`Loading reverse proxy config from DOWNSTREAM_APIS_CONFIG`);
      config = JSON.parse(jsonConfig);
    } else {
      console.log(
        `Loading reverse proxy config from DOWNSTREAM_API_* [CLIENT_ID, PATH, URL]`
      );
      const scopes = envVar("DOWNSTREAM_API_SCOPES", false);
      config = {
        apis: [
          {
            clientId:
              getVaultCredential(
                "/secrets/azuread/syfosmmanuell-backend/client_id"
              ) || "",
            path: envVar("DOWNSTREAM_API_PATH", false) || "backend",
            url: envVar("DOWNSTREAM_API_URL"),
            scopes: scopes ? scopes.split(",") : []
          }
        ]
      };
    }
  }
  console.log(config);
  return config;
};

export default { server, azureAd, reverseProxy: reverseProxyConfig(), redis };
