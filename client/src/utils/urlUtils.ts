export const getIdFromSearchParams = (): { oppgaveId: string } | { sykmeldingId: string } => {
    if (process.env.NEXT_PUBLIC_START_WITH_MOCK === 'true') {
        return { oppgaveId: 'test' };
    }

    const urlParams = new URLSearchParams(window.location.search);
    const oppgaveId = urlParams.get('oppgaveid');
    const sykmeldingId = urlParams.get('sykmeldingid');

    if (oppgaveId) {
        return { oppgaveId };
    } else if (sykmeldingId) {
        return { sykmeldingId };
    } else {
        throw new URIError('Kunne ikke hente oppgave siden lenken mangler oppgaveId og sykmeldingId');
    }
};
