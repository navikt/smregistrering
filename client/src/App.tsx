import './App.less';

import * as iotsPromise from 'io-ts-promise';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useEffect, useRef, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import FormErrorSummary from './components/Form/FormErrorSummary';
import FormSubmit from './components/Form/components/FormSubmit';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import Form, { ErrorSchemaType } from './components/Form/Form';
import { Diagnosekoder } from './types/Diagnosekode';
import { Oppgave } from './types/Oppgave';
import { SectionTitle, Sections } from './types/Section';
import { UrlError } from './utils/urlUtils';
import { getDiagnosekoder, getOppgave } from './utils/dataUtils';

const formHasErrors = (formErrors: ErrorSchemaType) => {
    const errorValues = Object.values(formErrors);
    const definedErrors = errorValues.filter(errorValue => errorValue);
    return definedErrors.length > 0;
};

const App = () => {
    const [diagnosekoder, setDiagnosekoder] = useState<Diagnosekoder | undefined>(undefined);
    const [oppgave, setOppgave] = useState<Oppgave | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<ErrorSchemaType>({});

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getDiagnosekoder(), getOppgave()])
            .then(([_diagnosekoder, _oppgave]) => {
                setDiagnosekoder(_diagnosekoder);
                setOppgave(_oppgave);
            })
            .catch(error => {
                if (iotsPromise.isDecodeError(error)) {
                    setError(new Error('Henting av oppgave feilet grunnet ugyldig data mottatt fra baksystemet'));
                } else if (error instanceof UrlError) {
                    setError(new Error('Henting av oppgave feilet grunnet feil med lenken'));
                } else {
                    setError(new Error('Henting av data feilet grunnet nettverksfeil'));
                }
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // TODO: flytte sections til /types/Section.ts ?
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

    if (!oppgave || !diagnosekoder) {
        return null;
    }

    const hasErrors = formHasErrors(formErrors);

    return (
        <>
            <Navbar />
            <div className="content-container">
                <div className="menu-container">
                    <Menu sections={sections} />
                </div>
                <div className="form-container">
                    <Form
                        sections={sections}
                        oppgave={oppgave}
                        diagnosekoder={diagnosekoder}
                        formErrors={formErrors}
                        setFormErrors={setFormErrors}
                    />
                    <FormErrorSummary formErrors={formErrors} hasErrors={hasErrors} />
                    <FormSubmit hasErrors={hasErrors} />
                </div>
                <div className="pdf-container">
                    <object
                        width="100%"
                        height="100%"
                        type="application/pdf"
                        data={'data:application/pdf;base64,' + oppgave.pdfPapirSykmelding}
                    >
                        Visning av sykmelding-pdf krever en plugin
                    </object>
                </div>
            </div>
        </>
    );
};

export default App;
