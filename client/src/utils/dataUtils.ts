import * as iotsPromise from 'io-ts-promise';

import { DiagnosekodeSystem, Diagnosekoder } from '../types/Diagnosekode';
import { Oppgave } from '../types/oppgave/Oppgave';
import { getOppgaveidFromSearchParams } from './urlUtils';
import logger from "./logger";

export class OppgaveAlreadySolvedError extends Error {}
export class BadRequestError extends Error {}
export class OppgaveGoneError extends Error {}
export class UnauthorizedError extends Error {}

export const getDiagnosekoder = (): Promise<Diagnosekoder> => {
    try {
        const diagnosekoderRaw = {
            [DiagnosekodeSystem.ICD10]: require('../data/icd10.json'),
            [DiagnosekodeSystem.ICPC2]: require('../data/icpc2.json'),
        };
        return iotsPromise.decode(Diagnosekoder, diagnosekoderRaw);
    } catch (error) {
        logger.error(error);
        return Promise.reject(new Error('Feil med dianosekoder. Sjekke logger for utdypende feilbeskrivelse'));
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
        throw new UnauthorizedError(
            `Ugyldig sesjon for opppgave med oppgave-id: ${oppgaveid}. Sjekk om du har riktige tilganger for å behandle slike oppgaver`,
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
