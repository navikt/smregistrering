import * as iotsPromise from 'io-ts-promise';

import { Diagnosekoder } from '../types/Diagnosekode';
import { Oppgave } from '../types/Oppgave';

export const getDiagnosekoder = (): Promise<Diagnosekoder> => {
    const diagnosekoderRaw = {
        icd10: require('../data/icd10.json'),
        icpc2: require('../data/icpc2.json'),
    };
    return iotsPromise.decode(Diagnosekoder, diagnosekoderRaw);
};

export const getOppgave = (oppgaveId: string): Promise<Oppgave> => {
    return fetch(`/api/v1/hentPapirSykmeldingManuellOppgave/?oppgaveid=${oppgaveId}`)
        .then(response => response.json())
        .then(oppgaveRaw => iotsPromise.decode(Oppgave, oppgaveRaw));
};
