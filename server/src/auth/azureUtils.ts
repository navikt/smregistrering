import { TokenSet, Client, GrantBody } from 'openid-client';
import { Request } from 'express';
import { ApiReverseProxy } from '../types/Config';
import logger from '../logging';
import { TokenSets } from '../../@types/express';

class UserNotFoundError extends Error {}

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
      logger.info(`The request to ${req.originalUrl} does not have a valid on-behalf-of token`);
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
      logger.info(`Requesting on-behalf-of token for request to ${req.originalUrl}`);
      authClient
        .grant(grantBody)
        .then((tokenSet) => {
          logger.info(
            `Received on-behalf-of token for request ${req.originalUrl}. Token expires at ${tokenSet.expires_at}`,
          );
          if (req.user) {
            req.user.tokenSets[forApi] = tokenSet;
            return resolve(tokenSet.access_token);
          } else {
            throw new UserNotFoundError('Could not attach tokenSet to user object');
          }
        })
        .catch((error) => {
          if (error instanceof UserNotFoundError) {
            logger.error(error.message);
            reject(error);
          } else {
            const sanitizedError = new Error('An error occured while retrieving on-behalf-of-token');
            logger.error(sanitizedError.message);
            reject(sanitizedError);
          }
        });
    } else {
      const error = new Error('The request does not contain a valid access token');
      logger.error(error.message);
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
