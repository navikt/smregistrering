import './SectionHeader.less';

import NavFrontendChevron from 'nav-frontend-chevron';
import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';

import { Section } from '../../../types/Section';

type SectionHeaderProps = {
    section: Section;
    expanded?: boolean;
    setExpanded?: () => void;
};

const SectionHeader = ({ section, expanded, setExpanded }: SectionHeaderProps) => {
    if (setExpanded) {
        return (
            <div onClick={setExpanded} ref={section.ref} className="section-header expandable">
                <Undertittel className="section-header-title">
                    {section.index} {section.title}
                </Undertittel>
                <div>
                    <NavFrontendChevron type={expanded ? 'ned' : 'opp'} />
                </div>
            </div>
        );
    }
    return (
        <div ref={section.ref} className="section-header">
            <Undertittel className="section-header-title">
                {section.index} {section.title}
            </Undertittel>
        </div>
    );
};

export default SectionHeader;
