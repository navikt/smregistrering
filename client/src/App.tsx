import './App.less';

import React, { useEffect, useState } from 'react';

import ErrorView from './components/ErrorView';
import Form from './components/Form/Form';
import LoadingView from './components/LoadingView';
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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getDiagnosekoder(), getOppgave()])
            .then(([_diagnosekoder, _oppgave]) => {
                console.info(`Oppgave hentet ut. oppgaveid: ${_oppgave.oppgaveid}`);
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

    if (!oppgave) {
        console.error('Oppgave is undefined');
        return null;
    }

    if (!diagnosekoder) {
        console.error('Diagnosekoder is undefined');
        return null;
    }

    return (
        <main className="main-content-container" style={{ maxHeight: `calc(100vh - ${height}px)` }}>
            <Form oppgave={oppgave} diagnosekoder={diagnosekoder} enhet={enhet} />
            <Pdf pdf={oppgave.pdfPapirSykmelding} />
        </main>
    );
};

export default App;
