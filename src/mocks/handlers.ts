import { http, HttpResponse } from 'msw'

import { apiUrl } from '../utils/fetchUtils'

import oppgave from './mock/oppgave.json'
import sykmelder from './mock/sykmelder.json'
import pasientNavn from './mock/pasientNavn.json'

export const handlers = [
    http.get(apiUrl('/v1/oppgave/:oppgaveid'), () => HttpResponse.json(oppgave)),
    http.get(apiUrl('/v1/sykmelding/:sykmeldingid/ferdigstilt'), () => HttpResponse.json(oppgave)),
    http.post(
        apiUrl('/v1/oppgave/:oppgaveid/send'),
        () =>
            new HttpResponse(null, {
                status: 204,
            }),
    ),
    http.post(
        apiUrl('/v1/oppgave/:oppgaveid/avvis'),
        () =>
            new HttpResponse(null, {
                status: 204,
            }),
    ),
    http.post(
        apiUrl('/v1/oppgave/:oppgaveid/tilgosys'),
        () =>
            new HttpResponse(null, {
                status: 204,
            }),
    ),

    http.get(apiUrl('/v1/sykmelder/:hpr'), () => HttpResponse.json(sykmelder)),
    http.get(apiUrl('/v1/pasient'), () => HttpResponse.json(pasientNavn)),
]
