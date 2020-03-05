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
    [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: AvventendeSykmelding;
    [MulighetForArbeidField.GRADERT_SYKMELDING]: GradertSykmelding;
    [MulighetForArbeidField.FULL_SYKMELDING]: FullSykmelding;
    [MulighetForArbeidField.BEHANDLING]: Behandling;
    [MulighetForArbeidField.REISETILSKUDD]: Reisetilskudd;
};

export enum FriskmeldingField {
    ARBEIDSFOER_ETTER_PERIODE = 'arbeidsfoerEtterPeriode',
    HENSYN_PA_ARBEIDSPLASSEN = 'hensynPaArbeidsplassen',
}

type Friskmelding = {
    [FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE]?: boolean;
    [FriskmeldingField.HENSYN_PA_ARBEIDSPLASSEN]?: string;
};

export enum TilretteleggingArbeidsplassField {
    TILRETTELEGGING = 'tilrettelegging',
    BESKRIV = 'beskriv',
}

type TilretteleggingArbeidsplass = {
    [TilretteleggingArbeidsplassField.TILRETTELEGGING]?: boolean;
    [TilretteleggingArbeidsplassField.BESKRIV]?: string;
};

export enum TiltakNavField {
    TILTAK_NAV = 'tiltakNav',
    BESKRIV = 'beskriv',
}

type TiltakNav = {
    [TiltakNavField.TILTAK_NAV]?: boolean;
    [TiltakNavField.BESKRIV]?: string;
};

export enum InnspillNavField {
    INNSPILL = 'innspill',
    BESKRIV = 'beskriv',
}

type InnspillNav = {
    [InnspillNavField.INNSPILL]?: boolean;
    [InnspillNavField.BESKRIV]?: string;
};

export enum ArbeidsevneField {
    TILRETTELEGGING_ARBEIDSPLASS = 'tilretteleggingArbeidsplass',
    TILTAK_NAV = 'tiltakNav',
    INNSPILL_NAV = 'innspillNav',
}

type Arbeidsevne = {
    [ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS]: TilretteleggingArbeidsplass;
    [ArbeidsevneField.TILTAK_NAV]: TiltakNav;
    [ArbeidsevneField.INNSPILL_NAV]: InnspillNav;
};

export enum MeldingTilNavField {
    BISTAND = 'bistand',
    BEGRUNN = 'begrunn',
}

type MeldingTilNav = {
    [MeldingTilNavField.BISTAND]?: boolean;
    [MeldingTilNavField.BEGRUNN]?: string;
};

export enum MeldingTilArbeidsgiverField {
    INNSPILL = 'innspill',
    BESKRIV = 'beskriv',
}

type MeldingTilArbeidsgiver = {
    [MeldingTilArbeidsgiverField.INNSPILL]?: boolean;
    [MeldingTilArbeidsgiverField.BESKRIV]?: string;
};

export enum TilbakedateringField {
    ER_TILBAKEDATERT = 'erTilbakedatert',
    DATO_TILBAKEDATERING = 'datoTilbakedatering',
    KAN_IKKE_IVARETA_INTERESSER = 'kanIkkeIvaretaInteresser',
    BEGRUNN = 'begrunn',
}

type Tilbakedatering = {
    [TilbakedateringField.ER_TILBAKEDATERT]?: boolean;
    [TilbakedateringField.DATO_TILBAKEDATERING]?: Date;
    [TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER]?: boolean;
    [TilbakedateringField.BEGRUNN]?: string;
};

export enum BekreftelseField {
    LEGITIMERT = 'legitimert',
    SYKMELDERS_NAVN = 'sykmeldersNavn',
    HPR = 'hpr',
    TELEFON = 'telefon',
    ADRESSE = 'adresse',
}

type Bekreftelse = {
    [BekreftelseField.LEGITIMERT]?: boolean;
    [BekreftelseField.SYKMELDERS_NAVN]?: string;
    [BekreftelseField.HPR]?: string;
    [BekreftelseField.TELEFON]?: string;
    [BekreftelseField.ADRESSE]?: string;
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
