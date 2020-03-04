export enum HarArbeidsgiver {
    EN_ARBEIDSGIVER = 'Én arbeidsgiver',
    FLERE_ARBEIDSGIVERE = 'Flere arbeidsgivere',
    INGEN_ARBEIDSGIVER = 'Ingen arbeidsgiver',
}

export enum ArbeidsgiverField {
    HAR_ARBEIDSGIVER = 'harArbeidsgiver',
    NAVN = 'navn',
    YRKESBETEGNELSE = 'yrkesbetegnelse',
    STILLINGSPROSENT = 'stillingsprosent',
}

type Arbeidsgiver = {
    harArbeidsgiver?: HarArbeidsgiver;
    navn?: string;
    yrkesbetegnelse?: string;
    stillingsprosent?: number;
};

export enum MedisinskVurderingField {
    HOVEDDIAGNOSE = 'hoveddiagnose',
    BIDIAGNOSER = 'bidiagnoser',
    ANNEN_FRAVAERSARSAK = 'annenFravaersArsak',
    LOVFESTET_FRAVAERSGRUNN = 'lovfestetFravaersgrunn',
    BESKRIV_FRAVAER = 'beskrivFravaeret',
    SVANGERSKAP = 'svangerskap',
    YRKESSKADE = 'yrkesskade',
    YRKESSKADE_DATO = 'yrkesskadeDato',
    SKJERMET_FRA_PASIENT = 'skjermetFraPasient',
}

type Diagnose = {
    system?: string;
    kode?: string;
    tekst?: string;
};

type MedisinskVurdering = {
    [MedisinskVurderingField.HOVEDDIAGNOSE]: Diagnose;
    [MedisinskVurderingField.BIDIAGNOSER]: Diagnose[];
    [MedisinskVurderingField.ANNEN_FRAVAERSARSAK]?: boolean;
    [MedisinskVurderingField.LOVFESTET_FRAVAERSGRUNN]?: string;
    [MedisinskVurderingField.BESKRIV_FRAVAER]?: string;
    [MedisinskVurderingField.SVANGERSKAP]?: boolean;
    [MedisinskVurderingField.YRKESSKADE]?: boolean;
    [MedisinskVurderingField.YRKESSKADE_DATO]?: Date;
    [MedisinskVurderingField.SKJERMET_FRA_PASIENT]?: boolean;
};

export enum AvventendeSykmeldingField {
    AVVENTENDE = 'avventende',
    AVVENTENDE_PERIODE = 'avventendePeriode',
    INNSPILL_TIL_ARBEIDSGIVER = 'innspillTilArbeidsgiver',
}

type AvventendeSykmelding = {
    [AvventendeSykmeldingField.AVVENTENDE]?: boolean;
    [AvventendeSykmeldingField.AVVENTENDE_PERIODE]: Date[];
    [AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER]?: string;
};

export enum GradertSykmeldingField {
    GRADERT = 'gradert',
    GRADERT_PERIODE = 'gradertPeriode',
    GRAD = 'grad',
    REISETILSKUDD = 'reisetilskudd',
}

type GradertSykmelding = {
    [GradertSykmeldingField.GRADERT]?: boolean;
    [GradertSykmeldingField.GRADERT_PERIODE]: Date[];
    [GradertSykmeldingField.GRAD]?: string;
    [GradertSykmeldingField.REISETILSKUDD]?: boolean;
};

export enum FullSykmeldingField {
    SYKMELDT = 'sykmeldt',
    SYKMELDT_PERIODE = 'sykmeldtPeriode',
    MEDISINSKE_AARSAKER = 'medisinskeAarsaker',
    ARBEIDSFORHOLD = 'arbeidsforhold',
}

type FullSykmelding = {
    [FullSykmeldingField.SYKMELDT]?: boolean;
    [FullSykmeldingField.SYKMELDT_PERIODE]: Date[];
    [FullSykmeldingField.MEDISINSKE_AARSAKER]?: boolean;
    [FullSykmeldingField.ARBEIDSFORHOLD]?: boolean;
};

export enum BehandlingField {
    KAN_ARBEIDE = 'kanArbeide',
    BEHANDLINGSPERIODE = 'behandlingsPeriode',
    ANTALL_DAGER = 'antallDager',
}

type Behandling = {
    [BehandlingField.KAN_ARBEIDE]?: boolean;
    [BehandlingField.BEHANDLINGSPERIODE]: Date[];
    [BehandlingField.ANTALL_DAGER]?: number;
};

