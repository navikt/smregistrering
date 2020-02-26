import './Menu.less';

import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

import MenuLink from './MenuLink';
import Panel from '../Panel/Panel';
import { Sections } from '../../App';

type MenuProps = {
    sections: Sections;
};

const Menu = ({ sections }: MenuProps) => {
    const sectionValues = Object.values(sections);

    return (
        <>
            <Panel className="menu">
                <div className="menu-header">
                    <Systemtittel>Kategorier</Systemtittel>
                </div>
                <div className="menu-link-container">
                    {sectionValues.map(section => (
                        <MenuLink section={section} />
                    ))}
                </div>
            </Panel>
        </>
    );
};

export default Menu;
