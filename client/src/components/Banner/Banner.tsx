import './Banner.less';

import * as iots from 'io-ts';
import * as iotsPromise from 'io-ts-promise';
import React, { useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';

import navLogo from '../../svg/nav-logo.svg';

const Banner = () => {
    const [loginText, setLoginText] = useState<string | undefined>();

    useEffect(() => {
        fetch('/user')
            .then(res => {
                return res.text();
            })
            .then(textRaw => iotsPromise.decode(iots.string, textRaw))
            .then(text => {
                setLoginText(`Logget inn som: ${text}`);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <header className="banner">
            <span className="banner__left">
                <img className="navlogo" src={navLogo} alt="NAV-logo" />
                <Element>Registrering av papirsykmelding</Element>
            </span>
            {loginText && <Element>{loginText}</Element>}
        </header>
    );
};

export default Banner;
