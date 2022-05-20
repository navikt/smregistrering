import { Client, GrantBody, TokenSet } from 'openid-client';
import { Request } from 'express';

import logger from '../../utils/logger';
import { ApiReverseProxy } from '../types/Config';
import { TokenSets } from '../@types/express';

export const hasValidAccessToken = (req: Request, key: keyof TokenSets) => {
    const tokenSets = req.user?.tokenSets;
    if (!tokenSets) {
        return false;
    }
    if (!tokenSets[key] || !tokenSets.self) {
        return false;
    }
    const tokenSet = tokenSets[key];

    logger.info(`tokenset is expired? ${new TokenSet(tokenSet).expired()}. request ${req.originalUrl}`);
    return new TokenSet(tokenSet).expired() === false;
};

class UserNotFoundError extends Error {}

export const getOnBehalfOfAccessToken = async (
    authClient: Client,
    req: Request,
    api: ApiReverseProxy,
    forApi: keyof TokenSets,
): Promise<string | undefined> => {
    try {
        if (hasValidAccessToken(req, forApi)) {
            return req.user?.tokenSets[forApi]?.access_token;
        } else {
            logger.info(`The request to ${req.originalUrl} does not have a valid on-behalf-of token`);
        }

        if (hasValidAccessToken(req, 'self')) {
            const grantBody: GrantBody = {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                requested_token_use: 'on_behalf_of',
                scope: createOnBehalfOfScope(api),
                assertion: req.user?.tokenSets.self.access_token,
            };

            logger.info(`Requesting on-behalf-of token for request to ${req.originalUrl}`);
            const oboTokenSet = await authClient.grant(grantBody);

            logger.info(`Access token length: ${oboTokenSet.access_token?.length}`);

            if (req.user) {
                req.user.tokenSets[forApi] = oboTokenSet;
                return oboTokenSet.access_token;
            } else {
                throw new UserNotFoundError('Could not attach tokenSet to user object');
            }
        }
    } catch (e) {
        logger.error(e);
    }
};

const createOnBehalfOfScope = (api: ApiReverseProxy): string => `${api.scopes.join(' ')}`;
