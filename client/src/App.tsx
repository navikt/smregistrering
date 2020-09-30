import './App.less';

import React, { useEffect, useRef, useState } from 'react';

import ErrorView from './components/ErrorView';
import Form from './components/Form/Form';
import LoadingView from './components/LoadingView';
import Menu from './components/Menu/Menu';
import Pdf from './components/Pdf/Pdf';
import { Diagnosekoder } from './types/Diagnosekode';
import { Oppgave } from './types/Oppgave';
import { getDiagnosekoder, getOppgave } from './utils/dataUtils';

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
                console.error(error);
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

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
            <Menu />
            <Form schemaRef={schemaRef} oppgave={oppgave} diagnosekoder={diagnosekoder} enhet={enhet} />
            <Pdf pdf={oppgave.pdfPapirSykmelding} />
        </main>
    );
};

export default App;
