import { DiagnosekodeData } from '../types/Diagnosekode';
import { PrefilledData } from '../types/PrefilledData';

export const getDiagnosekoder = (): Promise<DiagnosekodeData> => {
    return fetch('backend.com/diagnosekoder').then(response => response.json());
};

export const getPrefilledData = (): Promise<PrefilledData> => {
    return fetch('backend.com/manuellOppgave').then(response => response.json());
};
