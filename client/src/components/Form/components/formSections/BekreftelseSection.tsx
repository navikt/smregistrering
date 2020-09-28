import * as iotsPromise from 'io-ts-promise';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useEffect, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

import DatePicker from '../formComponents/DatePicker';
import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import SykmelderInformation from '../formComponents/SykmelderInformation';
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
    const [isLoading, setIsloading] = useState<boolean>(false);

    useEffect(() => {
        // Number must be in synch with validationFuncitons.hpr in validation.ts
        if (schema.hpr?.length === 7) {
            hentSykmelder(schema.hpr);
        } else {
            setSykmelder(null);
        }
    }, [schema.hpr]);

    const hentSykmelder = (hpr: string) => {
        setIsloading(true);
        fetch(`/backend/api/v1/sykmelder/${hpr}`, { credentials: 'include' })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 500) {
                    setSykmelder(null);
                }
            })
            .then((jsonResponse) => {
                return iotsPromise.decode(Sykmelder, jsonResponse);
            })
            .then((sykmelder) => {
                setSykmelder(sykmelder);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setIsloading(false));
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

            <Row>
                <Input
                    id="hpr"
                    value={schema.hpr ? schema.hpr : undefined}
                    disabled={isLoading}
                    onChange={({ target: { value } }) => {
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
                    label="12.4 HPR-nummer"
                />
                <Input
                    id="sykmelderTelefon"
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
                    label="12.5 Telefon"
                />
            </Row>

            {sykmelder ? <SykmelderInformation sykmelder={sykmelder} /> : null}
            {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Normaltekst style={{ marginRight: '1rem' }}>Henter informasjon om sykmelder</Normaltekst>
                    <NavFrontendSpinner />
                </div>
            ) : null}
        </SectionContainer>
    );
};

export default BekreftelseSection;
