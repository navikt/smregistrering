import * as iotsPromise from 'io-ts-promise';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useEffect, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import { FormType } from '../../Form';
import { PasientNavn } from '../../../../types/Pasient';
import { Section } from '../../../../types/Section';

export type Pasientopplysninger = {
    pasientFnr?: string | null;
};

type PasientopplysningerProps = {
    section: Section;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
    formState: FormType;
};

const PasientopplysningerSection = ({ section, setFormState, errors, formState }: PasientopplysningerProps) => {
    const [pasientNavn, setPasientNavn] = useState<PasientNavn | undefined | null>(undefined);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    // GET information about sykmelder on every formState.hpr change
    useEffect(() => {
        // Number must be in synch with validationFuncitons.hpr in validation.ts
        if (formState.pasientFnr?.length && formState.pasientFnr.length === 11) {
            setIsloading(true);
            setPasientNavn(null);
            setError(null);
            fetch(`/backend/api/v1/pasient/${formState.pasientFnr}`, { credentials: 'include' })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Fant ikke pasient med pasientFnr: ' + formState.pasientFnr);
                    }
                })
                .then((jsonResponse) => {
                    return iotsPromise.decode(PasientNavn, jsonResponse);
                })
                .then((sykmelder) => {
                    setPasientNavn(sykmelder);
                })
                .catch((error) => {
                    console.log(error);
                    setPasientNavn(null);
                    setError(error);
                })
                .finally(() => {
                    setIsloading(false);
                });
        } else {
            setPasientNavn(null);
        }
    }, [formState.pasientFnr]);

    return (
        <SectionContainer section={section}>
            <Row>
                <Input
                    id="pasientFnr"
                    disabled={isLoading}
                    value={formState.pasientFnr ? formState.pasientFnr : undefined}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => {
                            return { ...formState, pasientFnr: value };
                        });
                    }}
                    label="1.2 Fødselsnummer (11 siffer)"
                    feil={errors.get('pasientFnr')?.feilmelding || error?.message}
                />
                <div>
                    {pasientNavn ? (
                        <div>
                            <Element tag="h4" style={{ marginBottom: '1rem' }}>
                                Navn:
                            </Element>
                            <Normaltekst>
                                {pasientNavn.fornavn} {pasientNavn?.mellomnavn} {pasientNavn.etternavn}
                            </Normaltekst>
                        </div>
                    ) : null}

                    {isLoading ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Normaltekst style={{ marginRight: '1rem' }}>Henter informasjon om pasient</Normaltekst>
                            <NavFrontendSpinner />
                        </div>
                    ) : null}
                </div>
            </Row>
        </SectionContainer>
    );
};

export default PasientopplysningerSection;
