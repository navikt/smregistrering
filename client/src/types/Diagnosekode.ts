export type DiagnosekodeDataContent = {
    code: string;
    text: string;
};

export type DiagnosekodeData = {
    ICD10: DiagnosekodeDataContent[];
    ICPC2: DiagnosekodeDataContent[];
};

export type Diagnosekode = {
    code: string;
    text: string;
    system: string;
};

export class Diagnosekoder {
    icd10: Diagnosekode[];
    icpc2: Diagnosekode[];

    constructor(diagnosekoder: DiagnosekodeData) {
        const ICD10codes: Diagnosekode[] = diagnosekoder.ICD10.map(data => ({ ...data, system: 'icd10' }));
        const ICPC2codes: Diagnosekode[] = diagnosekoder.ICPC2.map(data => ({ ...data, system: 'icd10' }));
        this.icd10 = ICD10codes;
        this.icpc2 = ICPC2codes;
    }
}
