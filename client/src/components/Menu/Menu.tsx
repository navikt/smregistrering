import './Menu.less';

import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

import MenuLink from './MenuLink';
import Panel from '../Panel/Panel';
import { sections } from '../../types/Section';

const Menu = () => {
    const sectionValues = Object.values(sections);

    return (
        <section>
            <Panel ariaLabel="menypanel" className="menu">
                <Systemtittel className="menu-header">Kategorier</Systemtittel>
                <nav role="navigation" className="menu-link-container">
                    {sectionValues.map((section) => (
                        <MenuLink key={section.index} section={section} />
                    ))}
                </nav>
            </Panel>
        </section>
    );
};

export default Menu;
