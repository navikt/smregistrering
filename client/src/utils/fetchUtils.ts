import * as iotsPromise from 'io-ts-promise';

import { DiagnosekodeData } from '../types/Diagnosekode';
import { Oppgave } from '../types/Oppgave';

export const getDiagnosekoder = (): Promise<DiagnosekodeData> => {
    return fetch('backend.com/diagnosekoder').then(response => response.json());
};

export const getOppgave = (oppgaveId: string): Promise<Oppgave> => {
    return fetch(`/api/v1/hentPapirSykmeldingManuellOppgave/?oppgaveid=${oppgaveId}`)
        .then(response => response.json())
        .then(json => iotsPromise.decode(Oppgave, json));
};
