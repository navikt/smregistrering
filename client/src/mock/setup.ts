import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import oppgave from './oppgave.json';

const mock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()), // default: (req, resp) => resp
});

//const newOppgave = { ...oppgave, pdfPapirSykmelding: require('./sykmelding.pdf') };

mock.get('backend/api/v1/hentPapirSykmeldingManuellOppgave/', oppgave);
mock.get('/user', 'Testbruker');
