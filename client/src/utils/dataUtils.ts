import * as iotsPromise from 'io-ts-promise';

import { DiagnosekodeSystem, Diagnosekoder } from '../types/Diagnosekode';
import { Oppgave } from '../types/Oppgave';
import { getOppgaveidFromSearchParams } from './urlUtils';

export class OppgaveAlreadySolvedError extends Error {}

export const getDiagnosekoder = (): Promise<Diagnosekoder> => {
    const diagnosekoderRaw = {
        [DiagnosekodeSystem.ICD10]: require('../data/icd10.json'),
        [DiagnosekodeSystem.ICPC2]: require('../data/icpc2.json'),
    };
    return iotsPromise.decode(Diagnosekoder, diagnosekoderRaw);
};

export const getOppgave = (): Promise<Oppgave> => {
    try {
        const oppgaveid =
            process.env.REACT_APP_START_WITH_MOCK === 'true'
                ? 'test'
                : getOppgaveidFromSearchParams(window.location.search);
        return fetch(`backend/api/v1/oppgave/${oppgaveid}`)
            .then((response) => {
                if (response.status === 404) {
                    return Promise.reject(new OppgaveAlreadySolvedError('Oppgaven du prøver å hente er allerede løst'));
                }
                return response.json();
            })
            .then((oppgaveRaw) => iotsPromise.decode(Oppgave, oppgaveRaw));
    } catch (error) {
        return Promise.reject(error);
    }
};
