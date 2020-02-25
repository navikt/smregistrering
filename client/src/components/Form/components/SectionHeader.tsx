import './SectionHeader.less';

import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';

import { Section } from '../../../App';

type SectionHeaderProps = {
    section: Section;
};

const SectionHeader = ({ section }: SectionHeaderProps) => {
    return (
        <div ref={section.ref} className="section-header">
            <Undertittel>
                {section.index} {section.title}
            </Undertittel>
        </div>
    );
};

export default SectionHeader;
