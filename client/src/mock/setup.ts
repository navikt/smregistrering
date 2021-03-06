import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import aktivenhet from './aktivenhet.json';
import decorator from './decorator.json';
import oppgave from './oppgave.json';
import pasientNavn from './pasientNavn.json';
import sykmelder from './sykmelder.json';

// Uncomment to use "invalid form" endpoint below
// import { RuleHitErrors } from '../types/RuleHitErrors';

const mock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()), // default: (req, resp) => resp
});

// Uncomment to use "invalid form" endpoint below
/* const resBody: RuleHitErrors = {
    status: 'statusss',
    ruleHits: [
        {
            ruleName: 'rulenameee',
            ruleStatus: 'statsdawwd',
            messageForSender: 'message for sender',
            messageForUser: 'message for user',
        },
    ],
}; */

mock.get('/modiacontextholder/api/decorator', decorator);
mock.get('/modiacontextholder/api/context/aktivenhet', aktivenhet);
mock.delete('/modiacontextholder/api/context/aktivbruker', () => Promise.resolve({ status: 200 }));

mock.get('backend/api/v1/oppgave/:oppgaveid', oppgave);
mock.post('backend/api/v1/oppgave/:oppgaveid/send', () => Promise.resolve({ status: 204 })); // For status ok
// mock.put('backend/api/v1/sendPapirSykmeldingManuellOppgave/', () => Promise.resolve({ body: resBody, status: 400 })); // For invalid form response. Errors returned in body. TODO: Something wrong with the mock, works in dev.
mock.post('backend/api/v1/oppgave/:oppgaveid/avvis', () => Promise.resolve({ status: 204 })); // For status ok
mock.post('backend/api/v1/oppgave/:oppgaveid/tilgosys', () => Promise.resolve({ status: 204 })); // For status ok

mock.get('/backend/api/v1/sykmelder/:hpr', sykmelder);
mock.get('/backend/api/v1/pasient', pasientNavn);
