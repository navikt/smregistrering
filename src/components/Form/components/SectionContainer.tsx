import React, { PropsWithChildren } from 'react'

import { Section } from '../../../types/Section'

import SectionHeader from './SectionHeader'

type SectionProps = {
    section: Section
    sectionError?: string
}

const SectionContainer = ({ children, section, sectionError }: PropsWithChildren<SectionProps>) => {
    const sectionId = section.title.replace(/\s/g, '-').toLowerCase()

    return (
        <section id={section.title} aria-labelledby={`${sectionId}-heading`}>
            <SectionHeader section={section} headingId={`${sectionId}-heading`} />
            <fieldset className={`section-content ${sectionError ? 'section-content--feil' : ''}`}>{children}</fieldset>
            {sectionError && <p className="section-error typo-feilmelding">{sectionError}</p>}
        </section>
    )
}

export default SectionContainer
