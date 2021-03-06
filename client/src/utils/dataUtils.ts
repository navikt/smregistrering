import * as iotsPromise from 'io-ts-promise';

import { DiagnosekodeSystem, Diagnosekoder } from '../types/Diagnosekode';
import { Oppgave } from '../types/Oppgave';
import { getOppgaveidFromSearchParams } from './urlUtils';

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
        window.frontendlogger.error(error);
        return Promise.reject(new Error('Feil med dianosekoder. Sjekke logger for utdypende feilbeskrivelse'));
    }
};

export const getOppgave = async (): Promise<Oppgave> => {
    try {
        const oppgaveid =
            process.env.REACT_APP_START_WITH_MOCK === 'true'
                ? 'test'
                : getOppgaveidFromSearchParams(window.location.search);
        return fetch(`backend/api/v1/oppgave/${oppgaveid}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 400) {
                    return Promise.reject(
                        new BadRequestError(
                            `Klarte ikke å hente en gyldig oppgave-id fra lenken: ${window.location.href}`,
                        ),
                    );
                } else if (response.status === 401) {
                    return Promise.reject(
                        new UnauthorizedError(
                            `Ugyldig sesjon for opppgave med oppgave-id: ${oppgaveid}. Sjekk om du har riktige tilganger for å behandle slike oppgaver`,
                        ),
                    );
                } else if (response.status === 404) {
                    return Promise.reject(
                        new OppgaveAlreadySolvedError(
                            `Fant ingen uløste oppgaver med oppgave-id: ${oppgaveid}. Oppgaven finnes ikke eller er allerede løst.`,
                        ),
                    );
                } else if (response.status === 410) {
                    return Promise.reject(
                        new OppgaveGoneError(
                            `Fant ingen skannede dokumenter for oppgave-id: ${oppgaveid}. Oppgaven er sendt tilbake til GOSYS.`,
                        ),
                    );
                } else {
                    return Promise.reject(new Error('Ukjent feil med statuskode: ' + response.status));
                }
            })
            .then((oppgaveRaw) => iotsPromise.decode(Oppgave, oppgaveRaw));
    } catch (error) {
        if (iotsPromise.isDecodeError(error)) {
            // Needs to be sanitized because the error can give details about the sykmelding
            const sanitizedError = new Error('Henting av oppgave feilet grunnet ugyldig data mottatt fra baksystemet');
            return Promise.reject(sanitizedError);
        }
        return Promise.reject(error);
    }
};
