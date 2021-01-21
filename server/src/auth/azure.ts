import { custom, Issuer, Strategy, TokenSet, ClientMetadata, Client } from 'openid-client';
import { appendDefaultScope } from './azureUtils';
import { Config } from '../config';
import httpProxyAgent from '../proxy/http-proxy';
import { User } from '../types/User';
import logger from '../logging';

async function client(config: Config) {
  // see https://github.com/panva/node-openid-client/blob/master/docs/README.md#customizing-individual-http-requests
  const metadata: ClientMetadata = {
    client_id: config.azureAd.clientId,
    client_secret: config.azureAd.clientSecret,
    redirect_uris: [config.azureAd.redirectUri],
    token_endpoint_auth_method: 'client_secret_post',
  };
  const agent = httpProxyAgent(config);
  if (agent) {
    custom.setHttpOptionsDefaults({
      agent: agent,
    });
  }
  const issuer = await Issuer.discover(config.azureAd.discoveryUrl);
  logger.info(`Discovered issuer ${issuer.issuer}`);
  return new issuer.Client(metadata);
}

function strategy(client: Client, config: Config) {
  const verify = (tokenSet: TokenSet, done: (err: Error | null, user: any | boolean) => any) => {
    if (tokenSet.expired()) {
      return done(null, false);
    }
    const user: User = {
      claims: tokenSet.claims(),
      tokenSets: {
        self: tokenSet,
      },
    };
    return done(null, user);
  };
  const options = {
    client: client,
    params: {
      response_types: config.azureAd.responseTypes,
      response_mode: config.azureAd.responseMode,
      scope: `openid ${appendDefaultScope(config.azureAd.clientId)}`,
    },
    passReqToCallback: false,
    usePKCE: 'S256',
  };
  return new Strategy(options, verify);
}

export default { client, strategy };
