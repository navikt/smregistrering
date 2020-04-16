import * as iots from 'io-ts';

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
