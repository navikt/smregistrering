import './App.less';

import React, { RefObject, useRef } from 'react';

import Form from './components/Form/Form';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';

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
    REGISTRER_SYKMELDINGEN = 'Registrer sykmeldingen',
}

export type Section = {
    index: number;
    ref: RefObject<HTMLDivElement>;
    title: SectionTitle;
};

export type Sections = {
    [key in SectionTitle]: Section;
};

const App = () => {
    const sections: Sections = {
        [SectionTitle.PASIENTOPPLYSNINGER]: {
            index: 1,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.PASIENTOPPLYSNINGER,
        },
        [SectionTitle.ARBEIDSGIVER]: {
            index: 2,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.ARBEIDSGIVER,
        },
        [SectionTitle.DIAGNOSE]: {
            index: 3,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.DIAGNOSE,
        },
        [SectionTitle.MULIGHET_FOR_ARBEID]: {
            index: 4,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.MULIGHET_FOR_ARBEID,
        },
        [SectionTitle.FRISKMELDING_PROGNOSE]: {
            index: 5,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.FRISKMELDING_PROGNOSE,
        },
        [SectionTitle.ARBEIDSEVNE]: {
            index: 6,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.ARBEIDSEVNE,
        },
        [SectionTitle.TIL_NAV]: {
            index: 7,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.TIL_NAV,
        },
        [SectionTitle.TIL_ARBEIDSGIVER]: {
            index: 8,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.TIL_ARBEIDSGIVER,
        },
        [SectionTitle.TILBAKEDATERING]: {
            index: 9,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.TILBAKEDATERING,
        },
        [SectionTitle.BEKREFTELSE]: {
            index: 10,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.BEKREFTELSE,
        },
        [SectionTitle.REGISTRER_SYKMELDINGEN]: {
            index: 11,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.REGISTRER_SYKMELDINGEN,
        },
    };

    return (
        <>
            <Navbar />
            <div className="content-container">
                <div className="menu-container">
                    <Menu sections={sections} />
                </div>
                <div className="form-container">
                    <Form sections={sections} />
                </div>
                <div className="pdf-container">
                    <object
                        width="100%"
                        height="100%"
                        type="application/pdf"
                        data="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    >
                        Visning av sykmelding-pdf krever en plugin
                    </object>
                </div>
            </div>
        </>
    );
};

export default App;
