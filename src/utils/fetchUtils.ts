import { logger } from '@navikt/next-logger'

import { RegistrertSykmelding } from '../types/sykmelding/RegistrertSykmelding'
import { RuleHitErrors } from '../types/RuleHitErrors'

import { browserEnv } from './env'

export class RuleHitError extends Error {
    ruleHits: RuleHitErrors
    constructor(ruleHits: RuleHitErrors, message?: string) {
        super(message)
        this.ruleHits = ruleHits
    }
}

export async function postRegistrertSykmelding(
    oppgaveid: number,
    enhet: string,
    sykmelding: RegistrertSykmelding,
    isFerdigstilt: boolean,
    sykmeldingId: string | null,
): Promise<void> {
    const res = await apiFetch(getUrl(isFerdigstilt, oppgaveid, sykmeldingId), {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-Nav-Enhet': enhet,
        },
        body: JSON.stringify(sykmelding),
    })

    if (res.ok) {
        logger.info(`Oppgave med oppgaveid: ${oppgaveid} ble registrert`)
        return
    } else if (res.status === 400 && res.headers.get('Content-Type')?.includes('application/json')) {
        logger.warn(`User encountered a ruleHit error. Oppgaveid: ${oppgaveid}`)
        const ruleHits = RuleHitErrors.safeParse(await res.json())
        if (ruleHits.success) {
            throw new RuleHitError(ruleHits.data)
        } else {
            throw new Error(`Det oppsto en valideringsfeil ved registrering av oppgave med id: ${oppgaveid}`)
        }
    } else if (res.status >= 400 && res.status < 500) {
        const text = await res.text()
        if (res.status === 404 || res.status === 401) {
            logger.warn(
                `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
            )
        } else {
            logger.error(
                `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
            )
        }
        throw new Error(text)
    } else {
        const text = await res.text()
        logger.error(
            `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
        )
        throw new Error('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere')
    }
}

function getUrl(isFerdigstilt: boolean, oppgaveId: number, sykmeldingId: string | null) {
    if (isFerdigstilt) {
        return sykmeldingId != null ? `/v1/sykmelding/${sykmeldingId}` : `/v1/oppgave/${oppgaveId}/endre`
    }

    return `/v1/oppgave/${oppgaveId}/send`
}

export function apiFetch(...args: Parameters<typeof fetch>) {
    const [url, ...rest] = args
    return fetch(apiUrl(url), ...rest)
}

export function apiUrl(path: RequestInfo | URL): string {
    return `${browserEnv.NEXT_PUBLIC_ENVIRONMENT === 'test' ? 'http://localhost' : ''}/api/backend/api${path}`
}
