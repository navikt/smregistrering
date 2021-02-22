import Lenke from 'nav-frontend-lenker';
import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { OppgaveGoneError } from '../utils/dataUtils';

const ErrorView = ({ error }: { error: Error }) => {
    if (error instanceof OppgaveGoneError) {
        return (
            <div role="region" aria-label="feilmelding">
                <Systemtittel>En feil oppsto</Systemtittel>
                <br />
                <Normaltekst>{error.message}</Normaltekst>
                <br />
                <Lenke href={process.env.REACT_APP_GOSYS_URL!}>Tilbake til GOSYS</Lenke>
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
