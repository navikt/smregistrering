import { Diagnose } from '../types/RegistrertSykmelding';
import { DiagnosekodeSystem, Diagnosekoder } from '../types/diagnosekoder/Diagnosekoder';

export const getPrefilledDiagnose = (
    diagnosekoder: Diagnosekoder,
    diagnose?: Partial<Diagnose> | null,
): Partial<Diagnose> | undefined => {
    if (!diagnose) {
        return undefined;
    }

    const hasCorrectSystem =
        diagnose.system === DiagnosekodeSystem.ICD10 || diagnose.system === DiagnosekodeSystem.ICPC2;
    const hasCorrectKodeAndTekst =
        diagnosekoder[DiagnosekodeSystem.ICD10].some(
            ({ code, text }) => code === diagnose.kode && text === diagnose.tekst,
        ) ||
        diagnosekoder[DiagnosekodeSystem.ICPC2].some(
            ({ code, text }) => code === diagnose.kode && text === diagnose.tekst,
        );

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
    // Do not set kode and tekst without setting system.
    return undefined;
};

export const getPrefilledBidiagnoser = (
    diagnoserkoder: Diagnosekoder,
    bidiagnoser: Partial<Diagnose>[] | undefined,
): Partial<Diagnose>[] => {
    if (!bidiagnoser) {
        return [];
    }

    const result = bidiagnoser.reduce((acc, bidiagnose) => {
        const diagnose = getPrefilledDiagnose(diagnoserkoder, bidiagnose);
        if (diagnose) {
            return [...acc, diagnose];
        }
        return acc;
    }, [] as Partial<Diagnose>[]);
    return result;
};
