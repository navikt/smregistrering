import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import ICD10 from './icd10.json';
import ICPC2 from './icpc2.json';
import manuellOppgave from './manuellOppgave.json';

const mock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()), // default: (req, resp) => resp
});

mock.get('backend.com/diagnosekoder', { ICD10, ICPC2 });
mock.get('backend.com/manuellOppgave', manuellOppgave);
mock.get('https://syfosmmanuell.nais.preprod.local/user', 'Testbruker');
