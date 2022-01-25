import { DiagnosekodeSystem, Diagnosekoder } from '../types/diagnosekoder/Diagnosekoder';
import { Oppgave } from '../types/oppgave/Oppgave';

import logger from './logger';
import { getOppgaveidFromSearchParams } from './urlUtils';

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

export const getOppgave = async (): Promise<Oppgave> => {
    const oppgaveid = getOppgaveidFromSearchParams();
    const res = await fetch(`backend/api/v1/oppgave/${oppgaveid}`);
    if (res.ok) {
        const json = await res.json();
        return Oppgave.parse(json);
    } else if (res.status === 400) {
        throw new BadRequestError(`Klarte ikke å hente en gyldig oppgave-id fra lenken: ${window.location.href}`);
    } else if (res.status === 401) {
        throw new UnauthorizedError(`Du har blitt logget ut, eller har ugyldig tilgang. Vennligst last siden på nytt.`);
    } else if (res.status === 403) {
        throw new UnauthorizedError(
            `Du har ikke tilgang til oppgave ${oppgaveid}. Sjekk om du har riktige tilganger for å behandle slike oppgaver`,
        );
    } else if (res.status === 404) {
        throw new OppgaveAlreadySolvedError(
            `Fant ingen uløste oppgaver med oppgave-id: ${oppgaveid}. Oppgaven finnes ikke eller er allerede løst.`,
        );
    } else if (res.status === 410) {
        throw new OppgaveGoneError(
            `Fant ingen skannede dokumenter for oppgave-id: ${oppgaveid}. Oppgaven er sendt tilbake til GOSYS.`,
        );
    } else {
        throw new Error('Ukjent feil med statuskode: ' + res.status);
    }
};
