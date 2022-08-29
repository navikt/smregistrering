import { useLayoutEffect } from 'react';
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import logger from '../utils/logger';

import oppgave from './oppgave.json';
import pasientNavn from './pasientNavn.json';
import sykmelder from './sykmelder.json';

const SetupMock = () => {
    useLayoutEffect(() => {
        logger.info('Setting up mock for demo');
        const mock = FetchMock.configure({
            enableFallback: true, // default: true
            middleware: MiddlewareUtils.combine(
                MiddlewareUtils.delayMiddleware(1000),
                MiddlewareUtils.loggingMiddleware(),
            ), // default: (req, resp) => resp
        });

        mock.get('/api/backend/api/v1/oppgave/:oppgaveid', oppgave);
        mock.get('/api/backend/api/v1/sykmelding/:sykmeldingid/ferdigstilt', oppgave);
        mock.post('/api/backend/api/v1/oppgave/:oppgaveid/send', () => Promise.resolve({ status: 204 })); // For status ok
        mock.post('/api/backend/api/v1/oppgave/:oppgaveid/avvis', () => Promise.resolve({ status: 204 })); // For status ok
        mock.post('/api/backend/api/v1/oppgave/:oppgaveid/tilgosys', () => Promise.resolve({ status: 204 })); // For status ok

        mock.get('/api/backend/api/v1/sykmelder/:hpr', sykmelder);
        mock.get('/api/backend/api/v1/pasient', pasientNavn);
    }, []);

    return null;
};

export default SetupMock;
