import './SectionContainer.less';

import React from 'react';

import SectionHeader from './SectionHeader';
import { Section } from '../../../types/Section';

type SectionProps = {
    id?: string;
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    section: Section;
    sectionError?: string;
};

const SectionContainer = ({ id, children, section, sectionError }: SectionProps) => {
    return (
        <section id={id}>
            <SectionHeader section={section} />
            <div className={`section-content ${sectionError ? 'section-content--feil' : ''}`}>{children}</div>
            {sectionError && <p className="section-error typo-feilmelding">{sectionError}</p>}
        </section>
    );
};

export default SectionContainer;
