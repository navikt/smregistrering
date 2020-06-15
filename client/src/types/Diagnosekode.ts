import * as iots from 'io-ts';

export enum DiagnosekodeSystem {
    ICD10 = '2.16.578.1.12.4.1.1.7110',
    ICPC2 = '2.16.578.1.12.4.1.1.7170',
}

export const Diagnosekode = iots.type({
    code: iots.string,
    text: iots.string,
});

export const Diagnosekoder = iots.type({
    icd10: iots.array(Diagnosekode),
    icpc2: iots.array(Diagnosekode),
});

export type Diagnosekode = iots.TypeOf<typeof Diagnosekode>;
export type Diagnosekoder = iots.TypeOf<typeof Diagnosekoder>;
