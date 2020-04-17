import { TokenSet, Client } from 'openid-client';
import { Request } from 'express';
import { Api } from '../config';

const tokenSetSelfId = 'self';

const getOnBehalfOfAccessToken = (authClient: Client, req: Request, api: Api) => {
  return new Promise((resolve, reject) => {
    console.log('hasValidAccessTOken: ' + hasValidAccessToken(req, api.clientId));
    if (hasValidAccessToken(req, api.clientId)) {
      const tokenSets = getTokenSetsFromSession(req);
      if (api.clientId && tokenSets?.proxy && tokenSets?.proxy?.access_token) {
        resolve(tokenSets?.proxy?.access_token);
      } else {
        console.error('Could not resolve token from tokenSets');
      }
    }
    if (req.user) {
      authClient
        .grant({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          requested_token_use: 'on_behalf_of',
          scope: createOnBehalfOfScope(api),
          assertion: req.user.tokenSets?.self.access_token,
        })
        .then((tokenSet) => {
          if (req.user?.tokenSets) {
            req.user.tokenSets.proxy = tokenSet;
            resolve(tokenSet.access_token);
          } else {
            throw new Error('Token set was not attached to user object');
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    } else {
      console.error('User object not attached to request');
    }
  });
};

const appendDefaultScope = (scope: string): string => `${scope}/.default`;

const formatClientIdScopeForV2Clients = (clientId: string): string => appendDefaultScope(`api://${clientId}`);

const createOnBehalfOfScope = (api: Api): string => {
  if (api.scopes && api.scopes.length > 0) {
    return `${api.scopes.join(' ')}`;
  } else {
    if (api.clientId) {
      return `${formatClientIdScopeForV2Clients(api.clientId)}`;
    } else {
      console.error('api.clientId not found');
      // TODO:  Return default scope or end process?
      process.exit(1);
    }
  }
};

const getTokenSetsFromSession = (req: Request) => {
  if (req && req.user) {
    return req.user.tokenSets;
  }
  return null;
};

const hasValidAccessToken = (req: Request, key = tokenSetSelfId) => {
  const tokenSets = getTokenSetsFromSession(req);
  if (!tokenSets) {
    return false;
  }
  if (!tokenSets.self) {
    return false;
  }
  return new TokenSet(tokenSets.self).expired() === false;
};

export default {
  getOnBehalfOfAccessToken,
  appendDefaultScope,
  hasValidAccessToken,
  tokenSetSelfId,
};
