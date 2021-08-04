export const getOppgaveidFromSearchParams = (): string => {
    if (process.env.REACT_APP_START_WITH_MOCK === 'true') {
        return 'test';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const oppgaveid = urlParams.get('oppgaveid');

    if (!oppgaveid) {
        throw new URIError('Kunne ikke hente oppgave siden lenken mangler oppgaveid');
    }

    return oppgaveid;
};
