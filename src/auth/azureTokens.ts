import { errors, TokenSet } from 'openid-client';
import { logger } from '@navikt/next-logger';

import { getAzureAuthClient } from './azureClient';
import tokenCache from './tokenCache';

import OPError = errors.OPError;
import RPError = errors.RPError;

export const getAzureAdAccessToken = async (subjectToken: string, scope: string): Promise<string> => {
    const cacheKey = `${subjectToken}-${scope}`;
    const tokenInCache: string | undefined = tokenCache.get(cacheKey);
    if (tokenInCache) {
        logger.info('Found user token in cache');
        return tokenInCache;
    }

    try {
        const [tokenSet, accessToken] = await getTokenSet(subjectToken, scope);
        tokenCache.set(cacheKey, tokenSet.access_token, (tokenSet.expires_in ?? 65) - 5);
        logger.info('Token fetched from Azure AD');
        return accessToken;
    } catch (err: unknown) {
        if (err instanceof OPError || err instanceof RPError) {
            logger.error(
                `Noe gikk galt med token exchange mot TokenX. 
                 Feilmelding fra openid-client: (${err}). 
                 HTTP Status fra TokenX: (${err.response?.statusCode} ${err.response?.statusMessage})
                 Body fra TokenX: ${JSON.stringify(err.response?.body)}`,
            );
            throw err;
        }

        logger.error('Unknown error from openid-client');
        throw err;
    }
};

async function getTokenSet(subjectToken: string, scope: string): Promise<[tokenSet: TokenSet, accessToken: string]> {
    const oidcClient = await getAzureAuthClient();
    const tokenSet: TokenSet = await oidcClient.grant({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        requested_token_use: 'on_behalf_of',
        scope,
        assertion: subjectToken,
    });

    if (tokenSet.access_token == null) {
        throw new Error(`Tokenset is undefined for scope ${scope}`);
    }

    return [tokenSet, tokenSet.access_token];
}
