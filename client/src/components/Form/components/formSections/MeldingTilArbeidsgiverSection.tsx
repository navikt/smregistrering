import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
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

const MeldingTilArbeidsgiverSection = ({
    section,
    setSchema,
    schema,
    errors,
    validate,
}: MeldingTilArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="9.1" underline={false}>
                <Checkbox
                    id="meldingTilArbeidsgiverInnspill"
                    disabled
                    checked={schema.meldingTilArbeidsgiverInnspill}
                    label="Andre innspill til arbeidsgiver"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            meldingTilArbeidsgiverInnspill: !state.meldingTilArbeidsgiverInnspill,
                        }))
                    }
                    feil={errors.meldingTilArbeidsgiverInnspill}
                />
                <br />
                <ExpandableField show={schema.meldingTilArbeidsgiverInnspill}>
                    <Textarea
                        id="meldingTilArbeidsgiverBeskriv"
                        disabled
                        maxLength={0}
                        value={schema.meldingTilArbeidsgiverBeskriv || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(state => ({
                                ...state,
                                meldingTilArbeidsgiverBeskriv: value,
                            }));
                            validate('meldingTilArbeidsgiverBeskriv', value);
                        }}
                        feil={schema.meldingTilArbeidsgiverBeskriv}
                        label={<Element>Andre innspill til arbeidsgiver</Element>}
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default MeldingTilArbeidsgiverSection;
