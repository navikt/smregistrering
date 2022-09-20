import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedApi } from '../../../auth/withAuth';
import { proxyRequest } from '../../../proxy/proxy-backend';
import { getServerEnv, isLocalOrDemo } from '../../../utils/env';

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

const handler = withAuthenticatedApi(async (req: NextApiRequest, res: NextApiResponse) => {
    if (isLocalOrDemo) {
        logger.info('Skipping setting up proxy for local or demo');
        return;
    }

    await proxyRequest({
        req: req,
        res: res,
        allowedAPIs: allowedAPIs,
        backend: 'backend',
        backendHostname: getServerEnv('SMREGISTRERING_BACKEND_HOST'),
        backendClientId: getServerEnv('SMREGISTRERING_BACKEND_SCOPE'),
    });
});

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

export default handler;
