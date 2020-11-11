import * as iotsPromise from 'io-ts-promise';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useEffect, useState } from 'react';
import { FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

import DatePicker from '../formComponents/DatePicker';
import FormLabel from '../formComponents/FormLabel';
import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import SykmelderInformation from '../formComponents/SykmelderInformation';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Sykmelder } from '../../../../types/Sykmelder';

export type Behandler = {
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

type BehandlerSectionProps = {
    section: Section;
    schema: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
};

const BehandlerSection = ({ section, setFormState, schema, errors }: BehandlerSectionProps) => {
    const [sykmelder, setSykmelder] = useState<Sykmelder | undefined | null>(undefined);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    // GET information about sykmelder on every schema.hpr change
    useEffect(() => {
        // Number must be in synch with validationFuncitons.hpr in validation.ts
        if (schema.hpr?.length && schema.hpr.length >= 7 && schema.hpr.length <= 9) {
            setIsloading(true);
            setSykmelder(null);
            setError(null);
            fetch(`/backend/api/v1/sykmelder/${schema.hpr}`, { credentials: 'include' })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Fant ikke behandler med hprNummer: ' + schema.hpr);
                    }
                })
                .then((jsonResponse) => {
                    return iotsPromise.decode(Sykmelder, jsonResponse);
                })
                .then((sykmelder) => {
                    setSykmelder(sykmelder);
                })
                .catch((error) => {
                    console.log(error);
                    setSykmelder(null);
                    setError(error);
                })
                .finally(() => {
                    setIsloading(false);
                });
        } else {
            setSykmelder(null);
        }
    }, [schema.hpr]);

    return (
        <SectionContainer section={section}>
            <DatePicker
                id="behandletDato"
                label="12.1 Behandletdato"
                value={schema.behandletDato ? schema.behandletDato : undefined}
                onChange={(newDates) => {
                    setFormState((formState) => ({ ...formState, behandletDato: newDates }))
                }}
                feil={errors.get('behandletDato')?.feilmelding}
            />

            <Row>
                <Input
                    id="hpr"
                    value={schema.hpr ? schema.hpr : undefined}
                    disabled={isLoading}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, hpr: value }))
                    }}
                    feil={errors.get('hpr')?.feilmelding || error?.message}
                    label={
                        <FormLabel
                            label="12.4 HPR-nummer"
                            helpText="HPR-nummer skal være et tall på mellom 7 og 9 siffer"
                        />
                    }
                />
                <Input
                    id="sykmelderTelefon"
                    value={schema.sykmelderTelefon ? schema.sykmelderTelefon : undefined}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, sykmelderTelefon: value }))
                    }}
                    feil={errors.get('sykmelderTelefon')?.feilmelding}
                    label={<FormLabel label="12.5 Telefon" />}
                />
            </Row>

            {sykmelder ? <SykmelderInformation sykmelder={sykmelder} /> : null}
            {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Normaltekst style={{ marginRight: '1rem' }}>Henter informasjon om behandler</Normaltekst>
                    <NavFrontendSpinner />
                </div>
            ) : null}
        </SectionContainer>
    );
};

export default BehandlerSection;
