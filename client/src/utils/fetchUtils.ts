import { DiagnosekodeData } from '../types/Diagnosekode';
import { ReceivedManuellOppgave } from '../types/ReceivedManuellOppgave';

export const getDiagnosekoder = (): Promise<DiagnosekodeData> => {
    return fetch('backend.com/diagnosekoder').then(response => response.json());
};

export const getOppgave = (): Promise<ReceivedManuellOppgave> => {
    return fetch('backend.com/manuellOppgave').then(response => response.json());
};
