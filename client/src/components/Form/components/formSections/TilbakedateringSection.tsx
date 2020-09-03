import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';

import DatePicker from '../formComponents/DatePicker';
import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Tilbakedatering = {
    erTilbakedatert: boolean;
    kontaktDato?: Date | null;
    kunneIkkeIvaretaEgneInteresser: boolean;
    begrunnelseIkkeKontakt?: string | null;
};

type TilbakedateringSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const TilbakedateringSection = ({ section, setSchema, schema, errors, validate }: TilbakedateringSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="11.1" underline={false}>
                <Checkbox
                    id="erTilbakedatert"
                    checked={schema.erTilbakedatert}
                    label="Er sykmelding tilbakedatert?"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    erTilbakedatert: !state.erTilbakedatert,
                                    kontaktDato: undefined,
                                };
                                validate('erTilbakedatert', updatedSchema);
                                validate('kontaktDato', updatedSchema);
                                return updatedSchema;
                            },
                        )
                    }
                    feil={errors.erTilbakedatert}
                />
                <br />
                <ExpandableField show={schema.erTilbakedatert}>
                    <DatePicker
                        id="kontaktDato"
                        label="Oppgi dato for dokumenterbar kontakt med pasienten"
                        value={schema.kontaktDato ? schema.kontaktDato : undefined}
                        onChange={(newDate) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        kontaktDato: newDate,
                                    };
                                    validate('kontaktDato', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="11.2" underline={false}>
                <Checkbox
                    id="kunneIkkeIvaretaEgneInteresser"
                    checked={schema.kunneIkkeIvaretaEgneInteresser}
                    label="Pasienten har ikke kunnet ivareta egne interesser"
                    onChange={() => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    kunneIkkeIvaretaEgneInteresser: !state.kunneIkkeIvaretaEgneInteresser,
                                    begrunnelseIkkeKontakt: undefined,
                                };
                                validate('kunneIkkeIvaretaEgneInteresser', updatedSchema);
                                validate('begrunnelseIkkeKontakt', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.kunneIkkeIvaretaEgneInteresser}
                />
                <br />
                <ExpandableField show={schema.kunneIkkeIvaretaEgneInteresser}>
                    <Textarea
                        id="begrunnelseIkkeKontakt"
                        maxLength={0}
                        value={schema.begrunnelseIkkeKontakt || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        begrunnelseIkkeKontakt: value,
                                    };
                                    validate('begrunnelseIkkeKontakt', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.begrunnelseIkkeKontakt}
                        label="Begrunn"
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default TilbakedateringSection;
