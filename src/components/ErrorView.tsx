import Lenke from 'nav-frontend-lenker';
import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { OppgaveGoneError } from '../utils/dataUtils';
import { getReturnToURL } from '../utils/urlUtils';

interface Props {
    error: Error;
    sykmeldingId: string | null;
}

const ErrorView = ({ error, sykmeldingId }: Props): JSX.Element => {
    const { url, text } = getReturnToURL(sykmeldingId);

    if (error instanceof OppgaveGoneError) {
        return (
            <div role="region" aria-label="feilmelding">
                <Systemtittel>En feil oppsto</Systemtittel>
                <br />
                <Normaltekst>{error.message}</Normaltekst>
                <br />
                <Lenke href={url}>{text}</Lenke>
            </div>
        );
    }

    return (
        <div role="region" aria-label="feilmelding">
            <Systemtittel>En feil oppsto</Systemtittel>
            <br />
            <Normaltekst>{error.message}</Normaltekst>
        </div>
    );
};

export default ErrorView;
