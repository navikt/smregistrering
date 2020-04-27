import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export enum MeldingTilNavField {
    BISTAND = 'meldingTilNavBistand',
    BEGRUNN = 'meldingTilNavBegrunn',
}

export type MeldingTilNav = {
    [MeldingTilNavField.BISTAND]?: boolean;
    [MeldingTilNavField.BEGRUNN]?: string;
};

type MeldingTilNavSectionProps = {
    section: Section;
    expanded: boolean;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    expandSection: () => void;
};

const MeldingTilNavSection = ({ section, expanded, expandSection, setSchema, schema }: MeldingTilNavSectionProps) => {
    return (
        <SectionContainer section={section} expanded={expanded} setExpanded={expandSection}>
            <Subsection sectionIdentifier="8.1" underline={false}>
                <Checkbox
                    checked={schema[MeldingTilNavField.BISTAND]}
                    label="Ønskes bistand fra NAV nå?"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [MeldingTilNavField.BISTAND]: !state[MeldingTilNavField.BISTAND],
                        }))
                    }
                />
                <br />
                {schema[MeldingTilNavField.BISTAND] && (
                    <Textarea
                        maxLength={0}
                        value={schema[MeldingTilNavField.BEGRUNN] || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
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
