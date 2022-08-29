import { Client, Issuer } from 'openid-client';
import { createRemoteJWKSet, jwtVerify } from 'jose';

import logger from '../utils/logger';
import { getServerEnv } from '../utils/env';

let _issuer: Issuer<Client>;
let _remoteJWKSet: ReturnType<typeof createRemoteJWKSet>;

async function issuer(): Promise<Issuer<Client>> {
    if (typeof _issuer === 'undefined') {
        _issuer = await Issuer.discover(getServerEnv('AZURE_APP_WELL_KNOWN_URL'));
    }
    return _issuer;
}

async function jwkSet(): Promise<ReturnType<typeof createRemoteJWKSet>> {
    if (typeof _remoteJWKSet === 'undefined') {
        const iss = await issuer();
        _remoteJWKSet = createRemoteJWKSet(new URL(<string>iss.metadata.jwks_uri));
    }

    return _remoteJWKSet;
}

export async function validateAzureToken(bearerToken: string): Promise<boolean> {
    const token = bearerToken.replace('Bearer ', '');
    const verified = await jwtVerify(token, await jwkSet(), {
        issuer: (await issuer()).metadata.issuer,
    });

    if (verified.payload.exp && verified.payload.exp * 1000 <= Date.now()) {
        logger.error('token is expired');
        return false;
    }

    if (verified.payload.aud !== getServerEnv('AZURE_APP_CLIENT_ID')) {
        logger.error('client_id does not match app client_id');
        return false;
    }

    return true;
}
