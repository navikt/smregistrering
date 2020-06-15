import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import oppgave from './oppgave.json';

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

mock.get('backend/api/v1/hentPapirSykmeldingManuellOppgave/', oppgave);
mock.put('backend/api/v1/sendPapirSykmeldingManuellOppgave/', () => Promise.resolve({ status: 204 })); // For status ok
// mock.put('backend/api/v1/sendPapirSykmeldingManuellOppgave/', () => Promise.resolve({ body: resBody, status: 400 })); // For invalid form response. Errors returned in body. TODO: Something wrong with the mock, works in dev.
mock.get('/user', 'Testbruker');
