import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import DatePicker from '../formComponents/DatePicker';
import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export type Friskmelding = {
    arbeidsfoerEtterPeriode: boolean;
    hensynArbeidsplassen?: string | null;
    erIArbeid?: boolean;
    erIkkeIArbeid?: boolean;
    egetArbeidPaSikt: boolean;
    annetArbeidPaSikt: boolean;
    arbeidFOM?: Date | null;
    vurderingsDatoIArbeid?: Date | null;
    arbeidsforPaSikt: boolean;
    arbeidsforFOM?: Date | null;
    vurderingsDatoUtenArbeid?: Date | null;
};

type FriskmeldingSectionProps = {
    section: Section;
    schema: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
};

const FriskmeldingSection = ({ section, setFormState, schema, errors }: FriskmeldingSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="5.1" underline={true}>
                <Checkbox
                    id="arbeidsfoerEtterPeriode"
                    checked={schema.arbeidsfoerEtterPeriode}
                    label="Pasienten er 100 prosent arbeidsfør etter denne perioden"
                    onChange={() =>
                        setFormState((formState) => ({
                            ...formState,
                            arbeidsfoerEtterPeriode: !formState.arbeidsfoerEtterPeriode,
                            hensynArbeidsplassen: undefined,
                        }))
                    }
                    feil={errors.get('arbeidsfoerEtterPeriode')?.feilmelding}
                />
                <br />
                <ExpandableField show={schema.arbeidsfoerEtterPeriode}>
                    <Textarea
                        id="hensynArbeidsplassen"
                        maxLength={0}
                        value={schema.hensynArbeidsplassen || ''}
                        onChange={({ target: { value } }) => {
                            setFormState((formState) => ({ ...formState, hensynArbeidsplassen: value }))
                        }}
                        feil={errors.get('hensynArbeidsplassen')?.feilmelding}
                        label={<Element>5.1.1 Beskrive eventuelle hensyn som må tas på arbeidsplassen</Element>}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="5.2" underline={true}>
                <Checkbox
                    id="erIArbeid"
                    checked={schema.erIArbeid}
                    label="Pasienten har arbeidsgiver"
                    onChange={() => {
                        setFormState((formState) => ({
                            ...formState,
                            erIArbeid: !formState.erIArbeid,
                            egetArbeidPaSikt: false,
                            arbeidFOM: undefined,
                            annetArbeidPaSikt: false,
                            vurderingsDatoIArbeid: undefined,
                        }))
                    }}
                    feil={errors.get('erIArbeid')?.feilmelding}
                />
                <br />

                <ExpandableField show={schema.erIArbeid}>
                    <Subsection sectionIdentifier="5.2.1" underline={false}>
                        <Checkbox
                            id="egetArbeidPaSikt"
                            checked={schema.egetArbeidPaSikt}
                            label="Pasienten kan på sikt komme tilbake til samme arbeidsgiver"
                            onChange={() =>
                                setFormState((formState) => ({
                                    ...formState,
                                    egetArbeidPaSikt: !formState.egetArbeidPaSikt,
                                    arbeidFOM: undefined,
                                }))
                            }
                            feil={errors.get('egetArbeidPaSikt')?.feilmelding}
                        />
                        <br />
                        <ExpandableField show={schema.egetArbeidPaSikt}>
                            <DatePicker
                                id="arbeidFOM"
                                label="Anslå når dette kan skje"
                                value={schema.arbeidFOM ? schema.arbeidFOM : undefined}
                                onChange={(newDate) => {
                                    setFormState((formState) => ({ ...formState, arbeidFOM: newDate }))
                                }}
                                feil={errors.get('arbeidFOM')?.feilmelding}
                            />
                        </ExpandableField>
                    </Subsection>

                    <Subsection sectionIdentifier="5.2.2" underline={false}>
                        <Checkbox
                            id="annetArbeidPaSikt"
                            checked={schema.annetArbeidPaSikt}
                            label="Pasienten kan på sikt komme i arbeid hos annen arbeidsgiver"
                            onChange={() =>
                                setFormState((formState) => ({ ...formState, annetArbeidPaSikt: !formState.annetArbeidPaSikt }))
                            }
                            feil={errors.get('annetArbeidPaSikt')?.feilmelding}
                        />
                    </Subsection>
                    <br />
                    <DatePicker
                        id="vurderingsDatoIArbeid"
                        label="5.2.3 Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?"
                        value={schema.vurderingsDatoIArbeid ? schema.vurderingsDatoIArbeid : undefined}
                        onChange={(newDate) => {
                            setFormState((formState) => ({ ...formState, vurderingsDatoIArbeid: newDate }))
                        }}
                        feil={errors.get('vurderingsDatoIArbeid')?.feilmelding}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="5.3" underline={false}>
                <Checkbox
                    id="erIkkeIArbeid"
                    checked={schema.erIkkeIArbeid}
                    label="Pasienten har ikke arbeidsgiver"
                    onChange={() => {
                        setFormState((formState) => ({
                            ...formState,
                            erIkkeIArbeid: !formState.erIkkeIArbeid,
                            arbeidsforPaSikt: false,
                            arbeidsforFOM: undefined,
                            vurderingsDatoUtenArbeid: undefined,
                        }))
                    }}
                    feil={errors.get('erIkkeIArbeid')?.feilmelding}
                />
                <br />

                <ExpandableField show={schema.erIkkeIArbeid}>
                    <Subsection sectionIdentifier="5.3.1" underline={false}>
                        <Checkbox
                            id="arbeidsforPaSikt"
                            checked={schema.arbeidsforPaSikt}
                            label="Pasienten kan komme tilbake i arbeid på sikt"
                            onChange={() =>
                                setFormState((formState) => ({
                                    ...formState,
                                    arbeidsforPaSikt: !formState.arbeidsforPaSikt,
                                    arbeidsforFOM: undefined,
                                }))
                            }
                            feil={errors.get('arbeidsforPaSikt')?.feilmelding}
                        />
                        <br />
                        <ExpandableField show={schema.arbeidsforPaSikt}>
                            <DatePicker
                                id="arbeidsforFOM"
                                label="Anslå når dette kan skje"
                                value={schema.arbeidsforFOM ? schema.arbeidsforFOM : undefined}
                                onChange={(newDate) => {
                                    setFormState((formState) => ({ ...formState, arbeidsforFOM: newDate }))
                                }}
                                feil={errors.get('arbeidsforFOM')?.feilmelding}
                            />
                        </ExpandableField>
                    </Subsection>
                    <DatePicker
                        id="vurderingsDatoUtenArbeid"
                        label="5.3.2 Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?"
                        value={schema.vurderingsDatoUtenArbeid ? schema.vurderingsDatoUtenArbeid : undefined}
                        onChange={(newDate) => {
                            setFormState((formState) => ({ ...formState, vurderingsDatoUtenArbeid: newDate }))
                        }}
                        feil={errors.get('vurderingsDatoUtenArbeid')?.feilmelding}
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default FriskmeldingSection;
