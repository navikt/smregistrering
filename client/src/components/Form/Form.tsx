import './Form.less';
import './components/formComponents/Flatpickr.less';

import React, { RefObject, useRef, useState } from 'react';

import FormHeader from './components/FormHeader';
import FormSubmit from './components/FormSubmit';
import Panel from '../Panel/Panel';
import ArbeidsevneSection, { Arbeidsevne } from './components/formSections/ArbeidsevneSection';
import ArbeidsgiverSection, { Arbeidsgiver } from './components/formSections/ArbeidsgiverSection';
import BekreftelseSection, { Bekreftelse } from './components/formSections/BekreftelseSection';
import DiagnoseSection, { MedisinskVurdering } from './components/formSections/DiagnoseSection/DiagnoseSection';
import FormErrorSummary, { hasFormErrors } from './components/FormErrorSummary';
import FriskmeldingSection, { Friskmelding } from './components/formSections/FriskmeldingSection';
import MeldingTilArbeidsgiverSection, {
    MeldingTilArbeidsgiver,
} from './components/formSections/MeldingTilArbeidsgiverSection';
import MeldingTilNavSection, { MeldingTilNav } from './components/formSections/MeldingTilNavSection';
import MulighetForArbeidSection, { MulighetForArbeid } from './components/formSections/MulighetForArbeidSection';
import OtherSection, { Other } from './components/formSections/OtherSection';
import PasientopplysningerSection, { Pasientopplysninger } from './components/formSections/PasientopplysningerSection';
import TilbakedateringSection, { Tilbakedatering } from './components/formSections/TilbakedateringSection';
import UtdypendeOpplysningerSection, {
    UtdypendeOpplysninger,
} from './components/formSections/UtdypendeOpplysningerSection';
import { Diagnosekoder } from '../../types/Diagnosekode';
import { Oppgave } from '../../types/Oppgave';
import { SectionTitle, Sections } from '../../types/Section';
import { Validate, validationFunctions } from './validation';
import { scrollToRef } from '../Menu/MenuLink';

export interface SchemaType
    extends Pasientopplysninger,
        Arbeidsgiver,
        Arbeidsevne,
        MedisinskVurdering,
        MulighetForArbeid,
        Friskmelding,
        UtdypendeOpplysninger,
        MeldingTilNav,
        MeldingTilArbeidsgiver,
        Tilbakedatering,
        Bekreftelse,
        Other {}

export type ErrorSchemaType = { [key in keyof SchemaType]?: string | undefined };

const getInitialSchema = (oppgave: Oppgave): SchemaType => {
    return {
        pasientFnr: oppgave.papirSmRegistering?.fnr,
        tiltakNav: oppgave.papirSmRegistering?.tiltakNAV,
        tiltakArbeidsplassen: oppgave.papirSmRegistering?.tiltakArbeidsplassen,
        andreTiltak: oppgave.papirSmRegistering?.andreTiltak,
        meldingTilArbeidsgiverBeskriv: oppgave.papirSmRegistering?.meldingTilArbeidsgiver,
        harArbeidsgiver: oppgave.papirSmRegistering?.arbeidsgiver?.harArbeidsgiver,
        arbeidsgiverNavn: oppgave.papirSmRegistering?.arbeidsgiver?.navn,
        yrkesbetegnelse: oppgave.papirSmRegistering?.arbeidsgiver?.yrkesbetegnelse,
        stillingsprosent: oppgave.papirSmRegistering?.arbeidsgiver?.stillingsprosent,
        avventendeSykmelding: false,
        gradertSykmelding: false,
        gradertReisetilskudd: false,
        aktivitetIkkeMuligSykmelding: false,
        behandlingsdagerSykmelding: false,
        reisetilskuddSykmelding: false,
        annenFraversArsak: false,
        svangerskap: oppgave.papirSmRegistering?.medisinskVurdering?.svangerskap ? true : false,
        yrkesskade: oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskade ? true : false,
        yrkesskadeDato: oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskadeDato,
        skjermesForPasient: oppgave.papirSmRegistering?.skjermesForPasient ? true : false,
        erTilbakedatert: !!oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato,
        kontaktDato: oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato,
        kunneIkkeIvaretaEgneInteresser: !!oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt,
        begrunnelseIkkeKontakt: oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt,
        legitimert: false,
        meldingTilNavBistand: oppgave.papirSmRegistering?.meldingTilNAV?.bistandUmiddelbart ? true : false,
        meldingTilNavBegrunn: oppgave.papirSmRegistering?.meldingTilNAV?.beskrivBistand,
        syketilfelleStartDato: oppgave.papirSmRegistering?.syketilfelleStartDato,
        behandletDato: oppgave.papirSmRegistering?.behandletTidspunkt,
        sykmelderFnr: oppgave.papirSmRegistering?.behandler?.fnr,
        sykmeldersFornavn: oppgave.papirSmRegistering?.behandler?.fornavn,
        sykmeldersEtternavn: oppgave.papirSmRegistering?.behandler?.etternavn,
        sykmelderAdresse: oppgave.papirSmRegistering?.behandler?.adresse,
        sykmelderTelefon: oppgave.papirSmRegistering?.behandler?.tlf,
        hpr: oppgave.papirSmRegistering?.behandler?.hpr,
        arbeidsfoerEtterPeriode: !!oppgave.papirSmRegistering?.prognose?.arbeidsforEtterPeriode,
        hensynPaArbeidsplassen: oppgave.papirSmRegistering?.prognose?.hensynArbeidsplassen,
        erIArbeid: !!oppgave.papirSmRegistering?.prognose?.erIArbeid,
        egetArbeidPaSikt: !!oppgave.papirSmRegistering?.prognose?.erIArbeid?.egetArbeidPaSikt,
        annetArbeidPaSikt: !!oppgave.papirSmRegistering?.prognose?.erIArbeid?.annetArbeidPaSikt,
        arbeidFOM: oppgave.papirSmRegistering?.prognose?.erIArbeid?.arbeidFOM,
        vurderingsDatoIArbeid: oppgave.papirSmRegistering?.prognose?.erIArbeid?.vurderingsdato,
        erIkkeIArbeid: !!oppgave.papirSmRegistering?.prognose?.erIkkeIArbeid,
        arbeidsforPaSikt: !!oppgave.papirSmRegistering?.prognose?.erIkkeIArbeid?.arbeidsforPaSikt,
        arbeidsforFOM: oppgave.papirSmRegistering?.prognose?.erIkkeIArbeid?.arbeidsforFOM,
        vurderingsDatoUtenArbeid: oppgave.papirSmRegistering?.prognose?.erIkkeIArbeid?.vurderingsdato,
    };
};

