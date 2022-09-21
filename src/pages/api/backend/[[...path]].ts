import { proxiedApiRouteConfig, proxyApiRouteRequest } from '@navikt/next-api-proxy';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedApi } from '../../../auth/withAuth';
import { getServerEnv, isLocalOrDemo } from '../../../utils/env';
import { getAzureAdAccessToken } from '../../../auth/azureTokens';

const allowedAPIs = [
    'GET /api/v1/pasient',
    'GET /api/v1/oppgave/[id|hpr]',
    'GET /api/v1/sykmelder/[id|hpr]',
    'POST /api/v1/oppgave/[id|hpr]/tilgosys',
    'POST /api/v1/oppgave/[id|hpr]/avvis',
    'POST /api/v1/oppgave/[id|hpr]/send',
    'GET /api/v1/sykmelding/[uuid]/ferdigstilt',
    'POST /api/v1/sykmelding/[uuid]',
];

const handler = withAuthenticatedApi(async (req, res, accessToken) => {
    if (isLocalOrDemo) {
        logger.info('Skipping setting up proxy for local or demo');
        return;
    }

    const rewrittenPath = req.url!.replace(`/api/backend`, '');
    const api = `${req.method} ${rewrittenPath}`;
    if (!allowedAPIs.includes(cleanPath(api))) {
        logger.warn(`404 Unknown API: ${api}, clean path: ${cleanPath(api)}`);
        res.status(404);
        res.send(null);
        return;
    }

    const bearerToken = await getAzureAdAccessToken(accessToken, getServerEnv('SMREGISTRERING_BACKEND_SCOPE'));

    logger.info(`Proxying request for path ${getServerEnv('SMREGISTRERING_BACKEND_HOST')}${rewrittenPath}`);
    await proxyApiRouteRequest({
        path: rewrittenPath,
        req,
        res,
        bearerToken,
        hostname: getServerEnv('SMREGISTRERING_BACKEND_HOST'),
        https: false,
    });
});

const UUID = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;
const OPPGAVE_OR_HPR = /[0-9]{7,9}/;

export function cleanPath(value: string): string {
    return value?.replace(UUID, '[uuid]').replace(OPPGAVE_OR_HPR, '[id|hpr]');
}

export const config = proxiedApiRouteConfig;

export default handler;
