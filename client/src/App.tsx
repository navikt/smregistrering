import './App.less';

import React, { useEffect, useState } from 'react';

import ErrorView from './components/ErrorView';
import Form from './components/Form/Form';
import LoadingView from './components/LoadingView';
import Pdf from './components/Pdf/Pdf';
import logger from './utils/logger';
import { Diagnosekoder } from './types/diagnosekoder/Diagnosekoder';
import { Oppgave } from './types/oppgave/Oppgave';
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
    const [isFerdigstilt, setIsFerdigstilt] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const _diagnosekoder = await getDiagnosekoder();
                const oppgaveResult = await getOppgave();
                logger.info(
                    `Oppgave av type ${oppgaveResult.type} hentet ut. oppgaveId: ${oppgaveResult.oppgave.oppgaveid}`,
                );
                setDiagnosekoder(_diagnosekoder);
                setOppgave(oppgaveResult.oppgave);
                setIsFerdigstilt(oppgaveResult.type === 'FerdigstiltOppgave');
            } catch (error: any) {
                logger.error(error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        })();
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
        logger.error('Oppgave is undefined');
        return null;
    }

    if (!diagnosekoder) {
        logger.error('Diagnosekoder is undefined');
        return null;
    }

    return (
        <main className="main-content-container" style={{ maxHeight: `calc(100vh - ${height}px)` }}>
            <Form oppgave={oppgave} diagnosekoder={diagnosekoder} enhet={enhet} isFerdigstilt={isFerdigstilt} />
            <Pdf pdf={oppgave.pdfPapirSykmelding} />
        </main>
    );
};

export default App;
