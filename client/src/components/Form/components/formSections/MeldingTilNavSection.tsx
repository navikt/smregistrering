import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Section } from '../../../../App';

export enum MeldingTilNavField {
    BISTAND = 'bistand',
    BEGRUNN = 'begrunn',
}

export type MeldingTilNav = {
    [MeldingTilNavField.BISTAND]?: boolean;
    [MeldingTilNavField.BEGRUNN]?: string;
};

type MeldingTilNavSectionProps = {
    section: Section;
    expanded: boolean;
    setMeldingTilNav: (value: React.SetStateAction<MeldingTilNav>) => void;
    expandSection: () => void;
    meldingTilNav: MeldingTilNav;
};

const MeldingTilNavSection = ({
    section,
    expanded,
    expandSection,
    setMeldingTilNav,
    meldingTilNav,
}: MeldingTilNavSectionProps) => {
    return (
        <SectionContainer section={section} expanded={expanded} setExpanded={expandSection}>
            <Subsection sectionIdentifier="8.1" underline={false}>
                <Checkbox
                    checked={meldingTilNav[MeldingTilNavField.BISTAND]}
                    label="Ønskes bistand fra NAV nå?"
                    onChange={() =>
                        setMeldingTilNav(state => ({
                            ...state,
                            [MeldingTilNavField.BISTAND]: !state[MeldingTilNavField.BISTAND],
                        }))
                    }
                />
                <br />
                {meldingTilNav[MeldingTilNavField.BISTAND] && (
                    <Textarea
                        maxLength={0}
                        value={meldingTilNav[MeldingTilNavField.BEGRUNN] || ''}
                        onChange={({ target: { value } }) =>
                            setMeldingTilNav(state => ({
                                ...state,
                                [MeldingTilNavField.BEGRUNN]: value,
                            }))
                        }
                        label={<Element>Begrunn nærmere</Element>}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default MeldingTilNavSection;
