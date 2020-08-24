export const getOppgaveidFromSearchParams = (windowLocationSearch: string): string => {
    const urlParams = new URLSearchParams(windowLocationSearch);
    const oppgaveid = urlParams.get('oppgaveid');

    if (!oppgaveid) {
        throw new URIError('Kunne ikke hente oppgave siden lenken mangler oppgaveid');
    }

    return oppgaveid;
};
