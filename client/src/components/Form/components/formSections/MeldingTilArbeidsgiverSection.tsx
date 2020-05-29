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
            <Textarea
                id="meldingTilArbeidsgiverBeskriv"
                maxLength={0}
                value={schema.meldingTilArbeidsgiverBeskriv || ''}
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        meldingTilArbeidsgiverBeskriv: value,
                    }));
                    validate('meldingTilArbeidsgiverBeskriv', value);
                }}
                feil={errors.meldingTilArbeidsgiverBeskriv}
                label={<Element>9.1 Andre innspill til arbeidsgiver</Element>}
            />
        </SectionContainer>
    );
};

export default MeldingTilArbeidsgiverSection;
