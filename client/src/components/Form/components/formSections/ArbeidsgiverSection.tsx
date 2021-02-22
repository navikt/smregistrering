import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Input, Select } from 'nav-frontend-skjema';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import { FormType } from '../../Form';
import { HarArbeidsgiver } from '../../../../types/RegistrertSykmelding';
import { Section } from '../../../../types/Section';

export type Arbeidsgiver = {
    harArbeidsgiver?: keyof typeof HarArbeidsgiver | null;
    arbeidsgiverNavn?: string | null;
    yrkesbetegnelse?: string | null;
    stillingsprosent?: number | null;
};

type ArbeidsgiverSectionProps = {
    section: Section;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
    formState: FormType;
};

const ArbeidsgiverSection = ({ section, setFormState, errors, formState }: ArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Row>
                <Select
                    id="harArbeidsgiver"
                    value={formState.harArbeidsgiver ? formState.harArbeidsgiver : undefined}
                    onChange={({ target: { value } }) => {
                        if (value === '0') {
                            setFormState((formState) => ({ ...formState, harArbeidsgiver: undefined }));
                        } else {
                            setFormState((formState) => ({
                                ...formState,
                                harArbeidsgiver: value as keyof typeof HarArbeidsgiver,
                            }));
                        }
                    }}
                    className="form-margin-bottom"
                    label={<Element>2.1 Pasienten har</Element>}
                    feil={errors.get('harArbeidsgiver')?.feilmelding}
                >
                    <option value="0">Velg</option>
                    {Object.entries(HarArbeidsgiver).map(([key, value]) => {
                        return (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        );
                    })}
                </Select>
                <Input
                    id="arbeidsgiverNavn"
                    className="form-margin-bottom"
                    type="text"
                    value={formState.arbeidsgiverNavn ? formState.arbeidsgiverNavn : undefined}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, arbeidsgiverNavn: value }));
                    }}
                    label={<Element>2.2 Arbeidsgiver for denne sykmeldingen</Element>}
                    feil={errors.get('arbeidsgiverNavn')?.feilmelding}
                />
            </Row>
            <Row>
                <Input
                    id="yrkesbetegnelse"
                    className="form-margin-bottom"
                    type="text"
                    value={formState.yrkesbetegnelse ? formState.yrkesbetegnelse : undefined}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, yrkesbetegnelse: value }));
                    }}
                    label={<Element>2.3 Yrke/stilling for dette arbeidsforholdet</Element>}
                    feil={errors.get('yrkesbetegnelse')?.feilmelding}
                />
                <Input
                    id="stillingsprosent"
                    className="form-margin-bottom"
                    type="number"
                    value={formState.stillingsprosent ? formState.stillingsprosent : undefined}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, stillingsprosent: Number(value) }));
                    }}
                    label={<Element>2.4 Stillingsprosent</Element>}
                    feil={errors.get('stillingsprosent')?.feilmelding}
                />
            </Row>
        </SectionContainer>
    );
};

export default ArbeidsgiverSection;
