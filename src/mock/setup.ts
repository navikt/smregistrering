import { useLayoutEffect } from 'react'
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'
import { logger } from '@navikt/next-logger'

import oppgave from './oppgave.json'
import pasientNavn from './pasientNavn.json'
import sykmelder from './sykmelder.json'

const SetupMock = () => {
    useLayoutEffect(() => {
        logger.info('Setting up mock for demo')
        const mock = FetchMock.configure({
            enableFallback: true, // default: true
            middleware: MiddlewareUtils.combine(
                MiddlewareUtils.delayMiddleware(1000),
                MiddlewareUtils.loggingMiddleware(),
            ), // default: (req, resp) => resp
        })

        mock.get('/api/backend/api/v1/oppgave/:oppgaveid', (req, res, ctx) => res(ctx.json(oppgave)))
        mock.get('/api/backend/api/v1/sykmelding/:sykmeldingid/ferdigstilt', (req, res, ctx) => res(ctx.json(oppgave)))
        mock.post('/api/backend/api/v1/oppgave/:oppgaveid/send', (req, res, ctx) => res(ctx.status(204)))
        mock.post('/api/backend/api/v1/oppgave/:oppgaveid/avvis', (req, res, ctx) => res(ctx.status(204)))
        mock.post('/api/backend/api/v1/oppgave/:oppgaveid/tilgosys', (req, res, ctx) => res(ctx.status(204)))

        mock.get('/api/backend/api/v1/sykmelder/:hpr', (req, res, ctx) => res(ctx.json(sykmelder)))
        mock.get('/api/backend/api/v1/pasient', (req, res, ctx) => res(ctx.json(pasientNavn)))
    }, [])

    return null
}

export default SetupMock
