import * as iotsPromise from 'io-ts-promise';

import { Diagnosekoder } from '../types/Diagnosekode';
import { Oppgave } from '../types/Oppgave';
import { getOppgaveidFromUrlQueryParameter } from './urlUtils';

export const getDiagnosekoder = (): Promise<Diagnosekoder> => {
    const diagnosekoderRaw = {
        icd10: require('../data/icd10.json'),
        icpc2: require('../data/icpc2.json'),
    };
    return iotsPromise.decode(Diagnosekoder, diagnosekoderRaw);
};

export const getOppgave = (): Promise<Oppgave> => {
    const oppgaveid = getOppgaveidFromUrlQueryParameter();
    return fetch(`/api/v1/hentPapirSykmeldingManuellOppgave/?oppgaveid=${oppgaveid}`)
        .then(response => response.json())
        .then(oppgaveRaw => iotsPromise.decode(Oppgave, oppgaveRaw));
};
