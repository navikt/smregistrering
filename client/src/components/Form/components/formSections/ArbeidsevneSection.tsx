import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Arbeidsevne = {
    tilretteleggingArbeidsplassen?: boolean;
    tilretteleggingArbeidsplassBeskriv?: string;
    tiltakNav?: boolean;
    tiltakNavBeskriv?: string;
    innspillTilNAv?: boolean;
    innspillTilNavBeskriv?: string;
};

export type ArbeidsevneSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const ArbeidsevneSection = ({ section, setSchema, schema, errors, validate }: ArbeidsevneSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="7.1">
                <Checkbox
                    id="tilretteleggingArbeidsplassen"
                    checked={schema.tilretteleggingArbeidsplassen}
                    label="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                tilretteleggingArbeidsplassen: !state.tilretteleggingArbeidsplassen,
                            }),
                        )
                    }
                    feil={errors.tilretteleggingArbeidsplassen}
                />
                <br />
                <ExpandableField show={schema.tilretteleggingArbeidsplassen}>
                    <Textarea
                        id="tilretteleggArbeidsplassBeskriv"
                        maxLength={0}
                        value={schema.tilretteleggingArbeidsplassBeskriv || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => ({
                                    ...state,
                                    tilretteleggingArbeidsplassBeskriv: value,
                                }),
                            );
                            validate('tilretteleggingArbeidsplassBeskriv', value);
                        }}
                        label={<Element>Beskriv</Element>}
                        feil={errors.tilretteleggingArbeidsplassBeskriv}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="7.2">
                <Checkbox
                    id="tiltakNav"
                    checked={schema.tiltakNav}
                    label="Tiltak i regi av NAV"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                tiltakNav: !state.tiltakNav,
                            }),
                        )
                    }
                    feil={errors.tiltakNav}
                />
                <br />
                <ExpandableField show={schema.tiltakNav}>
                    <Textarea
                        id="tiltakNavBeskriv"
                        maxLength={0}
                        value={schema.tiltakNavBeskriv || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => ({
                                    ...state,
                                    tiltakNavBeskriv: value,
                                }),
                            );
                            validate('tiltakNavBeskriv', value);
                        }}
                        feil={errors.tiltakNavBeskriv}
                        label={<Element>Beskriv. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)</Element>}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="7.3" underline={false}>
                <Checkbox
                    id="innspillTilNAv"
                    checked={schema.innspillTilNAv}
                    label="Eventuelle andre innspill til NAV"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                innspillTilNAv: !state.innspillTilNAv,
                            }),
                        )
                    }
                    feil={errors.innspillTilNAv}
                />
                <br />
                <ExpandableField show={schema.innspillTilNAv}>
                    <Textarea
                        id="innspillTilNavBeskriv"
                        maxLength={0}
                        value={schema.innspillTilNavBeskriv || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => ({
                                    ...state,
                                    innspillTilNavBeskriv: value,
                                }),
                            );
                            validate('innspillTilNavBeskriv', value);
                        }}
                        label={<Element>Beskriv</Element>}
                        feil={errors.innspillTilNavBeskriv}
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default ArbeidsevneSection;
