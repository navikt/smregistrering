import React from 'react';

import AktivitetIkkeMuligSykmelding from './AktivitetIkkeMuligSykmelding';
import AvventendeSykmelding from './AvventendeSykmelding';
import BehandlingsdagerSykmelding from './BehandlingsdagerSykmelding';
import GradertSykmelding from './GradertSykmelding';
import ReisetilskuddSykmelding from './ReisetilskuddSykmelding';
import SectionContainer from '../../SectionContainer';
import { ArbeidsrelatertArsakType, MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Section } from '../../../../../types/Section';
import { Validate } from '../../../validation';

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
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const MulighetForArbeidSection = ({ section, setSchema, schema, errors, validate }: MulighetForArbeidSectionProps) => {
    return (
        <SectionContainer section={section} sectionError={errors.mulighetForArbeid}>
            <AvventendeSykmelding setSchema={setSchema} schema={schema} errors={errors} validate={validate} />
            <GradertSykmelding setSchema={setSchema} schema={schema} errors={errors} validate={validate} />
            <AktivitetIkkeMuligSykmelding setSchema={setSchema} schema={schema} errors={errors} validate={validate} />
            <BehandlingsdagerSykmelding setSchema={setSchema} schema={schema} errors={errors} validate={validate} />
            <ReisetilskuddSykmelding setSchema={setSchema} schema={schema} errors={errors} validate={validate} />
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