export enum ReisetilskuddField {
    FULLT_ARBEID = 'fulltArbeid',
    ARBEIDSPERIODE = 'arbeidsPeriode',
}

type Reisetilskudd = {
    [ReisetilskuddField.FULLT_ARBEID]?: boolean;
    [ReisetilskuddField.ARBEIDSPERIODE]: Date[];
};

export enum MulighetForArbeidField {
    AVVENTENDE_SYKMELDING = 'avventendeSykmelding',
    GRADERT_SYKMELDING = 'gradertSykmelding',
    FULL_SYKMELDING = 'fullSykmelding',
    BEHANDLING = 'behandling',
    REISETILSKUDD = 'reisetilskudd',
}

type MulighetForArbeid = {
    avventendeSykmelding: AvventendeSykmelding;
    gradertSykmelding: GradertSykmelding;
    fullSykmelding: FullSykmelding;
    behandling: Behandling;
    reisetilskudd: Reisetilskudd;
};

type Friskmelding = {
    arbeidsfoerEtterPeriode?: boolean;
    hensynPaArbeidsplassen?: string;
};

type TilretteleggingArbeidsplass = {
    tilrettelegging?: boolean;
    beskriv?: string;
};

type TiltakNav = {
    tiltakNav?: boolean;
    beskriv?: string;
};

type InnspillNav = {
    innspill?: boolean;
    beskriv?: string;
};

type Arbeidsevne = {
    tilretteleggingArbeidsplass: TilretteleggingArbeidsplass;
    tiltakNav: TiltakNav;
    innspillNav: InnspillNav;
};

type MeldingTilNav = {
    bistand?: boolean;
    begrunn?: string;
};

type MeldingTilArbeidsgiver = {
    innspill?: boolean;
    beskriv?: string;
};

type Tilbakedatering = {
    erTilbakedatert?: boolean;
    datoTilbakedatering?: Date;
    kanIkkeIvaretaInteresser?: boolean;
    begrunn?: string;
};

type Bekreftelse = {
    legitimert?: boolean;
    sykmeldersNavn?: string;
    hpr?: string;
    telefon?: string;
    adresse?: string;
};

export enum MetadataField {
    PERSONNUMMER = 'personnummer',
    TELEFON = 'telefon',
    ETTERNAVN = 'etternavn',
    FORNAVN = 'fornavn',
}

type Metadata = {
    [MetadataField.PERSONNUMMER]?: string;
    [MetadataField.TELEFON]?: string;
    [MetadataField.ETTERNAVN]?: string;
    [MetadataField.FORNAVN]?: string;
};

export enum SchemaField {
    METADATA = 'metadata',
    SYKETILFELLESTARTDATO = 'syketilfelleStartDato',
    LEGE_NAVN = 'legenavn',
    ARBEIDSGIVER = 'arbeidsgiver',
    MEDISINSKVURDERING = 'medisinskVurdering',
    MULIGHET_FOR_ARBEID = 'mulighetForArbeid',
    FRISKMELDING = 'friskmelding',
    ARBEIDSEVNE = 'arbeidsevne',
    MELDING_TIL_NAV = 'meldingTilNav',
    MELDING_TIL_ARBEIDSGIVER = 'meldingTilArbeidsgiver',
    TILBAKEDATERING = 'tilbakedatering',
    BEKREFTELSE = 'bekreftelse',
}

// Her er det tatt et bevisst valg for å gå bort fra den faktiske sykmeldingmodellen for å forenkle utvikling av forms
// Tanken er å type form på enklest mulig måte, og så skrive en mapping-funksjon som bygger opp den faktiske sykmeldingsmodellen i ettertid
export type FieldValues = {
    [SchemaField.METADATA]: Metadata;
    [SchemaField.SYKETILFELLESTARTDATO]?: Date;
    [SchemaField.LEGE_NAVN]?: string;
    [SchemaField.ARBEIDSGIVER]: Arbeidsgiver;
    [SchemaField.MEDISINSKVURDERING]: MedisinskVurdering;
    [SchemaField.MULIGHET_FOR_ARBEID]: MulighetForArbeid;
    [SchemaField.FRISKMELDING]: Friskmelding;
    [SchemaField.ARBEIDSEVNE]: Arbeidsevne;
    [SchemaField.MELDING_TIL_NAV]: MeldingTilNav;
    [SchemaField.MELDING_TIL_ARBEIDSGIVER]: MeldingTilArbeidsgiver;
    [SchemaField.TILBAKEDATERING]: Tilbakedatering;
    [SchemaField.BEKREFTELSE]: Bekreftelse;
};
