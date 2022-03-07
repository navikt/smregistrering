import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import usePasientOpplysninger from '../../formUtils/usePasientopplysninger';
import { FormType } from '../../Form';
import { Section } from '../../../../types/Section';

export type Pasientopplysninger = {
    pasientFnr: string | null;
};

type PasientopplysningerProps = {
    section: Section;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
    formState: FormType;
    isFerdigstilt: Boolean;
};

const PasientopplysningerSection = ({
    section,
    setFormState,
    errors,
    formState,
    isFerdigstilt,
}: PasientopplysningerProps) => {
    const { pasientNavn, isLoading, errorMessage, fnrRef, fnrTouched, setFnrTouched } =
        usePasientOpplysninger(formState);

    return (
        <SectionContainer section={section}>
            <Row>
                <Input
                    id="pasientFnr"
                    inputRef={fnrRef}
                    disabled={isLoading || isFerdigstilt}
                    value={formState.pasientFnr ?? ''}
                    onChange={({ target: { value } }) => {
                        if (!fnrTouched) {
                            setFnrTouched(true);
                        }
                        setFormState((formState) => {
                            return { ...formState, pasientFnr: value };
                        });
                    }}
                    label="1.2 Fødselsnummer (11 siffer)"
                    feil={errors.get('pasientFnr')?.feilmelding || errorMessage}
                />
                <div>
                    {pasientNavn ? (
                        <div id="pasientFnr--name">
                            <Element tag="h4" style={{ marginBottom: '1rem' }}>
                                Navn:
                            </Element>
                            <Normaltekst>
                                {pasientNavn.fornavn} {pasientNavn?.mellomnavn} {pasientNavn.etternavn}
                            </Normaltekst>
                        </div>
                    ) : null}

                    {isLoading ? (
                        <div id="pasientFnr--loading" style={{ display: 'flex', alignItems: 'center' }}>
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
