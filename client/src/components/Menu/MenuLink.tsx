import './Menu.less';

import Lenke from 'nav-frontend-lenker';
import React from 'react';

import { Section } from '../../types/Section';

type MenuLinkProps = {
    section: Section;
};

const MenuLink = ({ section }: MenuLinkProps) => {
    return (
        <Lenke className="menu-link" href={`#${section.title}`}>
            {section.title}
        </Lenke>
    );
};

export default MenuLink;
