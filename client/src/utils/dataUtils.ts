import { DiagnosekodeSystem, Diagnosekoder } from '../types/diagnosekoder/Diagnosekoder';
import { Oppgave } from '../types/oppgave/Oppgave';

import logger from './logger';
import { getIdFromSearchParams } from './urlUtils';

export class OppgaveAlreadySolvedError extends Error {}

export class BadRequestError extends Error {}

export class OppgaveGoneError extends Error {}

export class UnauthorizedError extends Error {}

export const getDiagnosekoder = async (): Promise<Diagnosekoder> => {
    try {
        const diagnosekoderRaw = {
            [DiagnosekodeSystem.ICD10]: (await import('../data/icd10.json')).default,
            [DiagnosekodeSystem.ICPC2]: (await import('../data/icpc2.json')).default,
        };
        return Diagnosekoder.parse(diagnosekoderRaw);
    } catch (error: any) {
        logger.error(error);
        throw new Error('Feil med dianosekoder. Sjekke logger for utdypende feilbeskrivelse');
    }
};

export type OppgaveResult = { type: 'Oppgave' | 'FerdigstiltOppgave'; oppgave: Oppgave; sykmeldingId: string | null };

export const getOppgave = async (): Promise<OppgaveResult> => {
    const id = getIdFromSearchParams();
    if ('oppgaveId' in id) {
        const oppgaveId = id.oppgaveId;
        const url = `backend/api/v1/oppgave/${oppgaveId}`;
        const oppgave = await fetchOppgave(url);
        return { type: 'Oppgave', oppgave, sykmeldingId: null };
    } else {
        const sykmeldingId = id.sykmeldingId;
        const url = `backend/api/v1/sykmelding/${sykmeldingId}/ferdigstilt`;
        const oppgave = await fetchOppgave(url);
        return { type: 'FerdigstiltOppgave', oppgave, sykmeldingId };
    }
};

async function fetchOppgave(url: string): Promise<Oppgave> {
    const res = await fetch(url);
    if (res.ok) {
        const json = await res.json();
        return Oppgave.parse(json);
    } else if (res.status === 400) {
        throw new BadRequestError(`Klarte ikke å hente en gyldig oppgave-id fra lenken: ${window.location.href}`);
    } else if (res.status === 401) {
        throw new UnauthorizedError(`Du har blitt logget ut, eller har ugyldig tilgang. Vennligst last siden på nytt.`);
    } else if (res.status === 403) {
        throw new UnauthorizedError(
            `Du har ikke tilgang til oppgaven. Sjekk om du har riktige tilganger for å behandle slike oppgaver`,
        );
    } else if (res.status === 404) {
        throw new OppgaveAlreadySolvedError(`Fant ingen uløste oppgaver. Oppgaven finnes ikke eller er allerede løst.`);
    } else if (res.status === 410) {
        throw new OppgaveGoneError(`Fant ingen skannede dokumenter. Oppgaven er sendt tilbake til GOSYS.`);
    } else {
        throw new Error('Ukjent feil med statuskode: ' + res.status);
    }
}
