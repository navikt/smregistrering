import {
  custom,
  Issuer,
  Strategy,
  TokenSet,
  ClientMetadata,
  Client,
} from "openid-client";
import authUtils from "./utils";
import config from "../config";
import httpProxy from "../proxy/http-proxy";

const metadata: ClientMetadata = {
  client_id: config.azureAd.clientId,
  client_secret: config.azureAd.clientSecret,
  redirect_uris: [config.azureAd.redirectUri],
  token_endpoint_auth_method: "client_secret_post"
};

const client = async () => {
  // see https://github.com/panva/node-openid-client/blob/master/docs/README.md#customizing-individual-http-requests
  if (httpProxy.agent) {
    custom.setHttpOptionsDefaults({
      agent: httpProxy.agent
    });
  }
  const issuer = await Issuer.discover(config.azureAd.discoveryUrl);
  console.log(`Discovered issuer ${issuer.issuer}`);
  return new issuer.Client(metadata);
};

const strategy = (client: Client) => {
  const verify = (
    tokenSet: TokenSet,
    done: (err: Error | null, user: any | boolean) => any
  ) => {
    if (tokenSet.expired()) {
      return done(null, false);
    }
    const user = {
      tokenSets: {
        [authUtils.tokenSetSelfId]: tokenSet
      },
      claims: tokenSet.claims()
    };
    return done(null, user);
  };
  const options = {
    client: client,
    params: {
      response_types: config.azureAd.responseTypes,
      response_mode: config.azureAd.responseMode,
      scope: `openid ${authUtils.appendDefaultScope(config.azureAd.clientId)}`
    },
    passReqToCallback: false,
    usePKCE: "S256"
  };
  return new Strategy(options, verify);
};

export default { client, strategy };
