import './Menu.less';

import Lenke from 'nav-frontend-lenker';
import React, { RefObject } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

import Panel from '../Panel/Panel';
import { Section, Sections } from '../../App';

const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
    if (!ref.current) {
        console.log('cannot scroll', ref);
        return null;
    }
    ref.current.scrollIntoView({ behavior: 'smooth' });
};

type MenuLinkProps = {
    section: Section;
};

const MenuLink = ({ section }: MenuLinkProps) => {
    return (
        <Lenke
            className="menu-link"
            href=""
            onClick={e => {
                e.preventDefault();
                scrollToRef(section.ref);
            }}
        >
            {section.title}
        </Lenke>
    );
};

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
