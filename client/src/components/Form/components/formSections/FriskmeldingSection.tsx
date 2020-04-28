import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType, ErrorSchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Friskmelding = {
    arbeidsfoerEtterPeriode?: boolean;
    hensynPaArbeidsplassen?: string;
};

type FriskmeldingSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const FriskmeldingSection = ({ section, setSchema, schema, errors, validate }: FriskmeldingSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="5.1" underline={false}>
                <Checkbox
                    checked={schema.arbeidsfoerEtterPeriode}
                    label="Pasienten er 100 prosent arbeidsfør etter denne perioden"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            arbeidsfoerEtterPeriode: !state.arbeidsfoerEtterPeriode,
                        }))
                    }
                />
                <br />
                {schema.arbeidsfoerEtterPeriode && (
                    <Textarea
                        maxLength={0}
                        value={schema.hensynPaArbeidsplassen || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                hensynPaArbeidsplassen: value,
                            }))
                        }
                        label={<Element>5.1.1 Beskrive eventuelle hensyn som må tas på arbeidsplassen</Element>}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default FriskmeldingSection;
