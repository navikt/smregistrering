import './Menu.less';

import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

import MenuLink from './MenuLink';
import Panel from '../Panel/Panel';
import { Sections } from '../../types/Section';

type MenuProps = {
    sections: Sections;
};

const Menu = ({ sections }: MenuProps) => {
    const sectionValues = Object.values(sections);

    return (
        <section>
            <Panel ariaLabel="menypanel" className="menu">
                <Systemtittel className="menu-header">Kategorier</Systemtittel>
                <nav role="navigation" className="menu-link-container">
                    {sectionValues.map(section => (
                        <MenuLink key={section.index} section={section} />
                    ))}
                </nav>
            </Panel>
        </section>
    );
};

export default Menu;
