import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './index.less';

import NAVSPA from '@navikt/navspa';
import React, { useState } from 'react';

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

function Wrapper() {
    const [enhet, setEnhet] = useState<string | null | undefined>(undefined);

    const decoratorConfig: DecoratorProps = {
        appname: 'smregistrering',
        enhet: {
            initialValue: null,
            display: EnhetDisplay.ENHET_VALG,
            onChange: (enhet) => {
                setEnhet(enhet);
            },
        },
        toggles: {
            visVeileder: true,
        },
        useProxy: true,
    };

    return (
        <>
            <InternflateDecorator {...decoratorConfig} />
            <App enhet={enhet} />
        </>
    );
}

NAVSPA.eksporter('wrapper', Wrapper);
