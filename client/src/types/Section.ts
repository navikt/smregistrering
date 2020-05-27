import { RefObject } from "react";

export enum SectionTitle {
    PASIENTOPPLYSNINGER = 'Pasientopplysninger',
    ARBEIDSGIVER = 'Arbeidsgiver',
    DIAGNOSE = 'Diagnose',
    MULIGHET_FOR_ARBEID = 'Mulighet for arbeid',
    FRISKMELDING_PROGNOSE = 'Friskmelding/prognose',
    ARBEIDSEVNE = 'Hva skal til for å bedre arbeidsevnen',
    TIL_NAV = 'Melding til NAV',
    TIL_ARBEIDSGIVER = 'Melding til arbeidsgiver',
    TILBAKEDATERING = 'Tilbakedatering',
    BEKREFTELSE = 'Bekreftelse',
}

export type Section = {
    index: number;
    ref: RefObject<HTMLDivElement>;
    title: SectionTitle;
};

export type Sections = {
    [key in SectionTitle]: Section;
};