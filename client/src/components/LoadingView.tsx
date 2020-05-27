import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

const LoadingView = () => {
    return (
        <div role="region" aria-label="spinner">
            <NavFrontendSpinner />
            <Systemtittel>Vennligst vent mens oppgaven laster</Systemtittel>
        </div>
    );
};

export default LoadingView;
