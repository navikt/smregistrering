import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType, ErrorSchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type MeldingTilArbeidsgiver = {
    meldingTilArbeidsgiverInnspill?: boolean;
    meldingTilArbeidsgiverBeskriv?: string;
};

type MeldingTilArbeidsgiverSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const MeldingTilArbeidsgiverSection = ({ section, setSchema, schema, errors, validate }: MeldingTilArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="9.1" underline={false}>
                <Checkbox
                    checked={schema.meldingTilArbeidsgiverInnspill}
                    label="Andre innspill til arbeidsgiver"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            meldingTilArbeidsgiverInnspill: !state.meldingTilArbeidsgiverInnspill,
                        }))
                    }
                />
                <br />
                {schema.meldingTilArbeidsgiverInnspill && (
                    <Textarea
                        maxLength={0}
                        value={schema.meldingTilArbeidsgiverBeskriv || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                meldingTilArbeidsgiverBeskriv: value,
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
