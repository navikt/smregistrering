import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';

import { Section } from '../../../types/Section';

type SectionHeaderProps = {
    section: Section;
};

const SectionHeader = ({ section }: SectionHeaderProps) => {
    return (
        <header className="section-header">
            <Undertittel className="section-header-title">
                {section.index} {section.title}
            </Undertittel>
        </header>
    );
};

export default SectionHeader;
