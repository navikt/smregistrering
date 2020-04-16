import * as tPromise from 'io-ts-promise';

import { DiagnosekodeData } from '../types/Diagnosekode';
import { Oppgave } from '../types/Oppgave';

export const getDiagnosekoder = (): Promise<DiagnosekodeData> => {
    return fetch('backend.com/diagnosekoder').then(response => response.json());
};

export const getOppgave = (): Promise<Oppgave> => {
    return fetch('backend.com/manuellOppgave')
        .then(response => response.json())
        .then(tPromise.decode(Oppgave));
};
