import * as iotsPromise from 'io-ts-promise';

import { RegistrertSykmelding } from '../types/RegistrertSykmelding';
import { RuleHitErrors } from '../types/RuleHitErrors';

export class RuleHitError extends Error {
    ruleHits: RuleHitErrors;
    constructor(ruleHits: RuleHitErrors, message?: string) {
        super(message);
        this.ruleHits = ruleHits;
    }
}

export async function postRegistrertSykmelding(
    oppgaveid: number,
    enhet: string,
    sykmelding: RegistrertSykmelding,
): Promise<void> {
    const res = await fetch(`backend/api/v1/oppgave/${oppgaveid}/send`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-Nav-Enhet': enhet,
        },
        body: JSON.stringify(RegistrertSykmelding.encode(sykmelding)),
    });

    if (res.ok) {
        window.frontendlogger.info(`Oppgave med oppgaveid: ${oppgaveid} ble registrert`);
        return;
    } else if (res.status === 400 && res.headers.get('Content-Type')?.includes('application/json')) {
        window.frontendlogger.error(`User encountered a ruleHit error. Oppgaveid: ${oppgaveid}`);
        try {
            const ruleHits = await iotsPromise.decode(RuleHitErrors, await res.json());
            throw new RuleHitError(ruleHits);
        } catch (e) {
            if (iotsPromise.isDecodeError(e)) {
                throw new Error(`Det oppsto en valideringsfeil ved registrering av oppgave med id: ${oppgaveid}`);
            } else {
                throw e;
            }
        }
    } else if (res.status >= 400 && res.status < 500) {
        const text = await res.text();
        window.frontendlogger.error(
            `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
        );
        throw new Error(text);
    } else {
        const text = await res.text();
        window.frontendlogger.error(
            `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
        );
        throw new Error('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere');
    }
}
