import './Menu.less';

import Lenke from 'nav-frontend-lenker';
import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

import Panel from '../Panel/Panel';

const links = [
    'Pasientopplysninger',
    'Arbeidsgiver',
    'Diagnose',
    'Mulighet for arbeid',
    'Friskmelding/prognose',
    'Hva skal til for å bedre arbeidsevnen',
    'Melding til NAV',
    'Melding til arbeidsgiver',
    'Tilbakedatering',
    'Bekreftelse',
    'Registrer sykmeldingen',
];

const Menu = () => {
    return (
        <>
            <Panel className="menu">
                <div className="menu-header">
                    <Systemtittel>Kategorier</Systemtittel>
                </div>
                <div className="menu-link-container">
                    {links.map(link => {
                        return (
                            <Lenke className="menu-link" href="#section">
                                {link}
                            </Lenke>
                        );
                    })}
                </div>
            </Panel>
        </>
    );
};

export default Menu;
