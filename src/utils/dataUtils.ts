import { logger } from '@navikt/next-logger'

import { DiagnosekodeSystem, Diagnosekoder } from '../types/diagnosekoder/Diagnosekoder'
import { Oppgave } from '../types/oppgave/Oppgave'

import { getIdFromSearchParams } from './urlUtils'
import { apiFetch } from './fetchUtils'

export class OppgaveAlreadySolvedError extends Error {}

export class BadRequestError extends Error {}

export class OppgaveGoneError extends Error {}

export class UnauthorizedError extends Error {}

export const getDiagnosekoder = async (): Promise<Diagnosekoder> => {
    try {
        const { ICD10, ICPC2 } = await import('@navikt/diagnosekoder')
        const diagnosekoderRaw = {
            [DiagnosekodeSystem.ICD10]: ICD10,
            [DiagnosekodeSystem.ICPC2]: ICPC2,
        }
        return Diagnosekoder.parse(diagnosekoderRaw)
    } catch (error: any) {
        logger.error(error)
        throw new Error('Feil med dianosekoder. Sjekke logger for utdypende feilbeskrivelse')
    }
}

export type OppgaveResult = { type: 'Oppgave' | 'FerdigstiltOppgave'; oppgave: Oppgave; sykmeldingId: string | null }

export const getOppgave = async (): Promise<OppgaveResult> => {
    const id = getIdFromSearchParams()
    if ('oppgaveId' in id) {
        const oppgaveId = id.oppgaveId
        const url = `/v1/oppgave/${oppgaveId}`
        const oppgave = await fetchOppgave(url)
        return { type: 'Oppgave', oppgave, sykmeldingId: null }
    } else {
        const sykmeldingId = id.sykmeldingId
        const url = `/v1/sykmelding/${sykmeldingId}/ferdigstilt`
        const oppgave = await fetchOppgave(url)
        return { type: 'FerdigstiltOppgave', oppgave, sykmeldingId }
    }
}

async function fetchOppgave(url: string): Promise<Oppgave> {
    const res = await apiFetch(url)
    if (res.ok) {
        const json = await res.json()
        return Oppgave.parse(json)
    } else if (res.status === 400) {
        logger.warn(`Oppgave ${url} (400) er ikke tilgjengelig, body: ${await res.text()}`)
        throw new BadRequestError(`Klarte ikke å hente en gyldig oppgave-id fra lenken: ${window.location.href}`)
    } else if (res.status === 401) {
        throw new UnauthorizedError(`Du har blitt logget ut, eller har ugyldig tilgang. Vennligst last siden på nytt.`)
    } else if (res.status === 403) {
        throw new UnauthorizedError(
            `Du har ikke tilgang til oppgaven. Sjekk om du har riktige tilganger for å behandle slike oppgaver`,
        )
    } else if (res.status === 404) {
        throw new OppgaveAlreadySolvedError(`Fant ingen uløste oppgaver. Oppgaven finnes ikke eller er allerede løst.`)
    } else if (res.status === 410) {
        throw new OppgaveGoneError(`Fant ingen skannede dokumenter. Oppgaven er sendt tilbake til GOSYS.`)
    } else {
        throw new Error(`Ukjent feil med statuskode: ${res.status} ${res.statusText}, body: ${await res.text()}`)
    }
}
