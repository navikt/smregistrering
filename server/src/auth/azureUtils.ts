import { TokenSet, Client, GrantBody } from 'openid-client';
import { Request } from 'express';
import { ApiReverseProxy } from '../types/Config';
import logger from '../logging';
import { TokenSets } from '../../@types/express';

export const getOnBehalfOfAccessToken = (
  authClient: Client,
  req: Request,
  api: ApiReverseProxy,
  forApi: keyof TokenSets,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // check if request has has valid api access token
    if (hasValidAccessToken(req, forApi)) {
      return resolve(req.user?.tokenSets[forApi]?.access_token);
    } else {
      logger.error('The request does not contain a valid access token for token exchange');
    }

    // request new access token
    if (hasValidAccessToken(req, 'self')) {
      const grantBody: GrantBody = {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        requested_token_use: 'on_behalf_of',
        scope: createOnBehalfOfScope(api),
        assertion: req.user?.tokenSets.self.access_token,
      };
      authClient
        .grant(grantBody)
        .then((tokenSet) => {
          logger.info(`Received on-behalf-of token for ${forApi}`);
          if (req.user) {
            req.user.tokenSets[forApi] = tokenSet;
            return resolve(tokenSet.access_token);
          } else {
            throw new Error('Could not attach tokenSet to user object');
          }
        })
        .catch((error) => {
          logger.error(error);
          reject(error);
        });
    } else {
      const error = new Error('The request does not contain a valid access token');
      logger.error(error);
      reject(error);
    }
  });
};

export const appendDefaultScope = (scope: string): string => `${scope}/.default`;

const formatClientIdScopeForV2Clients = (clientId: string): string => appendDefaultScope(`api://${clientId}`);

const createOnBehalfOfScope = (api: ApiReverseProxy): string => {
  if (api.scopes) {
    return `${api.scopes.join(' ')}`;
  }
  return `${formatClientIdScopeForV2Clients(api.clientId)}`;
};

export const hasValidAccessToken = (req: Request, key: keyof TokenSets) => {
  const tokenSets = req.user?.tokenSets;
  if (!tokenSets) {
    return false;
  }
  if (!tokenSets[key] || !tokenSets.self) {
    return false;
  }
  const tokenSet = tokenSets[key];
  return new TokenSet(tokenSet).expired() === false;
};
