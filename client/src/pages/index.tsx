import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import ErrorView from '../components/ErrorView';
import Form from '../components/Form/Form';
import LoadingView from '../components/LoadingView';
import Pdf from '../components/Pdf/Pdf';
import logger from '../utils/logger';
import { Diagnosekoder } from '../types/diagnosekoder/Diagnosekoder';
import { Oppgave } from '../types/oppgave/Oppgave';
import { getDiagnosekoder, getOppgave } from '../utils/dataUtils';
import { getModiaContext } from '../services/modiaService';

import { AppPageProps, PageSsrResult } from './_app';

const Index = ({ aktivEnhet }: AppPageProps) => {
    const [diagnosekoder, setDiagnosekoder] = useState<Diagnosekoder | undefined>(undefined);
    const [oppgave, setOppgave] = useState<Oppgave | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFerdigstilt, setIsFerdigstilt] = useState<boolean>(false);
    const [sykmeldingId, setSykmeldingId] = useState<string | null>(null);

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
                setSykmeldingId(oppgaveResult.sykmeldingId);
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
        <main className="main-content-container">
            <Form
                oppgave={oppgave}
                diagnosekoder={diagnosekoder}
                enhet={aktivEnhet}
                isFerdigstilt={isFerdigstilt}
                sykmeldingId={sykmeldingId}
            />
            <Pdf pdf={oppgave.pdfPapirSykmelding} />
        </main>
    );
};

export const getServerSideProps: GetServerSideProps<PageSsrResult> = async () => {
    const modiaContext = await getModiaContext('TODO');

    return {
        props: {
            modiaContext,
        },
    };
};

export default Index;
