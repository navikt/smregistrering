import { TokenSet, Client, GrantBody } from 'openid-client';
import { Request } from 'express';
import { ApiReverseProxy } from '../types/Config';
import logger from '../logging';
import { TokenSets } from '../../@types/express';

export async function getOnBehalfOfAccessToken(
  authClient: Client,
  req: Request,
  api: ApiReverseProxy,
  forApi: keyof TokenSets,
): Promise<string | undefined> {
  if (!req.user) {
    logger.error(`Could not find user object attached to request ${req.originalUrl}`);
    return undefined;
  } else {
    const oboTokenSet = new TokenSet(req.user.tokenSets[forApi]);
    const hasValidOboAccessToken = oboTokenSet?.expired() === false;

    if (hasValidOboAccessToken) {
      logger.info(`The request to ${req.originalUrl} has a valid on-behalf-of token`);
      return oboTokenSet?.access_token;
    } else {
      logger.info(`The request to ${req.originalUrl} does not have a valid on-behalf-of token`);
      const selfTokenSet = new TokenSet(req.user.tokenSets.self);
      const hasValidSelfToken = !selfTokenSet.expired();

      if (hasValidSelfToken) {
        const grantBody: GrantBody = {
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          requested_token_use: 'on_behalf_of',
          scope: createOnBehalfOfScope(api),
          assertion: selfTokenSet.access_token,
        };

        logger.info(`Requesting on-behalf-of tokenSet for request to ${req.originalUrl}`);
        const oboTokenSet = await authClient.grant(grantBody);

        logger.info(`Attaching oboTokenSet to session for request to ${req.originalUrl}`);
        req.user.tokenSets[forApi] = oboTokenSet;

        return oboTokenSet.access_token;
      } else {
        logger.error(
          `The request to ${req.originalUrl} does not have a valid access_token for on-behalf-of token exchange`,
        );
      }
    }
  }
}

export function appendDefaultScope(scope: string): string {
  return `${scope}/.default`;
}

function formatClientIdScopeForV2Clients(clientId: string): string {
  return appendDefaultScope(`api://${clientId}`);
}

function createOnBehalfOfScope(api: ApiReverseProxy): string {
  if (api.scopes) {
    return `${api.scopes.join(' ')}`;
  }
  return `${formatClientIdScopeForV2Clients(api.clientId)}`;
}

export function hasValidAccessToken(req: Request, key: keyof TokenSets) {
  const tokenSets = req.user?.tokenSets;
  if (!tokenSets) {
    return false;
  }
  if (!tokenSets[key] || !tokenSets.self) {
    return false;
  }
  const tokenSet = tokenSets[key];
  return new TokenSet(tokenSet).expired() === false;
}
