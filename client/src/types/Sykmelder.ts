import * as iots from 'io-ts';

export const Sykmelder = iots.intersection([
    iots.type({
        hprNummer: iots.string,
        fnr: iots.string,
        aktorId: iots.string,
    }),
    iots.partial({
        fornavn: iots.union([iots.string, iots.null]),
        mellomnavn: iots.union([iots.string, iots.null]),
        etternavn: iots.union([iots.string, iots.null]),
    }),
]);
export type Sykmelder = iots.TypeOf<typeof Sykmelder>;
