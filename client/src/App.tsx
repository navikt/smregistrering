import './App.less';

import * as iotsPromise from 'io-ts-promise';
import React, { useEffect, useRef, useState } from 'react';

import ErrorView from './components/ErrorView';
import Form from './components/Form/Form';
import LoadingView from './components/LoadingView';
import Menu from './components/Menu/Menu';
import Pdf from './components/Pdf/Pdf';
import { BadRequestError, OppgaveAlreadySolvedError, getDiagnosekoder, getOppgave } from './utils/dataUtils';
import { Diagnosekoder } from './types/Diagnosekode';
import { Oppgave } from './types/Oppgave';
import { SectionTitle, Sections } from './types/Section';

export interface AppProps {
    height: number;
    enhet: string | null | undefined;
}

const App = ({ enhet, height }: AppProps) => {
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
            .catch((error) => {
                if (iotsPromise.isDecodeError(error)) {
                    const sanitizedError = new Error(
                        'Henting av oppgave feilet grunnet ugyldig data mottatt fra baksystemet',
                    );
                    setError(sanitizedError);
                    console.error(sanitizedError);
                } else if (
                    error instanceof URIError ||
                    error instanceof OppgaveAlreadySolvedError ||
                    error instanceof BadRequestError
                ) {
                    setError(error);
                    console.error(error);
                } else {
                    setError(new Error('Henting av data feilet grunnet nettverksfeil'));
                    console.error(error);
                }
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
        [SectionTitle.UTDYPENDE_OPPLYSNIGNER]: {
            index: 6,
            ref: useRef<HTMLDivElement>(null),
            title: SectionTitle.UTDYPENDE_OPPLYSNIGNER,
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
            <main className="error-container">
                <ErrorView error={error} />
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className="spinner-container">
                <LoadingView />
            </main>
        );
    }

    if (!oppgave || !diagnosekoder) {
        console.error('Oppgave or/and diagnosekoder is undefined');
        return null;
    }

    return (
        <main className="main-content-container" style={{ maxHeight: `calc(100vh - ${height}px)` }}>
            <Menu sections={sections} />
            <Form
                schemaRef={schemaRef}
                sections={sections}
                oppgave={oppgave}
                diagnosekoder={diagnosekoder}
                enhet={enhet}
            />
            <Pdf pdf={oppgave.pdfPapirSykmelding} />
        </main>
    );
};

export default App;
