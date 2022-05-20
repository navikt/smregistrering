import { AnnenFraversArsak, Diagnose } from '../types/sykmelding/MedisinskVurdering';
import { ArbeidsrelatertArsak, MedisinskArsak, Periode } from '../types/sykmelding/Periode';
import { DiagnosekodeSystem } from '../types/diagnosekoder/Diagnosekoder';
import { FormType } from '../components/Form/Form';
import { RegistrertSykmelding } from '../types/sykmelding/RegistrertSykmelding';
import {
    buildAktivitetIkkeMuligSykmelding,
    buildAnnenFraversArsak,
    buildArbeidsrelatertArsak,
    buildAvventendeSykmelding,
    buildBehandlingsdagerSykmelding,
    buildDiagnose,
    buildDiagnoser,
    buildGradertSykmelding,
    buildMedisinskArsak,
    buildPerioder,
    buildRegistrertSykmelding,
    buildReisetilskuddSykmelding,
} from '../utils/registrertSykmeldingUtils';

describe('registrertSykmeldingUtils', () => {
    describe('Perioder', () => {
        describe('Avventende', () => {
            it('Returns avventende sykmelding', () => {
                const builtAvventendeSykmelding = buildAvventendeSykmelding([
                    {
                        type: 'avventende',
                        avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                        avventendePeriode: ['2020-10-01', '2020-10-02'],
                    },
                ]);
                const expected: Periode[] = [
                    {
                        fom: '2020-10-01',
                        tom: '2020-10-02',
                        reisetilskudd: false,
                        avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                        gradert: null,
                        behandlingsdager: null,
                        aktivitetIkkeMulig: null,
                    },
                ];
                expect(builtAvventendeSykmelding).toEqual(expected);
            });

            it('Does not return avventende sykmelding', () => {
                const builtAvventendeSykmelding = buildAvventendeSykmelding([
                    {
                        type: 'gradert',
                        gradertPeriode: ['2020-10-01', '2020-10-02'],
                        gradertGrad: 80,
                        gradertReisetilskudd: true,
                    },
                ]);
                expect(builtAvventendeSykmelding).toHaveLength(0);
            });

            it('Does not return avventende sykmelding if innspill is missing', () => {
                const builtAvventendeSykmelding = buildAvventendeSykmelding([
                    {
                        type: 'avventende',
                        avventendePeriode: ['2020-10-01', '2020-10-02'],
                        avventendeInnspillTilArbeidsgiver: null,
                    },
                ]);
                expect(builtAvventendeSykmelding).toHaveLength(0);
            });
        });
        describe('Gradert', () => {
            it('Returns gradert sykmelding', () => {
                const builtGradertSykmelding = buildGradertSykmelding([
                    {
                        type: 'gradert',
                        gradertPeriode: ['2020-10-01', '2020-10-02'],
                        gradertGrad: 80,
                        gradertReisetilskudd: true,
                    },
                ]);
                const expected: Periode[] = [
                    {
                        fom: '2020-10-01',
                        tom: '2020-10-02',
                        reisetilskudd: false,
                        gradert: {
                            reisetilskudd: true,
                            grad: 80,
                        },
                        aktivitetIkkeMulig: null,
                        behandlingsdager: null,
                        avventendeInnspillTilArbeidsgiver: null,
                    },
                ];
                expect(builtGradertSykmelding).toEqual(expected);
            });

            it('Does not return gradert sykmelding', () => {
                const builtGradertSykmelding = buildGradertSykmelding([
                    {
                        type: 'avventende',
                        avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                        avventendePeriode: ['2020-10-01', '2020-10-02'],
                    },
                ]);
                expect(builtGradertSykmelding).toHaveLength(0);
            });
        });
        describe('Aktivitet ikke mulig', () => {
            describe('Medisinsk årsak', () => {
                it('Returns medisinsk årsak', () => {
                    const builtMedisinskArsak = buildMedisinskArsak(true, ['TILSTAND_HINDRER_AKTIVITET'], null);
                    const expected: MedisinskArsak = {
                        arsak: ['TILSTAND_HINDRER_AKTIVITET'],
                        beskrivelse: null,
                    };
                    expect(builtMedisinskArsak).toEqual(expected);
                });

                it('Returns medisinsk årsak with beskrivelse', () => {
                    const builtMedisinskArsak = buildMedisinskArsak(
                        true,
                        ['TILSTAND_HINDRER_AKTIVITET'],
                        'dette er en beskrivelse',
                    );
                    const expected: MedisinskArsak = {
                        arsak: ['TILSTAND_HINDRER_AKTIVITET'],
                        beskrivelse: 'dette er en beskrivelse',
                    };
                    expect(builtMedisinskArsak).toEqual(expected);
                });

                it('Does not return medisinsk årsak', () => {
                    const builtMedisinskArsak = buildMedisinskArsak(
                        false,
                        ['TILSTAND_HINDRER_AKTIVITET'],
                        'dette er en beskrivelse',
                    );
                    expect(builtMedisinskArsak).toBeNull();
                });
            });

            describe('Arbeidsrelatert årsak', () => {
                it('Returns arbeidsrelatert årsak', () => {
                    const builtArbeidsrelatertArsak = buildArbeidsrelatertArsak(
                        true,
                        ['MANGLENDE_TILRETTELEGGING'],
                        null,
                    );
                    const expected: ArbeidsrelatertArsak = {
                        arsak: ['MANGLENDE_TILRETTELEGGING'],
                        beskrivelse: null,
                    };
                    expect(builtArbeidsrelatertArsak).toEqual(expected);
                });

                it('Returns arbeidsrelatert årsak with beskrivelse', () => {
                    const builtArbeidsrelatertArsak = buildArbeidsrelatertArsak(
                        true,
                        ['MANGLENDE_TILRETTELEGGING'],
                        'dette er en arbeidsrelatert beskrivelse',
                    );
                    const expected: ArbeidsrelatertArsak = {
                        arsak: ['MANGLENDE_TILRETTELEGGING'],
                        beskrivelse: 'dette er en arbeidsrelatert beskrivelse',
                    };
                    expect(builtArbeidsrelatertArsak).toEqual(expected);
                });

                it('Does not return arbeidsrelatert årsak', () => {
                    const builtArbeidsrelatertArsak = buildArbeidsrelatertArsak(
                        false,
                        ['MANGLENDE_TILRETTELEGGING'],
                        'dette er en arbeidsrelatert beskrivelse',
                    );
                    expect(builtArbeidsrelatertArsak).toBeNull();
                });
            });

            it('Return aktivitetIkkeMulig sykmelding', () => {
                const builtAktivitetIkkeMuligSykmelding = buildAktivitetIkkeMuligSykmelding([
                    {
                        type: 'fullsykmelding',
                        aktivitetIkkeMuligPeriode: ['2020-10-01', '2020-10-02'],
                        aktivitetIkkeMuligMedisinskArsak: true,
                        aktivitetIkkeMuligMedisinskArsakType: ['AKTIVITET_FORVERRER_TILSTAND'],
                        aktivitetIkkeMuligMedisinskArsakBeskrivelse: 'Kan ikke være i aktivitet pga medisin',
                        aktivitetIkkeMuligArbeidsrelatertArsak: true,
                        aktivitetIkkeMuligArbeidsrelatertArsakType: ['MANGLENDE_TILRETTELEGGING'],
                        aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: 'Kan ikke være i aktivitet pga arbeid',
                    },
                ]);
                const expected: Periode[] = [
                    {
                        fom: '2020-10-01',
                        tom: '2020-10-02',
                        reisetilskudd: false,
                        aktivitetIkkeMulig: {
                            medisinskArsak: {
                                arsak: ['AKTIVITET_FORVERRER_TILSTAND'],
                                beskrivelse: 'Kan ikke være i aktivitet pga medisin',
                            },
                            arbeidsrelatertArsak: {
                                arsak: ['MANGLENDE_TILRETTELEGGING'],
                                beskrivelse: 'Kan ikke være i aktivitet pga arbeid',
                            },
                        },
                        behandlingsdager: null,
                        gradert: null,
                        avventendeInnspillTilArbeidsgiver: null,
                    },
                ];
                expect(builtAktivitetIkkeMuligSykmelding).toEqual(expected);
            });

            it('Does not return aktivitetIkkeMulig sykmelding', () => {
                const builtAktivitetIkkeMuligSykmelding = buildAktivitetIkkeMuligSykmelding([
                    {
                        type: 'avventende',
                        avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                        avventendePeriode: ['2020-10-01', '2020-10-02'],
                    },
                ]);
                expect(builtAktivitetIkkeMuligSykmelding).toHaveLength(0);
            });
        });

        describe('Behandlingsdager', () => {
            it('Returns behandlingsdager sykmelding', () => {
                const builtBehandlingsdagerSykmelding = buildBehandlingsdagerSykmelding([
                    {
                        type: 'behandlingsdager',
                        behandlingsdagerPeriode: ['2020-10-01', '2020-10-02'],
                        behandlingsdagerAntall: 12,
                    },
                ]);

                const expected: Periode[] = [
                    {
                        fom: '2020-10-01',
                        tom: '2020-10-02',
                        reisetilskudd: false,
                        behandlingsdager: 12,
                        aktivitetIkkeMulig: null,
                        avventendeInnspillTilArbeidsgiver: null,
                        gradert: null,
                    },
                ];
                expect(builtBehandlingsdagerSykmelding).toEqual(expected);
            });

            it('Does not return behandlingsdager sykmelding', () => {
                const builtBehandlingsdagerSykmelding = buildBehandlingsdagerSykmelding([
                    {
                        type: 'avventende',
                        avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                        avventendePeriode: ['2020-10-01', '2020-10-02'],
                    },
                ]);
                expect(builtBehandlingsdagerSykmelding).toHaveLength(0);
            });
        });

        describe('Reisetilskudd', () => {
            it('Returns reisetilskudd sykmelding', () => {
                const builtReisetilskuddSykmelding = buildReisetilskuddSykmelding([
                    { type: 'reisetilskudd', reisetilskuddPeriode: ['2020-10-01', '2020-10-02'] },
                ]);
                const expected: Periode[] = [
                    {
                        fom: '2020-10-01',
                        tom: '2020-10-02',
                        reisetilskudd: true,
                        behandlingsdager: null,
                        aktivitetIkkeMulig: null,
                        avventendeInnspillTilArbeidsgiver: null,
                        gradert: null,
                    },
                ];
                expect(builtReisetilskuddSykmelding).toEqual(expected);
            });

            it('Does not return reisetilskudd sykmelding', () => {
                const builtReisetilskuddSykmelding = buildReisetilskuddSykmelding([
                    {
                        type: 'avventende',
                        avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                        avventendePeriode: ['2020-10-01', '2020-10-02'],
                    },
                ]);
                expect(builtReisetilskuddSykmelding).toHaveLength(0);
            });
        });

        it('Returns array containing all periods', () => {
            const schema: FormType = {
                sykmelderGate: null,
                sykmelderLand: null,
                sykmelderKommune: null,
                sykmelderPostboks: null,
                sykmelderPostnummer: null,
                sykmelderTelefon: null,
                aktoerId: null,
                sykmelderFnr: null,
                sykmeldersEtternavn: null,
                sykmeldersFornavn: null,
                behandletDato: null,
                begrunnelseIkkeKontakt: null,
                kontaktDato: null,
                meldingTilArbeidsgiverBeskriv: null,
                meldingTilNavBegrunn: null,
                skjermesForPasient: null,
                annenFraversArsakGrunn: null,
                annenFraversArsakBeskrivelse: null,
                yrkesskadeDato: null,
                hovedDiagnose: null,
                yrkesbetegnelse: null,
                stillingsprosent: null,
                harArbeidsgiver: null,
                arbeidsgiverNavn: null,
                pasientFnr: null,
                syketilfelleStartDato: null,
                yrkesskade: false,
                svangerskap: false,
                biDiagnoser: [],
                annenFraversArsak: false,
                hpr: null,
                meldingTilNavBistand: false,
                erTilbakedatert: false,
                harUtdypendeOpplysninger: false,
                kunneIkkeIvaretaEgneInteresser: false,
                mulighetForArbeid: [
                    {
                        type: 'avventende',
                        avventendePeriode: ['2020-10-01', '2020-10-02'],
                        avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                    },
                    {
                        type: 'gradert',
                        gradertPeriode: ['2020-10-01', '2020-10-02'],
                        gradertGrad: null,
                        gradertReisetilskudd: true,
                    },
                    {
                        type: 'fullsykmelding',
                        aktivitetIkkeMuligPeriode: ['2020-10-01', '2020-10-02'],
                        aktivitetIkkeMuligMedisinskArsak: false,
                        aktivitetIkkeMuligMedisinskArsakType: [],
                        aktivitetIkkeMuligMedisinskArsakBeskrivelse: null,
                        aktivitetIkkeMuligArbeidsrelatertArsak: false,
                        aktivitetIkkeMuligArbeidsrelatertArsakType: [],
                        aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: null,
                    },
                    {
                        type: 'behandlingsdager',
                        behandlingsdagerPeriode: ['2020-10-01', '2020-10-02'],
                        behandlingsdagerAntall: 12,
                    },
                    {
                        type: 'reisetilskudd',
                        reisetilskuddPeriode: ['2020-10-01', '2020-10-02'],
                    },
                ],
            };

            const builtPerioder = buildPerioder(schema);
            expect(builtPerioder).toHaveLength(5);
            expect(builtPerioder.some((periode) => periode.avventendeInnspillTilArbeidsgiver)).toBeTruthy();
            expect(builtPerioder.some((periode) => periode.gradert)).toBeTruthy();
            expect(builtPerioder.some((periode) => periode.aktivitetIkkeMulig)).toBeTruthy();
            expect(builtPerioder.some((periode) => periode.behandlingsdager)).toBeTruthy();
            expect(builtPerioder.some((periode) => periode.reisetilskudd)).toBeTruthy();
        });
    });

    describe('Medisinsk vurdering', () => {
        describe('Diagnose', () => {
            it('Should return diagnose', () => {
                const diagnose: Partial<Diagnose> = {
                    system: DiagnosekodeSystem.ICD10,
                    kode: 'A001',
                    tekst: 'diagnosetekst',
                };
                expect(buildDiagnose(diagnose)).toEqual({
                    system: '2.16.578.1.12.4.1.1.7110',
                    kode: 'A001',
                    tekst: 'diagnosetekst',
                });
            });
            it('Should return null if diagnose is incomplete', () => {
                const incompleteDiagnose: Partial<Diagnose> = {
                    system: DiagnosekodeSystem.ICD10,
                };
                expect(buildDiagnose(incompleteDiagnose)).toBeNull();
            });
        });

        describe('Diagnoser', () => {
            it('Should return diagnoser', () => {
                const diagnoser: Partial<Diagnose>[] = [
                    {
                        system: DiagnosekodeSystem.ICD10,
                        kode: 'A001',
                        tekst: 'diagnosetekst',
                    },
                    {
                        system: DiagnosekodeSystem.ICPC2,
                        kode: 'F001',
                        tekst: 'diagnosetekst',
                    },
                ];
                expect(buildDiagnoser(diagnoser)).toEqual([
                    {
                        system: '2.16.578.1.12.4.1.1.7110',
                        kode: 'A001',
                        tekst: 'diagnosetekst',
                    },
                    {
                        system: '2.16.578.1.12.4.1.1.7170',
                        kode: 'F001',
                        tekst: 'diagnosetekst',
                    },
                ]);
            });
            it('Should only return complete diagnoser', () => {
                const diagnoser: Partial<Diagnose>[] = [
                    {
                        system: DiagnosekodeSystem.ICD10,
                        tekst: 'diagnosetekst',
                    },
                    {
                        system: DiagnosekodeSystem.ICPC2,
                        kode: 'F001',
                        tekst: 'diagnosetekst',
                    },
                ];
                const expected = [
                    {
                        system: '2.16.578.1.12.4.1.1.7170',
                        kode: 'F001',
                        tekst: 'diagnosetekst',
                    },
                ];
                expect(buildDiagnoser(diagnoser)).toEqual(expected);
            });
            it('Should return empty array if diagnoser undefined', () => {
                expect(buildDiagnoser(undefined)).toEqual([]);
            });
        });

        describe('Annen fraværsårsak', () => {
            it('Should return annenFraversArsak', () => {
                const builtAnnenFraversArsak = buildAnnenFraversArsak(
                    true,
                    ['ARBEIDSRETTET_TILTAK', 'BEHANDLING_STERILISERING'],
                    'Må være hjemme',
                );
                const expected: AnnenFraversArsak = {
                    grunn: ['ARBEIDSRETTET_TILTAK', 'BEHANDLING_STERILISERING'],
                    beskrivelse: 'Må være hjemme',
                };
                expect(builtAnnenFraversArsak).toEqual(expected);
            });

            it('Should not return annenFraversArsak', () => {
                const builtAnnenFraversArsak = buildAnnenFraversArsak(
                    false,
                    ['ARBEIDSRETTET_TILTAK', 'BEHANDLING_STERILISERING'],
                    'Må være hjemme',
                );
                expect(builtAnnenFraversArsak).toBeNull();
            });

            it('Should return annenFraversArsak if beskrivelse is set and arsak-grunn is empty list', () => {
                const builtAnnenFraversArsak = buildAnnenFraversArsak(true, [], 'Må være hjemme');
                const expected: AnnenFraversArsak = {
                    grunn: [],
                    beskrivelse: 'Må være hjemme',
                };
                expect(builtAnnenFraversArsak).toEqual(expected);
            });
        });
    });

    describe('buildRegistrertSykmelding', () => {
        it('Builds complete registrert sykmelding object', () => {
            const schema: FormType = {
                yrkesskadeDato: null,
                pasientFnr: '12345678910',
                syketilfelleStartDato: '2021-02-01',
                behandletDato: '2021-02-02',
                skjermesForPasient: true,
                yrkesskade: true,
                svangerskap: true,
                hovedDiagnose: {
                    system: DiagnosekodeSystem.ICD10,
                    kode: 'A001',
                    tekst: 'Diagnosetekst',
                },
                biDiagnoser: [
                    {
                        system: DiagnosekodeSystem.ICPC2,
                        kode: 'A002',
                        tekst: 'Diagnosetekst2',
                    },
                    {
                        system: DiagnosekodeSystem.ICD10,
                        kode: 'A003',
                        tekst: 'Diagnosetekst3',
                    },
                ],
                annenFraversArsak: true,
                annenFraversArsakGrunn: ['ABORT', 'ARBEIDSRETTET_TILTAK'],
                annenFraversArsakBeskrivelse: 'Fraværsbeskrivelse',
                mulighetForArbeid: [
                    {
                        type: 'avventende',
                        avventendePeriode: ['2021-02-03', '2021-02-04'],
                        avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                    },
                    {
                        type: 'gradert',
                        gradertReisetilskudd: true,
                        gradertPeriode: ['2021-03-03', '2021-03-04'],
                        gradertGrad: 80,
                    },
                    {
                        type: 'fullsykmelding',
                        aktivitetIkkeMuligPeriode: ['2021-04-03', '2021-04-04'],
                        aktivitetIkkeMuligMedisinskArsak: true,
                        aktivitetIkkeMuligMedisinskArsakType: ['AKTIVITET_FORHINDRER_BEDRING', 'ANNET'],
                        aktivitetIkkeMuligMedisinskArsakBeskrivelse: 'Medisinsk beskrivelse',
                        aktivitetIkkeMuligArbeidsrelatertArsak: true,
                        aktivitetIkkeMuligArbeidsrelatertArsakType: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                        aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: 'Arbeidsrelatert beskrivelse',
                    },
                    {
                        type: 'behandlingsdager',
                        behandlingsdagerPeriode: ['2021-05-03', '2021-05-04'],
                        behandlingsdagerAntall: 20,
                    },
                    {
                        type: 'reisetilskudd',
                        reisetilskuddPeriode: ['2021-06-03', '2021-06-04'],
                    },
                ],
                meldingTilNavBistand: true,
                meldingTilNavBegrunn: 'Melding til NAV',
                meldingTilArbeidsgiverBeskriv: 'Melding til arbeidsgiver',
                harArbeidsgiver: 'EN_ARBEIDSGIVER',
                arbeidsgiverNavn: 'Olav Normann',
                yrkesbetegnelse: 'Brannmann',
                stillingsprosent: 100,
                sykmelderFnr: '12345678910',
                aktoerId: '1245',
                sykmeldersEtternavn: 'Legesen',
                sykmeldersFornavn: 'Lege',
                hpr: '12345',
                sykmelderGate: 'Gatenavn',
                sykmelderKommune: 'Kommune',
                sykmelderLand: 'Noreg',
                sykmelderPostboks: '1234',
                sykmelderPostnummer: 4321,
                sykmelderTelefon: '12345678',
                erTilbakedatert: true,
                kontaktDato: '2020-02-01',
                kunneIkkeIvaretaEgneInteresser: true,
                begrunnelseIkkeKontakt: 'Pasienten hadde omgangssjuke',
                harUtdypendeOpplysninger: true,
            };

            const expected: RegistrertSykmelding = {
                syketilfelleStartDato: schema.syketilfelleStartDato!,
                pasientFnr: schema.pasientFnr!,
                arbeidsgiver: {
                    harArbeidsgiver: schema.harArbeidsgiver!,
                    navn: schema.arbeidsgiverNavn,
                    yrkesbetegnelse: schema.yrkesbetegnelse,
                    stillingsprosent: schema.stillingsprosent,
                },
                medisinskVurdering: {
                    svangerskap: schema.svangerskap,
                    yrkesskade: schema.yrkesskade,
                    yrkesskadeDato: schema.yrkesskadeDato,
                    hovedDiagnose: {
                        system: schema.hovedDiagnose?.system!,
                        kode: schema.hovedDiagnose?.kode!,
                        tekst: schema.hovedDiagnose?.tekst!,
                    },
                    biDiagnoser: schema.biDiagnoser.map((bidiagnose) => ({
                        system: bidiagnose.system!,
                        kode: bidiagnose.kode!,
                        tekst: bidiagnose.tekst!,
                    })),
                    annenFraversArsak: {
                        grunn: schema.annenFraversArsakGrunn!,
                        beskrivelse: schema.annenFraversArsakBeskrivelse,
                    },
                },
                skjermesForPasient: schema.skjermesForPasient!,
                perioder: [
                    {
                        fom: schema.mulighetForArbeid[0].avventendePeriode[0],
                        tom: schema.mulighetForArbeid[0].avventendePeriode[1],
                        avventendeInnspillTilArbeidsgiver:
                            schema.mulighetForArbeid[0].avventendeInnspillTilArbeidsgiver,
                        reisetilskudd: false,
                        aktivitetIkkeMulig: null,
                        behandlingsdager: null,
                        gradert: null,
                    },
                    {
                        fom: schema.mulighetForArbeid[1].gradertPeriode[0],
                        tom: schema.mulighetForArbeid[1].gradertPeriode[1],
                        gradert: {
                            grad: schema.mulighetForArbeid[1].gradertGrad,
                            reisetilskudd: schema.mulighetForArbeid[1].gradertReisetilskudd!,
                        },
                        reisetilskudd: false,
                        aktivitetIkkeMulig: null,
                        avventendeInnspillTilArbeidsgiver: null,
                        behandlingsdager: null,
                    },
                    {
                        fom: schema.mulighetForArbeid[2].aktivitetIkkeMuligPeriode[0],
                        tom: schema.mulighetForArbeid[2].aktivitetIkkeMuligPeriode[1],
                        aktivitetIkkeMulig: {
                            medisinskArsak: {
                                arsak: schema.mulighetForArbeid[2].aktivitetIkkeMuligMedisinskArsakType!,
                                beskrivelse: schema.mulighetForArbeid[2].aktivitetIkkeMuligMedisinskArsakBeskrivelse,
                            },
                            arbeidsrelatertArsak: {
                                arsak: schema.mulighetForArbeid[2].aktivitetIkkeMuligArbeidsrelatertArsakType!,
                                beskrivelse:
                                    schema.mulighetForArbeid[2].aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
                            },
                        },
                        reisetilskudd: false,
                        gradert: null,
                        behandlingsdager: null,
                        avventendeInnspillTilArbeidsgiver: null,
                    },
                    {
                        fom: schema.mulighetForArbeid[3].behandlingsdagerPeriode![0],
                        tom: schema.mulighetForArbeid[3].behandlingsdagerPeriode![1],
                        behandlingsdager: schema.mulighetForArbeid[3].behandlingsdagerAntall,
                        reisetilskudd: false,
                        aktivitetIkkeMulig: null,
                        gradert: null,
                        avventendeInnspillTilArbeidsgiver: null,
                    },
                    {
                        fom: schema.mulighetForArbeid[4].reisetilskuddPeriode![0],
                        tom: schema.mulighetForArbeid[4].reisetilskuddPeriode![1],
                        reisetilskudd: true,
                        aktivitetIkkeMulig: null,
                        gradert: null,
                        behandlingsdager: null,
                        avventendeInnspillTilArbeidsgiver: null,
                    },
                ],
                harUtdypendeOpplysninger: true,
                navnFastlege: null,
                meldingTilNAV: {
                    bistandUmiddelbart: schema.meldingTilNavBistand,
                    beskrivBistand: schema.meldingTilNavBegrunn,
                },
                meldingTilArbeidsgiver: schema.meldingTilArbeidsgiverBeskriv,
                kontaktMedPasient: {
                    kontaktDato: schema.kontaktDato,
                    begrunnelseIkkeKontakt: schema.begrunnelseIkkeKontakt,
                },
                behandletDato: schema.behandletDato!,
                sykmelderFnr: '', // TODO: remove when backend is ready
                behandler: {
                    fnr: '', // TODO: remove when backend is ready
                    fornavn: '', // Information is gathered in backend based on hpr
                    mellomnavn: null,
                    etternavn: '', // Information is gathered in backend based on hpr
                    hpr: schema.hpr,
                    her: null,
                    aktoerId: '', // Information is gathered in backend based on hpr
                    adresse: {
                        gate: schema.sykmelderGate,
                        kommune: schema.sykmelderKommune,
                        postnummer: schema.sykmelderPostnummer,
                        postboks: schema.sykmelderPostboks,
                        land: schema.sykmelderLand,
                    },
                    tlf: schema.sykmelderTelefon,
                },
            };

            // @ts-expect-error Test data doesn't match
            expect(buildRegistrertSykmelding(schema).data).toEqual(expected);
        });
    });
});
