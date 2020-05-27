import './SectionContainer.less';

import React from 'react';

import SectionHeader from './SectionHeader';
import { Section } from '../../../types/Section';

type SectionProps = {
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    section: Section;
    sectionError?: string;
};

const SectionContainer = ({ children, section, sectionError }: SectionProps) => {
    return (
        <section>
            <SectionHeader section={section} />
            <fieldset className={`section-content ${sectionError ? 'section-content--feil' : ''}`}>{children}</fieldset>
            {sectionError && <p className="section-error typo-feilmelding">{sectionError}</p>}
        </section>
    );
};

export default SectionContainer;
