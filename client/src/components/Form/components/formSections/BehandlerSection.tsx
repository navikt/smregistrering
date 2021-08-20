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
import { FormType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Sykmelder } from '../../../../types/Sykmelder';
import logger from '../../../../utils/logger';

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
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
};

const BehandlerSection = ({ section, setFormState, formState, errors }: BehandlerSectionProps) => {
    const [sykmelder, setSykmelder] = useState<Sykmelder | undefined | null>(undefined);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const [hprTouched, setHprTouched] = useState<boolean>(false);

    // GET information about sykmelder on every formState.hpr change
    useEffect(() => {
        // Number must be in synch with validationFuncitons.hpr in validation.ts
        if (formState.hpr?.length && formState.hpr.length >= 7 && formState.hpr.length <= 9) {
            setIsloading(true);
            setSykmelder(null);
            setError(null);
            fetch(`/backend/api/v1/sykmelder/${formState.hpr}`, { credentials: 'include' })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Fant ikke behandler med hprNummer: ' + formState.hpr);
                    }
                })
                .then((jsonResponse) => {
                    return iotsPromise.decode(Sykmelder, jsonResponse);
                })
                .then((sykmelder) => {
                    setSykmelder(sykmelder);
                })
                .catch((error) => {
                    // Sanitizing the error
                    if (iotsPromise.isDecodeError(error)) {
                        logger.error(`Data mottatt for /sykmelder/${formState.hpr} er er feil format`);
                    } else {
                        logger.info(error);
                    }
                    setSykmelder(null);
                    setError(error);
                })
                .finally(() => {
                    setIsloading(false);
                    if (hprTouched) {
                        document.getElementById('hpr')?.focus();
                    }
                });
        } else {
            setSykmelder(null);
        }
    }, [formState.hpr, hprTouched]);

    return (
        <SectionContainer section={section}>
            <DatePicker
                id="behandletDato"
                label="12.1 Behandletdato"
                value={formState.behandletDato ? formState.behandletDato : undefined}
                onChange={(newDates) => {
                    setFormState((formState) => ({ ...formState, behandletDato: newDates }));
                }}
                feil={errors.get('behandletDato')?.feilmelding}
            />

            <Row>
                <Input
                    id="hpr"
                    value={formState.hpr ? formState.hpr : undefined}
                    disabled={isLoading}
                    onChange={({ target: { value } }) => {
                        if (!hprTouched) {
                            setHprTouched(true);
                        }
                        setFormState((formState) => ({ ...formState, hpr: value }));
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
                    value={formState.sykmelderTelefon ? formState.sykmelderTelefon : undefined}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, sykmelderTelefon: value }));
                    }}
                    feil={errors.get('sykmelderTelefon')?.feilmelding}
                    label={<FormLabel label="12.5 Telefon" />}
                />
            </Row>

            {sykmelder ? (
                <SykmelderInformation
                    sykmelder={sykmelder}
                    sykmeldersFornavn={formState.sykmeldersFornavn}
                    sykmeldersEtternavn={formState.sykmeldersEtternavn}
                />
            ) : null}
            {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Normaltekst style={{ marginRight: '1rem' }}>Henter informasjon om behandleren</Normaltekst>
                    <NavFrontendSpinner />
                </div>
            ) : null}
        </SectionContainer>
    );
};

export default BehandlerSection;
