import React, { PropsWithChildren } from 'react'

import { Section } from '../../../types/Section'

import SectionHeader from './SectionHeader'

type SectionProps = {
    section: Section
    sectionError?: string
}

const SectionContainer = ({ children, section, sectionError }: PropsWithChildren<SectionProps>) => {
    return (
        <section id={section.title}>
            <SectionHeader section={section} />
            <fieldset className={`section-content ${sectionError ? 'section-content--feil' : ''}`}>{children}</fieldset>
            {sectionError && <p className="section-error typo-feilmelding">{sectionError}</p>}
        </section>
    )
}

export default SectionContainer
