import './App.less';

import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import Form from './components/Form/Form';
import FormSubmit from './components/Form/components/FormSubmit';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import { ManuellOppgave } from './types/ManuellOppgave';

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

type DiagnosekodeDataContent = {
    code: string;
    text: string;
};

type DiagnosekodeData = {
    ICD10: DiagnosekodeDataContent[];
    ICPC2: DiagnosekodeDataContent[];
};

type Diagnosekode = {
    code: string;
    text: string;
    system: string;
};

export type Diagnosekoder = {
    icd10: Diagnosekode[];
    icpc2: Diagnosekode[];
};

const App = () => {
    const [diagnosekoder, setDiagnosekoder] = useState<Diagnosekoder>({
        icd10: [],
        icpc2: [],
    });
    const [manuellOppgave, setManuellOppgave] = useState<ManuellOppgave | undefined>(undefined);

    useEffect(() => {
        fetch('backend.com/diagnosekoder')
            .then(response => {
                return response.json();
            })
            .then((reponseData: DiagnosekodeData) => {
                const { ICD10, ICPC2 } = reponseData;
                const ICD10codes: Diagnosekode[] = ICD10.map(data => ({ ...data, system: 'icd10' }));
                const ICPC2codes: Diagnosekode[] = ICPC2.map(data => ({ ...data, system: 'icd10' }));
                setDiagnosekoder({ icd10: ICD10codes, icpc2: ICPC2codes });
            });
        fetch('backend.com/manuellOppgave')
            .then(res => res.json())
            .then((responseData: ManuellOppgave) => {
                const manuellOppgave = new ManuellOppgave(responseData);
                setManuellOppgave(manuellOppgave);
            });
    }, []);

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
            index: 7,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.ARBEIDSEVNE,
        },
        [SectionTitle.TIL_NAV]: {
            index: 8,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.TIL_NAV,
        },
        [SectionTitle.TIL_ARBEIDSGIVER]: {
            index: 9,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.TIL_ARBEIDSGIVER,
        },
        [SectionTitle.TILBAKEDATERING]: {
            index: 11,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.TILBAKEDATERING,
        },
        [SectionTitle.BEKREFTELSE]: {
            index: 12,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.BEKREFTELSE,
        },
    };

    if (!manuellOppgave) {
        return (
            <div className="spinner-container">
                <NavFrontendSpinner />
                <Systemtittel>Vennligst vent mens oppgaven laster</Systemtittel>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="content-container">
                <div className="menu-container">
                    <Menu sections={sections} />
                </div>
                <div className="form-container">
                    <Form sections={sections} diagnosekoder={diagnosekoder} />
                    <FormSubmit />
                </div>
                <div className="pdf-container">
                    {manuellOppgave?.pdfPapirSmRegistrering ? (
                        <object
                            width="100%"
                            height="100%"
                            type="application/pdf"
                            data={'data:application/pdf;base64,' + manuellOppgave?.pdfPapirSmRegistrering}
                        >
                            Visning av sykmelding-pdf krever en plugin
                        </object>
                    ) : (
                        <Normaltekst style={{ paddingTop: '4rem' }}>PDF missing</Normaltekst>
                    )}
                </div>
            </div>
        </>
    );
};

export default App;
