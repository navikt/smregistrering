import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export enum MeldingTilArbeidsgiverField {
    INNSPILL = 'meldingTilArbeidsgiverInnspill',
    BESKRIV = 'meldingTIlArbeidsgiverBeskriv',
}

export type MeldingTilArbeidsgiver = {
    [MeldingTilArbeidsgiverField.INNSPILL]?: boolean;
    [MeldingTilArbeidsgiverField.BESKRIV]?: string;
};

type MeldingTilArbeidsgiverSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
};

const MeldingTilArbeidsgiverSection = ({ section, setSchema, schema }: MeldingTilArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="9.1" underline={false}>
                <Checkbox
                    checked={schema[MeldingTilArbeidsgiverField.INNSPILL]}
                    label="Andre innspill til arbeidsgiver"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [MeldingTilArbeidsgiverField.INNSPILL]: !state[MeldingTilArbeidsgiverField.INNSPILL],
                        }))
                    }
                />
                <br />
                {schema[MeldingTilArbeidsgiverField.INNSPILL] && (
                    <Textarea
                        maxLength={0}
                        value={schema[MeldingTilArbeidsgiverField.BESKRIV] || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                [MeldingTilArbeidsgiverField.BESKRIV]: value,
                            }))
                        }
                        label={<Element>Andre innspill til arbeidsgiver</Element>}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default MeldingTilArbeidsgiverSection;
