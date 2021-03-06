import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'dayjs/locale/nb';

import './index.less';

import NAVSPA from '@navikt/navspa';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';

import App from './App';
import { DecoratorProps, EnhetDisplay } from './types/DecoratorProps';

declare global {
    type Data = string | { message: string; [key: string]: any };
    type Extra = { [key: string]: any };
    interface Window {
        frontendlogger: {
            info(data: Data): void;
            warn(data: Data): void;
            error(data: Data): void;
            event(name: string, fields?: Extra, tags?: Extra): void;
        };
    }
}

dayjs.locale('nb');

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
    const [decoratorHeight, setDecoratorHeight] = useState<number>(0);
    const decoratorRef = useRef<HTMLDivElement>(document.createElement('div'));

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

    // Poll heigh of decorator. used to set maxHeigh for main-context-container
    // Probably not too expensive to run every second
    setInterval(() => {
        if (decoratorRef.current.offsetHeight !== decoratorHeight) {
            setDecoratorHeight(decoratorRef.current.offsetHeight);
        }
    }, 1000);

    return (
        <>
            <div id="decorator" ref={decoratorRef}>
                <InternflateDecorator {...decoratorConfig} />
            </div>
            <App enhet={enhet} height={decoratorHeight} />
        </>
    );
}

NAVSPA.eksporter('wrapper', Wrapper);
