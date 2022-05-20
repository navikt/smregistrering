import {
    Server,
    AzureAd,
    Redis,
    ApiReverseProxy,
    ServerSchema,
    AzureAdSchema,
    RedisSchema,
    ApiReverseProxySchema,
} from './types/Config';

export interface Config {
    server: Server;
    azureAd: AzureAd;
    redis: Redis;
    downstreamApiReverseProxy: ApiReverseProxy;
    modiacontextReverseProxy: ApiReverseProxy;
}

const loadConfig = (): Config => {
    const server = ServerSchema.parse({
        host: process.env['HOST'],
        port: process.env['PORT'],
        proxy: process.env['HTTP_PROXY'], // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
        sessionKey: process.env['SESSION_KEY'],
        cookieName: 'smregistrering',
    });
    const azureAd = AzureAdSchema.parse({
        discoveryUrl: process.env['AZURE_APP_WELL_KNOWN_URL'],
        clientId: process.env['AZURE_APP_CLIENT_ID'],
        clientSecret: process.env['AZURE_APP_CLIENT_SECRET'],
        redirectUri: process.env['AAD_REDIRECT_URL'],
        logoutRedirectUri: process.env['AAD_LOGOUT_REDIRECT_URL'],
        tokenEndpointAuthMethod: 'client_secret_post',
        responseTypes: ['code'],
        responseMode: 'query',
    });
    const redis = RedisSchema.parse({
        host: process.env['REDIS_HOST'],
        port: process.env['REDIS_PORT'],
        password: process.env['REDIS_PASSWORD'],
    });
    const downstreamApiReverseProxy = ApiReverseProxySchema.parse({
        path: process.env['DOWNSTREAM_API_PATH'],
        url: process.env['DOWNSTREAM_API_URL'],
        scopes: process.env['DOWNSTREAM_API_SCOPES'],
    });
    const modiacontextReverseProxy = ApiReverseProxySchema.parse({
        scopes: process.env['GRAPH_API_SCOPES'],
        path: process.env['MODIACONTEXTHOLDER_PATH'],
        url: process.env['MODIACONTEXTHOLDER_URL'],
    });

    return { server, azureAd, redis, downstreamApiReverseProxy, modiacontextReverseProxy };
};

export default loadConfig;
