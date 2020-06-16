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
import {
    getAktivitetIkkeMuligSykmelding,
    getAvventendePeriode,
    getBehandlingsdagerSykmelding,
    getGradertSykmelding,
    getReisetilskuddSykmelding,
} from '../../utils/periodeUtils';
import { hasCorrectDiagnosekode } from '../../utils/diagnoseUtils';
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

const getInitialSchema = (oppgave: Oppgave, diagnosekoder: Diagnosekoder): SchemaType => {
    const avventendePeriode = getAvventendePeriode(oppgave.papirSmRegistering?.perioder);
    const aktivitetIkkeMuligPeriode = getAktivitetIkkeMuligSykmelding(oppgave.papirSmRegistering?.perioder);
    const behandlingsdagerPeriode = getBehandlingsdagerSykmelding(oppgave.papirSmRegistering?.perioder);
    const gradertPeriode = getGradertSykmelding(oppgave.papirSmRegistering?.perioder);
    const reisetilskuddperiode = getReisetilskuddSykmelding(oppgave.papirSmRegistering?.perioder);

    const hasCorrectDiagnose = hasCorrectDiagnosekode(
        diagnosekoder,
        oppgave.papirSmRegistering?.medisinskVurdering?.hovedDiagnose?.kode,
    );
    console.log('hascorrectdiagnosekode: ' + hasCorrectDiagnose);

    return {
        // Other
        syketilfelleStartDato: oppgave.papirSmRegistering?.syketilfelleStartDato,

        // Pasientopplysninger
        pasientFnr: oppgave.papirSmRegistering?.fnr,

        // Arbeidsgiver
        harArbeidsgiver: oppgave.papirSmRegistering?.arbeidsgiver?.harArbeidsgiver,
        arbeidsgiverNavn: oppgave.papirSmRegistering?.arbeidsgiver?.navn,
        yrkesbetegnelse: oppgave.papirSmRegistering?.arbeidsgiver?.yrkesbetegnelse,
        stillingsprosent: oppgave.papirSmRegistering?.arbeidsgiver?.stillingsprosent,

        // Diagnose
        yrkesskade: !!oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskade,
        yrkesskadeDato: oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskadeDato,
        skjermesForPasient: !!oppgave.papirSmRegistering?.skjermesForPasient,
        svangerskap: !!oppgave.papirSmRegistering?.medisinskVurdering?.svangerskap,
        annenFraversArsak: false,

        // MulighetForArbeid
        avventendeSykmelding: !!avventendePeriode,
        avventendePeriode: !!avventendePeriode ? [avventendePeriode.fom, avventendePeriode.tom] : undefined,
        avventendeInnspillTilArbeidsgiver: !!avventendePeriode?.avventendeInnspillTilArbeidsgiver
            ? avventendePeriode.avventendeInnspillTilArbeidsgiver
            : undefined,
        gradertSykmelding: !!gradertPeriode,
        gradertPeriode: !!gradertPeriode ? [gradertPeriode.fom, gradertPeriode.tom] : undefined,
        gradertReisetilskudd: !!gradertPeriode?.gradert?.reisetilskudd,
        gradertGrad: gradertPeriode?.gradert?.grad ? gradertPeriode?.gradert?.grad : undefined,
        aktivitetIkkeMuligSykmelding: !!aktivitetIkkeMuligPeriode,
        aktivitetIkkeMuligPeriode: !!aktivitetIkkeMuligPeriode
            ? [aktivitetIkkeMuligPeriode.fom, aktivitetIkkeMuligPeriode.tom]
            : undefined,
        behandlingsdagerSykmelding: !!behandlingsdagerPeriode,
        behandlingsdagerPeriode: !!behandlingsdagerPeriode
            ? [behandlingsdagerPeriode.fom, behandlingsdagerPeriode.tom]
            : undefined,
        behandlingsdagerAntall: behandlingsdagerPeriode?.behandlingsdager
            ? behandlingsdagerPeriode?.behandlingsdager
            : undefined,
        reisetilskuddSykmelding: !!reisetilskuddperiode,
        reisetilskuddPeriode: !!reisetilskuddperiode ? [reisetilskuddperiode.fom, reisetilskuddperiode.tom] : undefined,

        // Friskmelding
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

        // Utdypende opplysninger
        utdypende611: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.1']?.svar,
        utdypende612: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.2']?.svar,
        utdypende613: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.3']?.svar,
        utdypende614: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.4']?.svar,
        utdypende615: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.5']?.svar,
        //
        utdypende621: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.2']?.['6.2.1']?.svar,
        utdypende622: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.2']?.['6.2.2']?.svar,
        utdypende623: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.2']?.['6.2.3']?.svar,
        utdypende624: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.2']?.['6.2.4']?.svar,
        //
        utdypende631: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.3']?.['6.3.1']?.svar,
        utdypende632: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.3']?.['6.3.2']?.svar,
        //
        utdypende641: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.4']?.['6.4.1']?.svar,
        utdypende642: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.4']?.['6.4.2']?.svar,
        utdypende643: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.4']?.['6.4.3']?.svar,
        //
        utdypende651: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.5']?.['6.5.1']?.svar,
        utdypende652: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.5']?.['6.5.2']?.svar,
        utdypende653: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.5']?.['6.5.3']?.svar,
        utdypende654: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.5']?.['6.5.4']?.svar,
        //
        utdypende661: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.6']?.['6.6.1']?.svar,
        utdypende662: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.6']?.['6.6.2']?.svar,
        utdypende663: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.6']?.['6.6.3']?.svar,

        // Arbeidsevne
        tiltakNav: oppgave.papirSmRegistering?.tiltakNAV,
        tiltakArbeidsplassen: oppgave.papirSmRegistering?.tiltakArbeidsplassen,
        andreTiltak: oppgave.papirSmRegistering?.andreTiltak,

        // MeldingTilNav
        meldingTilNavBistand: !!oppgave.papirSmRegistering?.meldingTilNAV?.bistandUmiddelbart,
        meldingTilNavBegrunn: oppgave.papirSmRegistering?.meldingTilNAV?.beskrivBistand,

        // MeldingTilArbeidsgiver
        meldingTilArbeidsgiverBeskriv: oppgave.papirSmRegistering?.meldingTilArbeidsgiver,

        // Tilbakedatering
        erTilbakedatert: !!oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato,
        kontaktDato: oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato,
        kunneIkkeIvaretaEgneInteresser: !!oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt,
        begrunnelseIkkeKontakt: oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt,

        // Bekreftelse
        behandletDato: oppgave.papirSmRegistering?.behandletTidspunkt,
        sykmelderFnr: oppgave.papirSmRegistering?.behandler?.fnr,
        sykmeldersFornavn: oppgave.papirSmRegistering?.behandler?.fornavn,
        sykmeldersEtternavn: oppgave.papirSmRegistering?.behandler?.etternavn,
        aktoerId: oppgave.papirSmRegistering?.behandler?.aktoerId,
        sykmelderGate: oppgave.papirSmRegistering?.behandler?.adresse?.gate,
        sykmelderKommune: oppgave.papirSmRegistering?.behandler?.adresse?.kommune,
        sykmelderPostboks: oppgave.papirSmRegistering?.behandler?.adresse?.postboks,
        sykmelderPostnummer: oppgave.papirSmRegistering?.behandler?.adresse?.postnummer,
        sykmelderLand: oppgave.papirSmRegistering?.behandler?.adresse?.land,
        sykmelderTelefon: oppgave.papirSmRegistering?.behandler?.tlf,
        hpr: oppgave.papirSmRegistering?.behandler?.hpr,
    };
};

/* 
const testDiagnose = {
    system: 
}

interface Diagnose {
    kode: string,
    tekst: string,
}
const mymap = new Map<string, Diagnose>();
mymap.set()
 */
type FormProps = {
    schemaRef: RefObject<HTMLDivElement>;
    sections: Sections;
    oppgave: Oppgave;
    diagnosekoder: Diagnosekoder;
};

const Form = ({ schemaRef, sections, oppgave, diagnosekoder }: FormProps) => {
    const [schema, setSchema] = useState<SchemaType>(getInitialSchema(oppgave, diagnosekoder));
    const [formErrors, setFormErrors] = useState<ErrorSchemaType>({});
    const errorSummaryRef = useRef<HTMLDivElement>(null);

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
            <form autoComplete="off">
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
