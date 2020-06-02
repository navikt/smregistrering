export class UrlError extends Error {}

export const getOppgaveidFromUrlQueryParameter = (): string => {
    if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test' ||
        process.env.REACT_APP_GCP_LABS === 'true'
    ) {
        console.info('Du befinner deg i development og vil derfor motta mock-data');
        return 'test';
    }
    if (!window.location.search) {
        throw new UrlError('Url does not contain any parameters');
    }
    const parameterString = window.location.search.split('?')[1];
    const parameters = parameterString.split('&');
    const oppgaveIdParameter = parameters.find(param => param.includes('oppgaveid'));
    if (!oppgaveIdParameter) {
        throw new UrlError('Parameter "oppgaveid" is not defined');
    }
    const oppgaveid = oppgaveIdParameter.split('=')[1];
    return oppgaveid;
};
