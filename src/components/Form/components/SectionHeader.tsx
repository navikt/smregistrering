import React from 'react'
import { Undertittel } from 'nav-frontend-typografi'

import { Section } from '../../../types/Section'

type SectionHeaderProps = {
    section: Section
    headingId: string
}

const SectionHeader = ({ section, headingId }: SectionHeaderProps) => {
    return (
        <header className="section-header">
            <Undertittel className="section-header-title" id={headingId}>
                {section.index} {section.title}
            </Undertittel>
        </header>
    )
}

export default SectionHeader
