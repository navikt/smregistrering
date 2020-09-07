import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './index.less';

import NAVSPA from '@navikt/navspa';
import React from 'react';

import App from './App';
import { DecoratorProps, EnhetDisplay } from './types/DecoratorProps';

if (process.env.REACT_APP_START_WITH_MOCK === 'true') {
    require('./mock/setup');
}

// NEEDED FOR TESTING WITH CYPRESS
// CAN BE REMOVED WHEN CYPRESS CAN STUB window.fetch
if (process.env.NODE_ENV === 'development') {
    require('whatwg-fetch');
}

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

const decoratorConfig: DecoratorProps = {
    appname: 'smregistrering',
    enhet: {
        initialValue: null,
        display: EnhetDisplay.ENHET_VALG,
        onChange: (enhet) => console.log(enhet),
    },
    toggles: {
        visVeileder: true,
    },
};

function Wrapper() {
    return (
        <>
            <InternflateDecorator {...decoratorConfig} />
            <App />
        </>
    );
}

NAVSPA.eksporter('wrapper', Wrapper);
