type SectionName =
    | 'PASIENTOPPLYSNINGER'
    | 'ARBEIDSGIVER'
    | 'DIAGNOSE'
    | 'MULIGHET_FOR_ARBEID'
    | 'FRISKMELDING_PROGNOSE'
    | 'UTDYPENDE_OPPLYSNINGER'
    | 'ARBEIDSEVNE'
    | 'MELDING_TIL_NAV'
    | 'MELDING_TIL_ARBEIDSGIVER'
    | 'TILBAKEDATERING'
    | 'BEHANDLER'

export type Section = {
    index: number
    title: string
}

export const sections: Record<SectionName, Section> = {
    PASIENTOPPLYSNINGER: {
        index: 1,
        title: 'Pasientopplysninger',
    },
    ARBEIDSGIVER: {
        index: 2,
        title: 'Arbeidsgiver',
    },
    DIAGNOSE: {
        index: 3,
        title: 'Diagnose',
    },
    MULIGHET_FOR_ARBEID: {
        index: 4,
        title: 'Mulighet for arbeid',
    },
    FRISKMELDING_PROGNOSE: {
        index: 5,
        title: 'Friskmelding/prognose',
    },
    UTDYPENDE_OPPLYSNINGER: {
        index: 6,
        title: 'Utdypende opplysninger',
    },
    ARBEIDSEVNE: {
        index: 7,
        title: 'Hva skal til for å bedre arbeidsevnen',
    },
    MELDING_TIL_NAV: {
        index: 8,
        title: 'Melding til NAV',
    },
    MELDING_TIL_ARBEIDSGIVER: {
        index: 9,
        title: 'Melding til arbeidsgiveren',
    },
    TILBAKEDATERING: {
        index: 10,
        title: 'Tilbakedatering',
    },
    BEHANDLER: {
        index: 12,
        title: 'Behandler',
    },
}
