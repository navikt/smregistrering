import React, { useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import DatePicker from '../formComponents/DatePicker';
import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Sykmelder } from '../../../../types/Sykmelder';
import { Validate } from '../../validation';

export type Bekreftelse = {
    behandletDato?: Date | null;
    sykmeldersFornavn?: string | null;
    sykmeldersEtternavn?: string | null;
    sykmelderFnr?: string | null;
    aktoerId?: string | null;
    hpr?: string | null;
    sykmelderTelefon?: string | null;
    sykmelderGate?: string | null;
    sykmelderPostnummer?: number | null;
    sykmelderKommune?: string | null;
    sykmelderPostboks?: string | null;
    sykmelderLand?: string | null;
};

type BekreftelseSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const BekreftelseSection = ({ section, setSchema, schema, errors, validate }: BekreftelseSectionProps) => {
    const [sykmelder, setSykmelder] = useState<Sykmelder | undefined | null>(undefined);

    useEffect(() => {
        if (schema.hpr) {
            hentSykmelder(schema.hpr);
        }
    }, [schema.hpr]);

    const hentSykmelder = (hpr: string) => {
        fetch(`/backend/api/v1/sykmelder/${hpr}`, { credentials: 'include' })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 500) {
                    setSykmelder(null);
                }
            })
            .then((jsonResponse: Sykmelder) => {
                console.log(jsonResponse);
                setSykmelder(jsonResponse);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <SectionContainer section={section}>
            <DatePicker
                id="behandletDato"
                label="12.1 Behandletdato"
                value={schema.behandletDato ? schema.behandletDato : undefined}
                onChange={(newDates) => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = { ...state, behandletDato: newDates };
                            validate('behandletDato', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.behandletDato}
            />

            <Input
                id="hpr"
                className="form-margin-bottom half"
                value={schema.hpr ? schema.hpr : undefined}
                onChange={({ target: { value } }) => {
                    hentSykmelder(value);
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                hpr: value,
                            };
                            validate('hpr', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.hpr}
                label={<Element>12.4 HPR-nummer</Element>}
            />

            <p>{JSON.stringify(sykmelder)}</p>

            <Input
                id="sykmelderTelefon"
                className="form-margin-bottom half"
                value={schema.sykmelderTelefon ? schema.sykmelderTelefon : undefined}
                onChange={({ target: { value } }) => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                sykmelderTelefon: value,
                            };
                            validate('sykmelderTelefon', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.sykmelderTelefon}
                label={<Element>12.5 Telefon</Element>}
            />
        </SectionContainer>
    );
};

export default BekreftelseSection;
