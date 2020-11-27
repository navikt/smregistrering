import * as iots from 'io-ts';

export const PasientNavn = iots.intersection([
    iots.type({ fornavn: iots.string, etternavn: iots.string }),
    iots.partial({ mellomnavn: iots.union([iots.string, iots.null]) }),
]);
export type PasientNavn = iots.TypeOf<typeof PasientNavn>;
