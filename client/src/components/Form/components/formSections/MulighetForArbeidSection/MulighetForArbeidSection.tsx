import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Input, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ArbeidsrelatertArsak from './ArbeidsrelatertArsak';
import ExpandableField from '../../formComponents/ExpandableField';
import MedisinskArsak from './MedisinskArsak';
import RangePicker from '../../formComponents/RangePicker';
import SectionContainer from '../../SectionContainer';
import Subsection from '../../formComponents/Subsection';
import { ArbeidsrelatertArsakType, MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { SchemaType } from '../../../Form';
import { Section } from '../../../../../types/Section';

export type MulighetForArbeid = {
    // For validering av minimum én periode valgt
    mulighetForArbeid?: boolean;
    // Perioder for avventende sykmelding
    avventendeSykmelding: boolean;
    avventendePeriode?: Date[];
    avventendeInnspillTilArbeidsgiver?: string;
    // Perioder for gradert sykmelding
    gradertSykmelding: boolean;
    gradertPeriode?: Date[];
    gradertGrad?: number;
    gradertReisetilskudd: boolean;
    // Perioder for full sykmelding
    aktivitetIkkeMuligSykmelding: boolean;
    aktivitetIkkeMuligPeriode?: Date[];
    aktivitetIkkeMuligMedisinskArsak?: boolean;
    aktivitetIkkeMuligMedisinskArsakType?: (keyof typeof MedisinskArsakType)[];
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string | null;
    aktivitetIkkeMuligArbeidsrelatertArsak?: boolean;
    aktivitetIkkeMuligArbeidsrelatertArsakType?: (keyof typeof ArbeidsrelatertArsakType)[];
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string | null;
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerSykmelding: boolean;
    behandlingsdagerPeriode?: Date[];
    behandlingsdagerAntall?: number;
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddSykmelding: boolean;
    reisetilskuddPeriode?: Date[];
};

type MulighetForArbeidSectionProps = {
    section: Section;
    formState: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
};

const MulighetForArbeidSection = ({ section, setFormState, formState, errors }: MulighetForArbeidSectionProps) => {
    return (
        <SectionContainer section={section} sectionError={errors.get('mulighetForArbeid')?.feilmelding}>
            <Subsection sectionIdentifier="4.1">
                <Checkbox
                    id="avventendeSykmelding"
                    checked={formState.avventendeSykmelding}
                    label="Pasienten kan benytte avventende sykmelding"
                    onChange={() => {
                        setFormState((formState) => ({
                            ...formState,

                            avventendeSykmelding: !formState.avventendeSykmelding,
                            avventendePeriode: undefined,
                            avventendeInnspillTilArbeidsgiver: undefined,
                        }));
                    }}
                    feil={errors.get('avventendeSykmelding')?.feilmelding}
                />
                <br />
                <ExpandableField show={formState.avventendeSykmelding}>
                    <>
                        <RangePicker
                            id="avventendePeriode"
                            labelFrom="4.1.1 f.o.m."
                            labelTo="4.1.2 t.o.m."
                            value={formState.avventendePeriode || []}
                            onChange={(newDates) => {
                                setFormState((formState) => ({ ...formState, avventendePeriode: newDates }));
                            }}
                            feil={errors.get('avventendePeriode')?.feilmelding}
                        />
                        <Textarea
                            id="avventendeInnspillTilArbeidsgiver"
                            maxLength={0}
                            value={formState.avventendeInnspillTilArbeidsgiver || ''}
                            onChange={({ target: { value } }) => {
                                setFormState((formState) => ({
                                    ...formState,
                                    avventendeInnspillTilArbeidsgiver: value,
                                }));
                            }}
                            feil={errors.get('avventendeInnspillTilArbeidsgiver')?.feilmelding}
                            label={<Element>4.1.3 Innspill til arbeidsgiver om tilrettelegging</Element>}
                        />
                    </>
                </ExpandableField>
            </Subsection>
            <Subsection sectionIdentifier="4.2">
                <Checkbox
                    id="gradertSykmelding"
                    checked={formState.gradertSykmelding}
                    label="Pasienten kan være delvis i arbeid (gradert sykmelding)"
                    onChange={() => {
                        setFormState((formState) => ({
                            ...formState,
                            gradertSykmelding: !formState.gradertSykmelding,
                            gradertPeriode: undefined,
                            gradertGrad: undefined,
                        }));
                    }}
                    feil={errors.get('gradertSykmelding')?.feilmelding}
                />
                <br />
                <ExpandableField show={formState.gradertSykmelding}>
                    <>
                        <RangePicker
                            id="gradertPeriode"
                            labelFrom="4.2.1 f.o.m."
                            labelTo="4.2.2 t.o.m."
                            value={formState.gradertPeriode || []}
                            onChange={(newDates) => {
                                setFormState((formState) => ({ ...formState, gradertPeriode: newDates }));
                            }}
                            feil={errors.get('gradertPeriode')?.feilmelding}
                        />
                        <Input
                            id="gradertGrad"
                            className="form-margin-bottom half"
                            type="number"
                            value={formState.gradertGrad}
                            onChange={({ target: { value } }) => {
                                setFormState((formState) => ({ ...formState, gradertGrad: parseInt(value) }));
                            }}
                            feil={errors.get('gradertGrad')?.feilmelding}
                            label="4.2.3 Oppgi grad for sykmelding"
                        />
                    </>
                </ExpandableField>
                <Element className="form-label">4.2.4</Element>
                <Checkbox
                    id="gradertReisetilskudd"
                    checked={formState.gradertReisetilskudd}
                    label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                    onChange={() => {
                        setFormState((formState) => ({
                            ...formState,
                            gradertReisetilskudd: !formState.gradertReisetilskudd,
                        }));
                    }}
                    feil={errors.get('gradertReisetilskudd')?.feilmelding}
                />
            </Subsection>

            <Subsection sectionIdentifier="4.3">
                <Checkbox
                    id="aktivitetIkkeMuligSykmelding"
                    checked={formState.aktivitetIkkeMuligSykmelding}
                    label="Pasienten kan ikke være i arbeid (100 prosent sykmelding)"
                    onChange={() => {
                        setFormState((formState) => ({
                            ...formState,
                            aktivitetIkkeMuligSykmelding: !formState.aktivitetIkkeMuligSykmelding,
                            aktivitetIkkeMuligPeriode: undefined,
                            aktivitetIkkeMuligMedisinskArsak: undefined,
                            aktivitetIkkeMuligMedisinskArsakType: undefined,
                            aktivitetIkkeMuligMedisinskArsakBeskrivelse: undefined,
                            aktivitetIkkeMuligArbeidsrelatertArsak: undefined,
                            aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                            aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: undefined,
                        }));
                    }}
                    feil={errors.get('aktivitetIkkeMuligSykmelding')}
                />
                <br />
                <ExpandableField show={formState.aktivitetIkkeMuligSykmelding}>
                    <>
                        <RangePicker
                            id="aktivitetIkkeMuligPeriode"
                            labelFrom="4.3.1 f.o.m."
                            labelTo="4.3.2 t.o.m."
                            value={formState.aktivitetIkkeMuligPeriode || []}
                            onChange={(newDates) => {
                                setFormState((formState) => ({ ...formState, aktivitetIkkeMuligPeriode: newDates }));
                            }}
                            feil={errors.get('aktivitetIkkeMuligPeriode')?.feilmelding}
                        />
                        <Element className="form-label">4.3.3</Element>
                        <Checkbox
                            id="aktivitetIkkeMuligMedisinskArsak"
                            className="form-margin-bottom"
                            checked={formState.aktivitetIkkeMuligMedisinskArsak}
                            label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                            onChange={() =>
                                setFormState((formState) => ({
                                    ...formState,
                                    aktivitetIkkeMuligMedisinskArsak: !formState.aktivitetIkkeMuligMedisinskArsak,
                                    aktivitetIkkeMuligMedisinskArsakType: undefined,
                                    aktivitetIkkeMuligMedisinskArsakBeskrivelse: undefined,
                                }))
                            }
                            feil={errors.get('aktivitetIkkeMuligMedisinskArsak')?.feilmelding}
                        />
                        <ExpandableField show={formState.aktivitetIkkeMuligMedisinskArsak}>
                            <>
                                <MedisinskArsak formState={formState} setFormState={setFormState} errors={errors} />
                                <Input
                                    id="aktivitetIkkeMuligMedisinskArsakBeskrivelse"
                                    className="form-margin-bottom"
                                    value={
                                        formState.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                            ? formState.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                            : undefined
                                    }
                                    type="text"
                                    onChange={({ target: { value } }) => {
                                        setFormState((formState) => ({
                                            ...formState,
                                            aktivitetIkkeMuligMedisinskArsakBeskrivelse: value,
                                        }));
                                    }}
                                    label={<Element>Beskrivelse</Element>}
                                    feil={errors.get('aktivitetIkkeMuligMedisinskArsakBeskrivelse')?.feilmelding}
                                />
                            </>
                        </ExpandableField>
                        <Element className="form-label">4.3.4</Element>
                        <Checkbox
                            id="aktivitetIkkeMuligArbeidsrelatertArsak"
                            className="form-margin-bottom"
                            checked={formState.aktivitetIkkeMuligArbeidsrelatertArsak}
                            label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                            onChange={() =>
                                setFormState((formState) => ({
                                    ...formState,
                                    aktivitetIkkeMuligArbeidsrelatertArsak: !formState.aktivitetIkkeMuligArbeidsrelatertArsak,
                                    aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                                    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: undefined,
                                }))
                            }
                            feil={errors.get('aktivitetIkkeMuligArbeidsrelatertArsak')?.feilmelding}
                        />
                        <ExpandableField show={formState.aktivitetIkkeMuligArbeidsrelatertArsak}>
                            <>
                                <ArbeidsrelatertArsak formState={formState} setFormState={setFormState} errors={errors} />
                                <Input
                                    id="aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse"
                                    className="form-margin-bottom"
                                    value={
                                        formState.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                            ? formState.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                            : undefined
                                    }
                                    type="text"
                                    onChange={({ target: { value } }) => {
                                        setFormState((formState) => ({
                                            ...formState,
                                            aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: value,
                                        }));
                                    }}
                                    label={<Element>Beskrivelse</Element>}
                                    feil={errors.get('aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse')?.feilmelding}
                                />
                            </>
                        </ExpandableField>
                    </>
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="4.4">
                <Checkbox
                    id="behandlingsdagerSykmelding"
                    checked={formState.behandlingsdagerSykmelding}
                    label="Pasienten kan ikke være i arbeid på behandlingsdager"
                    onChange={() => {
                        setFormState((formState) => ({
                            ...formState,
                            behandlingsdagerSykmelding: !formState.behandlingsdagerSykmelding,
                            behandlingsdagerPeriode: undefined,
                            behandlingsdagerAntall: undefined,
                        }));
                    }}
                    feil={errors.get('behandlingsdagerSykmelding')?.feilmelding}
                />
                <br />
                <ExpandableField show={formState.behandlingsdagerSykmelding}>
                    <>
                        <RangePicker
                            id="behandlingsdagerPeriode"
                            labelFrom="4.4.1 f.o.m."
                            labelTo="4.4.2 t.o.m."
                            value={formState.behandlingsdagerPeriode || []}
                            onChange={(newDates) => {
                                setFormState((formState) => ({ ...formState, behandlingsdagerPeriode: newDates }));
                            }}
                            feil={errors.get('behandlingsdagerPeriode')?.feilmelding}
                        />

                        <Input
                            id="behandlingsdagerAntall"
                            className="form-margin-bottom half"
                            type="number"
                            value={formState.behandlingsdagerAntall}
                            onChange={({ target: { value } }) => {
                                setFormState((formState) => ({ ...formState, behandlingsdagerAntall: Number(value) }));
                            }}
                            feil={errors.get('behandlingsdagerAntall')?.feilmelding}
                            label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
                        />
                    </>
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="4.5" underline={false}>
                <Checkbox
                    id="reisetilskuddSykmelding"
                    checked={formState.reisetilskuddSykmelding}
                    label="Pasienten kan være i fullt arbeid ved bruk av reisetilskudd"
                    onChange={() => {
                        setFormState((formState) => ({
                            ...formState,
                            reisetilskuddSykmelding: !formState.reisetilskuddSykmelding,
                            reisetilskuddPeriode: undefined,
                        }));
                    }}
                    feil={errors.get('reisetilskuddSykmelding')?.feilmelding}
                />
                <br />
                <ExpandableField show={formState.reisetilskuddSykmelding}>
                    <RangePicker
                        id="reisetilskuddPeriode"
                        labelFrom="4.5.1 f.o.m."
                        labelTo="4.5.2 t.o.m."
                        value={formState.reisetilskuddPeriode || []}
                        onChange={(newDates) => {
                            setFormState((formState) => ({ ...formState, reisetilskuddPeriode: newDates }));
                        }}
                        feil={errors.get('reisetilskuddPeriode')?.feilmelding}
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
