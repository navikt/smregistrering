import { Diagnose } from '../types/RegistrertSykmelding';
import { DiagnosekodeSystem, Diagnosekoder } from '../types/Diagnosekode';

export const getDiagnose = (
    diagnosekoder: Diagnosekoder,
    diagnose?: Partial<Diagnose> | null,
): Partial<Diagnose> | undefined => {
    if (!diagnose) {
        return undefined;
    }

    const hasCorrectSystem =
        diagnose.system === DiagnosekodeSystem.ICD10 || diagnose.system === DiagnosekodeSystem.ICPC2;
    const hasCorrectKodeAndTekst =
        diagnosekoder['2.16.578.1.12.4.1.1.7170'].some(({ code, text }) => code === diagnose.kode) ||
        diagnosekoder['2.16.578.1.12.4.1.1.7110'].some(({ code, text }) => code === diagnose.kode);

    if (hasCorrectSystem && hasCorrectKodeAndTekst) {
        return diagnose;
    }

    if (hasCorrectSystem) {
        return {
            system: diagnose.system,
            kode: undefined,
            tekst: undefined,
        };
    }
    return undefined;
};