type FormProps = {
    schemaRef: RefObject<HTMLDivElement>;
    sections: Sections;
    oppgave: Oppgave;
    diagnosekoder: Diagnosekoder;
};

const Form = ({ schemaRef, sections, oppgave, diagnosekoder }: FormProps) => {
    const [schema, setSchema] = useState<SchemaType>(getInitialSchema(oppgave));
    const [formErrors, setFormErrors] = useState<ErrorSchemaType>({});
    const errorSummaryRef = useRef<HTMLDivElement>(null);

    console.log(schema);

    const validate: Validate = (name, value) => {
        const validationFunction = validationFunctions[name];
        const error = validationFunction(value as never, schema);
        setFormErrors(state => ({ ...state, [name]: error }));
        if (error) {
            return false;
        }
        return true;
    };

    const validateAll = (): boolean => {
        const keys = Object.keys(validationFunctions);
        let hasErrors: boolean = false;
        keys.forEach(key => {
            // TODO: Can this casting be avoided?
            // https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
            const value = schema[key as keyof SchemaType];
            const validation = validate(key as keyof SchemaType, value);
            if (!validation) {
                hasErrors = true;
            }
        });
        return !hasErrors;
    };

    const focusErrorSummary = (): void => {
        setTimeout(() => {
            if (errorSummaryRef.current) {
                errorSummaryRef.current.focus();
                scrollToRef(errorSummaryRef);
            }
        }, 300);
    };

    return (
        <section className="form">
            <form>
                <Panel ariaLabel="skjemapanel">
                    <FormHeader />
                    <OtherSection setSchema={setSchema} errors={formErrors} schema={schema} validate={validate} />
                    <PasientopplysningerSection
                        section={sections[SectionTitle.PASIENTOPPLYSNINGER]}
                        setSchema={setSchema}
                        errors={formErrors}
                        schema={schema}
                        validate={validate}
                    />
                    <ArbeidsgiverSection
                        section={sections[SectionTitle.ARBEIDSGIVER]}
                        setSchema={setSchema}
                        errors={formErrors}
                        schema={schema}
                        validate={validate}
                    />
                    <DiagnoseSection
                        section={sections[SectionTitle.DIAGNOSE]}
                        setSchema={setSchema}
                        errors={formErrors}
                        schema={schema}
                        validate={validate}
                        diagnosekoder={diagnosekoder}
                    />
                    <MulighetForArbeidSection
                        section={sections[SectionTitle.MULIGHET_FOR_ARBEID]}
                        setSchema={setSchema}
                        schema={schema}
                        errors={formErrors}
                        validate={validate}
                    />
                    <FriskmeldingSection
                        section={sections[SectionTitle.FRISKMELDING_PROGNOSE]}
                        setSchema={setSchema}
                        schema={schema}
                        errors={formErrors}
                        validate={validate}
                    />
                    <UtdypendeOpplysningerSection
                        section={sections[SectionTitle.UTDYPENDE_OPPLYSNIGNER]}
                        setSchema={setSchema}
                        schema={schema}
                        errors={formErrors}
                        validate={validate}
                    />
                    <ArbeidsevneSection
                        section={sections[SectionTitle.ARBEIDSEVNE]}
                        setSchema={setSchema}
                        schema={schema}
                        errors={formErrors}
                        validate={validate}
                    />
                    <MeldingTilNavSection
                        section={sections[SectionTitle.TIL_NAV]}
                        setSchema={setSchema}
                        schema={schema}
                        errors={formErrors}
                        validate={validate}
                    />
                    <MeldingTilArbeidsgiverSection
                        section={sections[SectionTitle.TIL_ARBEIDSGIVER]}
                        setSchema={setSchema}
                        schema={schema}
                        errors={formErrors}
                        validate={validate}
                    />
                    <TilbakedateringSection
                        section={sections[SectionTitle.TILBAKEDATERING]}
                        setSchema={setSchema}
                        schema={schema}
                        errors={formErrors}
                        validate={validate}
                    />
                    <BekreftelseSection
                        section={sections[SectionTitle.BEKREFTELSE]}
                        setSchema={setSchema}
                        schema={schema}
                        errors={formErrors}
                        validate={validate}
                    />
                </Panel>
                <FormErrorSummary formErrors={formErrors} errorSummaryRef={errorSummaryRef} />
                <FormSubmit
                    oppgave={oppgave}
                    schema={schema}
                    hasFormErrors={hasFormErrors(formErrors)}
                    validateAll={validateAll}
                    focusErrorSummary={focusErrorSummary}
                />
            </form>
        </section>
    );
};

export default Form;
