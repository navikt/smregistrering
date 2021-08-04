/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';

export const KontaktMedPasient = z.object({
    kontaktDato: z
        .string()
        .transform((arg) => new Date(arg))
        .nullable(),
    begrunnelseIkkeKontakt: z.string().nullable(),
});
export type KontaktMedPasient = z.infer<typeof KontaktMedPasient>;
