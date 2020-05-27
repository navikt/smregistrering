import './App.less';

import * as iotsPromise from 'io-ts-promise';
import React, { useEffect, useRef, useState } from 'react';

import Banner from './components/Banner/Banner';
import ErrorView from './components/ErrorView';
import Form from './components/Form/Form';
import LoadingView from './components/LoadingView';
import Menu from './components/Menu/Menu';
import Pdf from './components/Pdf/Pdf';
import { Diagnosekoder } from './types/Diagnosekode';
import { Oppgave } from './types/Oppgave';
import { SectionTitle, Sections } from './types/Section';
import { UrlError } from './utils/urlUtils';
import { getDiagnosekoder, getOppgave } from './utils/dataUtils';

const App = () => {
    const [diagnosekoder, setDiagnosekoder] = useState<Diagnosekoder | undefined>(undefined);
    const [oppgave, setOppgave] = useState<Oppgave | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const schemaRef = useRef<HTMLDivElement>(null);

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
            <>
                <Banner />
                <main className="error-container">
                    <ErrorView error={error} />
                </main>
            </>
        );
    }

    if (isLoading) {
        return (
            <>
                <Banner />
                <main className="spinner-container">
                    <LoadingView />
                </main>
            </>
        );
    }

    if (!oppgave || !diagnosekoder) {
        return null;
    }

    return (
        <>
            <Banner />
            <main className="main-content-container">
                <Menu sections={sections} />
                <Form schemaRef={schemaRef} sections={sections} oppgave={oppgave} diagnosekoder={diagnosekoder} />
                <Pdf pdf={oppgave.pdfPapirSykmelding} />
            </main>
        </>
    );
};

export default App;
