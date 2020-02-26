import React from 'react';

import SectionHeader from './SectionHeader';
import { Section } from '../../../App';

type SectionProps = {
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    section: Section;
    expanded?: boolean;
    setExpanded?: () => void;
};

const SectionContainer = ({ children, section, expanded = true, setExpanded }: SectionProps) => {
    return (
        <div>
            <SectionHeader section={section} expanded={expanded} setExpanded={setExpanded} />
            {expanded && children}
        </div>
    );
};

export default SectionContainer;
