import './Menu.less';

import Lenke from 'nav-frontend-lenker';
import React, { RefObject } from 'react';

import { Section } from '../../types/Section';

export const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
    if (!ref.current) {
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
            onClick={(e) => {
                e.preventDefault();
                scrollToRef(section.ref);
            }}
        >
            {section.title}
        </Lenke>
    );
};

export default MenuLink;
