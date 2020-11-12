import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Input, Select } from 'nav-frontend-skjema';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import { HarArbeidsgiver } from '../../../../types/RegistrertSykmelding';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export type Arbeidsgiver = {
    harArbeidsgiver?: keyof typeof HarArbeidsgiver | null;
    arbeidsgiverNavn?: string | null;
    yrkesbetegnelse?: string | null;
    stillingsprosent?: number | null;
};

type ArbeidsgiverSectionProps = {
    section: Section;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
    schema: SchemaType;
};

const ArbeidsgiverSection = ({ section, setFormState, errors, schema }: ArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Row>
                <Select
                    id="harArbeidsgiver"
                    value={schema.harArbeidsgiver ? schema.harArbeidsgiver : undefined}
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
                    value={schema.arbeidsgiverNavn ? schema.arbeidsgiverNavn : undefined}
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
                    value={schema.yrkesbetegnelse ? schema.yrkesbetegnelse : undefined}
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
                    value={schema.stillingsprosent ? schema.stillingsprosent : undefined}
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
