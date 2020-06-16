import { DiagnosekodeSystem, Diagnosekoder } from '../types/Diagnosekode';

export const getDiagnosekodeSystem = (system?: string): string | undefined => {
    if (system === DiagnosekodeSystem.ICD10) {
        return 'icd10';
    } else if (system === DiagnosekodeSystem.ICPC2) {
        return 'icpc2';
    }
    return undefined;
};

export const hasCorrectDiagnosekode = (diagnosekoder: Diagnosekoder, kode?: string): boolean =>
    diagnosekoder.icd10.some(({ code, text }) => code === kode) ||
    diagnosekoder.icpc2.some(({ code, text }) => code === kode);
