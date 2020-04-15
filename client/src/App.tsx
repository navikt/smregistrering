import './App.less';

import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useEffect, useRef, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import Form from './components/Form/Form';
import FormSubmit from './components/Form/components/FormSubmit';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import { Diagnosekoder } from './types/Diagnosekode';
import { PrefilledData } from './types/PrefilledData';
import { SectionTitle, Sections } from './types/Section';
import { getDiagnosekoder, getPrefilledData } from './utils/fetchUtils';

const App = () => {
    const [diagnosekoder, setDiagnosekoder] = useState<Diagnosekoder | undefined>(undefined);
    const [prefilledData, setPrefilledData] = useState<PrefilledData | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        // Bruker Promise.all siden vi ønsker å vente på alle kall før bruker kan starte registrering
        Promise.all([getDiagnosekoder(), getPrefilledData()])
            .then(([_diagnosekoder, _prefilledData]) => {
                setDiagnosekoder(new Diagnosekoder(_diagnosekoder));
                setPrefilledData(new PrefilledData(_prefilledData));
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
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

    if (error) {
        return (
            <div className="error-container">
                <Systemtittel>En feil oppsto</Systemtittel>
                <Normaltekst>{error.message}</Normaltekst>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="spinner-container">
                <NavFrontendSpinner />
                <Systemtittel>Vennligst vent mens oppgaven laster</Systemtittel>
            </div>
        );
    }

    if (!prefilledData || !diagnosekoder) {
        return null;
    }

    return (
        <>
            <Navbar />
            <div className="content-container">
                <div className="menu-container">
                    <Menu sections={sections} />
                </div>
                <div className="form-container">
                    <Form sections={sections} prefilledData={prefilledData} diagnosekoder={diagnosekoder} />
                    <FormSubmit />
                </div>
                <div className="pdf-container">
                    {prefilledData?.pdfPapirSmRegistrering ? (
                        <object
                            width="100%"
                            height="100%"
                            type="application/pdf"
                            data={'data:application/pdf;base64,' + prefilledData?.pdfPapirSmRegistrering}
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
