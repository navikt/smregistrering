import FetchMock, { Middleware } from 'yet-another-fetch-mock';

import ICD10 from './icd10.json';
import ICPC2 from './icpc2.json';

const loggingMiddleware: Middleware = (_request, response) => {
    console.log('response', response);
    return response;
};

const mock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: loggingMiddleware, // default: (req, resp) => resp
});

mock.get('backend.com/diagnosekoder', { ICD10, ICPC2 });
mock.get('https://syfosmmanuell.nais.preprod.local/user', 'Testbruker');
