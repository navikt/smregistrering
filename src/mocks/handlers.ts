import { rest } from 'msw'

import { apiUrl } from '../utils/fetchUtils'

import oppgave from './mock/oppgave.json'
import sykmelder from './mock/sykmelder.json'
import pasientNavn from './mock/pasientNavn.json'

export const handlers = [
    rest.get(apiUrl('/v1/oppgave/:oppgaveid'), (req, res, ctx) => res(ctx.json(oppgave))),
    rest.get(apiUrl('/v1/sykmelding/:sykmeldingid/ferdigstilt'), (req, res, ctx) => res(ctx.json(oppgave))),
    rest.post(apiUrl('/v1/oppgave/:oppgaveid/send'), (req, res, ctx) => res(ctx.status(204))),
    rest.post(apiUrl('/v1/oppgave/:oppgaveid/avvis'), (req, res, ctx) => res(ctx.status(204))),
    rest.post(apiUrl('/v1/oppgave/:oppgaveid/tilgosys'), (req, res, ctx) => res(ctx.status(204))),

    rest.get(apiUrl('/v1/sykmelder/:hpr'), (req, res, ctx) => res(ctx.json(sykmelder))),
    rest.get(apiUrl('/v1/pasient'), (req, res, ctx) => res(ctx.json(pasientNavn))),
]
