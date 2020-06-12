import * as iotsPromise from 'io-ts-promise';

import { Diagnosekoder } from '../types/Diagnosekode';
import { Oppgave } from '../types/Oppgave';
import { getOppgaveidFromUrlQueryParameter } from './urlUtils';

export class OppgaveAlreadySolvedError extends Error {}

export const getDiagnosekoder = (): Promise<Diagnosekoder> => {
    const diagnosekoderRaw = {
        icd10: require('../data/icd10.json'),
        icpc2: require('../data/icpc2.json'),
    };
    return iotsPromise.decode(Diagnosekoder, diagnosekoderRaw);
};

export const getOppgave = (): Promise<Oppgave> => {
    try {
        const oppgaveid = getOppgaveidFromUrlQueryParameter();
        return fetch(`backend/api/v1/hentPapirSykmeldingManuellOppgave/?oppgaveid=${oppgaveid}`)
            .then(response => {
                if (response.status === 404) {
                    return Promise.reject(new OppgaveAlreadySolvedError('Oppgaven du prøver å hente er allerede løst'));
                }
                return response.json();
            })
            .then(oppgaveRaw => iotsPromise.decode(Oppgave, oppgaveRaw));
    } catch (error) {
        return Promise.reject(error);
    }
};
