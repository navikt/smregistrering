import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import oppgave from './oppgave.json';
import { RuleHitErrors } from '../types/RuleHitErrors';

const mock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()), // default: (req, resp) => resp
});

const resBody: RuleHitErrors = {
    status: 'statusss',
    ruleHits: [
        {
            ruleName: 'rulenameee',
            ruleStatus: 'statsdawwd',
            messageForSender: 'message for sender',
            messageForUser: 'message for user',
        },
    ],
};

mock.get('backend/api/v1/hentPapirSykmeldingManuellOppgave/', oppgave);
mock.put('backend/api/v1/sendPapirSykmeldingManuellOppgave/', () => {
    return Promise.resolve({ body: resBody, status: 400 });
});
mock.get('/user', 'Testbruker');
