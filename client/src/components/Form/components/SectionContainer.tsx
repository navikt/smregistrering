import './SectionContainer.less';

import React from 'react';

import SectionHeader from './SectionHeader';
import { Section } from '../../../types/Section';

type SectionProps = {
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    section: Section;
    expanded?: boolean;
    setExpanded?: () => void;
};

const SectionContainer = ({ children, section, expanded = true, setExpanded }: SectionProps) => {
    return (
        <>
            <SectionHeader section={section} expanded={expanded} setExpanded={setExpanded} />
            {expanded && <div className="section-content">{children}</div>}
        </>
    );
};

export default SectionContainer;
