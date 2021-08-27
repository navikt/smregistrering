/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';

export const MeldingTilNAV = z.object({
    bistandUmiddelbart: z.boolean(),
    beskrivBistand: z.string().nullable(),
});
export type MeldingTilNAV = z.infer<typeof MeldingTilNAV>;
