import './SectionHeader.less';

import NavFrontendChevron from 'nav-frontend-chevron';
import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';

import { Section } from '../../../types/Section';

type SectionHeaderProps = {
    section: Section;
};

const SectionHeader = ({ section }: SectionHeaderProps) => {
    return (
        <div ref={section.ref} className="section-header">
            <Undertittel className="section-header-title">
                {section.index} {section.title}
            </Undertittel>
        </div>
    );
};

export default SectionHeader;
