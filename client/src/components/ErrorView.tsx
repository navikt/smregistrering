import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

const ErrorView = ({ error }: { error: Error }) => {
    return (
        <span role="region" aria-label="feilmelding">
            <Systemtittel>En feil oppsto</Systemtittel>
            <Normaltekst>{error.message}</Normaltekst>
        </span>
    );
};

export default ErrorView;
