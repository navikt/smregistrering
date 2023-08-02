/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

export const Diagnose = z.object({
    system: z.string(),
    kode: z.string(),
    tekst: z.string(),
})
export type Diagnose = z.infer<typeof Diagnose>

export const AnnenFraverGrunn = z.enum([
    'GODKJENT_HELSEINSTITUSJON',
    'BEHANDLING_FORHINDRER_ARBEID',
    'ARBEIDSRETTET_TILTAK',
    'MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND',
    'NODVENDIG_KONTROLLUNDENRSOKELSE',
    'SMITTEFARE',
    'ABORT',
    'UFOR_GRUNNET_BARNLOSHET',
    'DONOR',
    'BEHANDLING_STERILISERING',
])
export type AnnenFraverGrunn = z.infer<typeof AnnenFraverGrunn>

export const AnnenFraverGrunnValues: Record<AnnenFraverGrunn, string> = {
    GODKJENT_HELSEINSTITUSJON: 'Når vedkommende er innlagt i en godkjent helseinstitusjon',
    BEHANDLING_FORHINDRER_ARBEID:
        'Når vedkommende er under behandling og lege erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
    ARBEIDSRETTET_TILTAK: 'Når vedkommende deltar på et arbeidsrettet tiltak',
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND:
        'Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott',
    NODVENDIG_KONTROLLUNDENRSOKELSE:
        'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
    SMITTEFARE: 'Når vedkommende myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare',
    ABORT: 'Når vedkommende er arbeidsufør som følge av svangerskapsavbrudd',
    UFOR_GRUNNET_BARNLOSHET: 'Når vedkommende er arbeidsufør som følge av behandling for barnløshet',
    DONOR: 'Når vedkommende er donor eller er under vurdering som donor',
    BEHANDLING_STERILISERING: 'Når vedkommende er arbeidsufør som følge av behandling i forbindelse med sterilisering',
}

export const AnnenFraversArsak = z.object({
    beskrivelse: z.string().nullable(),
    grunn: z.array(AnnenFraverGrunn),
})
export type AnnenFraversArsak = z.infer<typeof AnnenFraversArsak>

export const MedisinskVurdering = z.object({
    hovedDiagnose: Diagnose.nullable(),
    biDiagnoser: z.array(Diagnose),
    svangerskap: z.boolean(),
    yrkesskade: z.boolean(),
    yrkesskadeDato: z.string().nullable(),
    annenFraversArsak: AnnenFraversArsak.nullable(),
})
export type MedisinskVurdering = z.infer<typeof MedisinskVurdering>
