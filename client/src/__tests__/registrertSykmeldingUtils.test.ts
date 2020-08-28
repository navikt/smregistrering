import {
    AnnenFraversArsak,
    Arbeidsgiver,
    ArbeidsrelatertArsak,
    Behandler,
    Diagnose,
    KontaktMedPasient,
    MedisinskArsak,
    MedisinskArsakType,
    Periode,
    Prognose,
    RegistrertSykmelding,
    UtdypendeOpplysningerReturn,
} from '../types/RegistrertSykmelding';
import { DiagnosekodeSystem } from '../types/Diagnosekode';
import { SchemaType } from '../components/Form/Form';
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
    buildPrognose,
    buildRegistrertSykmelding,
    buildReisetilskuddSykmelding,
    buildUtdypendeOpplysninger,
} from '../utils/registrertSykmeldingUtils';

describe('registrertSykmeldingUtils', () => {
    describe('Perioder', () => {
        describe('Avventende', () => {
            it('Returns avventende sykmelding', () => {
                const builtAvventendeSykmelding = buildAvventendeSykmelding(
                    true,
                    [new Date('10-01-2020'), new Date('10-02-2020')],
                    'Dette er et innspill til arbeidsgiver',
                );
                const expected: Periode = {
                    fom: new Date('10-01-2020'),
                    tom: new Date('10-02-2020'),
                    reisetilskudd: false,
                    avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                };
                expect(builtAvventendeSykmelding).toEqual(expected);
            });

            it('Does not return avventende sykmelding', () => {
                const builtAvventendeSykmelding = buildAvventendeSykmelding(
                    false,
                    [new Date('10-01-2020'), new Date('10-02-2020')],
                    'Dette er et innspill til arbeidsgiver',
                );
                expect(builtAvventendeSykmelding).toBeUndefined();
            });

            it('Does not return avventende sykmelding if innspill is missing', () => {
                const builtAvventendeSykmelding = buildAvventendeSykmelding(true, [
                    new Date('10-01-2020'),
                    new Date('10-02-2020'),
                ]);
                expect(builtAvventendeSykmelding).toBeUndefined();
            });
        });
        describe('Gradert', () => {
            it('Returns gradert sykmelding', () => {
                const builtGradertSykmelding = buildGradertSykmelding(
                    true,
                    true,
                    [new Date('10-01-2020'), new Date('10-02-2020')],
                    80,
                );
                const expected: Periode = {
                    fom: new Date('10-01-2020'),
                    tom: new Date('10-02-2020'),
                    reisetilskudd: false,
                    gradert: {
                        reisetilskudd: true,
                        grad: 80,
                    },
                };
                expect(builtGradertSykmelding).toEqual(expected);
            });

            it('Does not return gradert sykmelding', () => {
                const builtGradertSykmelding = buildGradertSykmelding(
                    false,
                    true,
                    [new Date('10-01-2020'), new Date('10-02-2020')],
                    80,
                );
                expect(builtGradertSykmelding).toBeUndefined();
            });
        });
        describe('Aktivitet ikke mulig', () => {
            describe('Medisinsk årsak', () => {
                it('Returns medisinsk årsak', () => {
                    const builtMedisinskArsak = buildMedisinskArsak(true, ['TILSTAND_HINDRER_AKTIVITET']);
                    const expected: MedisinskArsak = {
                        arsak: ['TILSTAND_HINDRER_AKTIVITET'],
                        beskrivelse: undefined,
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
                    expect(builtMedisinskArsak).toBeUndefined();
                });
            });

            describe('Arbeidsrelatert årsak', () => {
                it('Returns arbeidsrelatert årsak', () => {
                    const builtArbeidsrelatertArsak = buildArbeidsrelatertArsak(true, ['MANGLENDE_TILRETTELEGGING']);
                    const expected: ArbeidsrelatertArsak = {
                        arsak: ['MANGLENDE_TILRETTELEGGING'],
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
                    expect(builtArbeidsrelatertArsak).toBeUndefined();
                });
            });

            it('Return aktivitetIkkeMulig sykmelding', () => {
                const builtAktivitetIkkeMuligSykmelding = buildAktivitetIkkeMuligSykmelding(
                    true,
                    [new Date('10-01-2020'), new Date('10-02-2020')],
                    true,
                    ['AKTIVITET_FORVERRER_TILSTAND'],
                    'Kan ikke være i aktivitet pga medisin',
                    true,
                    ['MANGLENDE_TILRETTELEGGING'],
                    'Kan ikke være i aktivitet pga arbeid',
                );
                const expected: Periode = {
                    fom: new Date('10-01-2020'),
                    tom: new Date('10-02-2020'),
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
                };
                expect(builtAktivitetIkkeMuligSykmelding).toEqual(expected);
            });

            it('Does not return aktivitetIkkeMulig sykmelding', () => {
                const builtAktivitetIkkeMuligSykmelding = buildAktivitetIkkeMuligSykmelding(
                    false,
                    [new Date('10-01-2020'), new Date('10-02-2020')],
                    true,
                    ['AKTIVITET_FORVERRER_TILSTAND'],
                    'Kan ikke være i aktivitet pga medisin',
                    true,
                    ['MANGLENDE_TILRETTELEGGING'],
                    'Kan ikke være i aktivitet pga arbeid',
                );
                expect(builtAktivitetIkkeMuligSykmelding).toBeUndefined();
            });
        });
        describe('Behandlingsdager', () => {
            it('Returns behandlingsdager sykmelding', () => {
                const builtBehandlingsdagerSykmelding = buildBehandlingsdagerSykmelding(
                    true,
                    [new Date('10-01-2020'), new Date('10-02-2020')],
                    12,
                );
                const expected: Periode = {
                    fom: new Date('10-01-2020'),
                    tom: new Date('10-02-2020'),
                    reisetilskudd: false,
                    behandlingsdager: 12,
                };
                expect(builtBehandlingsdagerSykmelding).toEqual(expected);
            });

            it('Does not return behandlingsdager sykmelding', () => {
                const builtBehandlingsdagerSykmelding = buildBehandlingsdagerSykmelding(
                    false,
                    [new Date('10-01-2020'), new Date('10-02-2020')],
                    12,
                );
                expect(builtBehandlingsdagerSykmelding).toBeUndefined();
            });
        });
        describe('Reisetilskudd', () => {
            it('Returns reisetilskudd sykmelding', () => {
                const builtReisetilskuddSykmelding = buildReisetilskuddSykmelding(true, [
                    new Date('10-01-2020'),
                    new Date('10-02-2020'),
                ]);
                const expected: Periode = {
                    fom: new Date('10-01-2020'),
                    tom: new Date('10-02-2020'),
                    reisetilskudd: true,
                };
                expect(builtReisetilskuddSykmelding).toEqual(expected);
            });

            it('Does not return reisetilskudd sykmelding', () => {
                const builtReisetilskuddSykmelding = buildReisetilskuddSykmelding(false, [
                    new Date('10-01-2020'),
                    new Date('10-02-2020'),
                ]);
                expect(builtReisetilskuddSykmelding).toBeUndefined();
            });
        });

        it('Returns array containing all periods', () => {
            const schema: SchemaType = {
                yrkesskade: false,
                svangerskap: false,
                biDiagnoser: [],
                annenFraversArsak: false,
                arbeidsfoerEtterPeriode: false,
                egetArbeidPaSikt: false,
                annetArbeidPaSikt: false,
                arbeidsforPaSikt: false,
                meldingTilNavBistand: false,
                erTilbakedatert: false,
                kunneIkkeIvaretaEgneInteresser: false,
                //
                avventendeSykmelding: true,
                avventendePeriode: [new Date('10-05-2020'), new Date('11-05-2020')],
                avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                gradertSykmelding: true,
                gradertPeriode: [new Date('10-05-2020'), new Date('11-05-2020')],
                gradertReisetilskudd: true,
                aktivitetIkkeMuligSykmelding: true,
                aktivitetIkkeMuligPeriode: [new Date('10-05-2020'), new Date('11-05-2020')],
                behandlingsdagerSykmelding: true,
                behandlingsdagerPeriode: [new Date('10-05-2020'), new Date('11-05-2020')],
                behandlingsdagerAntall: 12,
                reisetilskuddSykmelding: true,
                reisetilskuddPeriode: [new Date('10-05-2020'), new Date('11-05-2020')],
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

    describe('Prognose', () => {
        it('Should return complete erIArbeid property if it exists', () => {
            const builtPrognose = buildPrognose(
                false,
                true,
                true,
                false,
                null,
                true,
                false,
                new Date('10-05-2020'),
                new Date('11-05-2020'),
                null,
                null,
            );
            const expected: Prognose = {
                arbeidsforEtterPeriode: false,
                hensynArbeidsplassen: null,
                erIArbeid: {
                    annetArbeidPaSikt: true,
                    arbeidFOM: new Date('10-05-2020'),
                    egetArbeidPaSikt: true,
                    vurderingsdato: new Date('11-05-2020'),
                },
            };
            expect(builtPrognose).toEqual(expected);
        });

        it('Should return complete erIkkeIArbeid property if it exists', () => {
            const builtPrognose = buildPrognose(
                false,
                true,
                true,
                false,
                null,
                false,
                true,
                null,
                null,
                new Date('10-05-2020'),
                new Date('11-05-2020'),
            );
            const expected: Prognose = {
                arbeidsforEtterPeriode: false,
                hensynArbeidsplassen: null,
                erIkkeIArbeid: {
                    arbeidsforPaSikt: false,
                    arbeidsforFOM: new Date('10-05-2020'),
                    vurderingsdato: new Date('11-05-2020'),
                },
            };
            expect(builtPrognose).toEqual(expected);
        });

        it('Should return complete erIArbeid and erIkkeIArbeid properties if both exist', () => {
            const builtPrognose = buildPrognose(
                false,
                true,
                true,
                false,
                null,
                true,
                true,
                new Date('10-05-2020'),
                new Date('10-06-2020'),
                new Date('10-07-2020'),
                new Date('10-08-2020'),
            );
            const expected: Prognose = {
                arbeidsforEtterPeriode: false,
                hensynArbeidsplassen: null,
                erIArbeid: {
                    annetArbeidPaSikt: true,
                    arbeidFOM: new Date('10-05-2020'),
                    egetArbeidPaSikt: true,
                    vurderingsdato: new Date('10-06-2020'),
                },
                erIkkeIArbeid: {
                    arbeidsforPaSikt: false,
                    arbeidsforFOM: new Date('10-07-2020'),
                    vurderingsdato: new Date('10-08-2020'),
                },
            };
            expect(builtPrognose).toEqual(expected);
        });

        it('Returns prognose if only arbeidsfoerEtterPeriode is present', () => {
            const builtPrognose = buildPrognose(true, false, false, false, 'Hensyn på arbeidsplassen');
            const expected: Prognose = {
                arbeidsforEtterPeriode: true,
                hensynArbeidsplassen: 'Hensyn på arbeidsplassen',
            };
            expect(builtPrognose).toEqual(expected);
        });

        it('Does not return prognose if none of neither arbeidsforeEtterPeriode nor erIArbeid nor erIkkeIArbeid are present', () => {
            const builtPrognose = buildPrognose(false, false, false, false, null, false, false);
            expect(builtPrognose).toBeUndefined();
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
                let builtDiagnose;
                try {
                    builtDiagnose = buildDiagnose(diagnose);
                } catch (error) {
                } finally {
                    expect(builtDiagnose).toEqual(diagnose);
                    expect(buildDiagnose(diagnose)).not.toThrowError;
                }
            });
            it('Should throw error if diagnose is incomplete', () => {
                const incompleteDiagnose: Partial<Diagnose> = {
                    system: DiagnosekodeSystem.ICD10,
                };
                let builtDiagnose;
                try {
                    builtDiagnose = buildDiagnose(incompleteDiagnose);
                } catch (error) {
                    expect(builtDiagnose).toThrowError;
                }
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
                let builtDiagnoser;
                try {
                    builtDiagnoser = buildDiagnoser(diagnoser);
                } catch (error) {
                } finally {
                    expect(builtDiagnoser).toEqual(diagnoser);
                    expect(builtDiagnoser).not.toThrowError;
                }
            });
            it('Should throw error if either diagnose is incomplete', () => {
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
                let builtDiagnoser;
                try {
                    builtDiagnoser = buildDiagnoser(diagnoser);
                } catch (error) {
                    expect(builtDiagnoser).toThrowError;
                }
            });
            it('Should return empty array if diagnoser undefined', () => {
                const diagnoser = undefined;
                let builtDiagnoser;
                try {
                    builtDiagnoser = buildDiagnoser(diagnoser);
                } catch (error) {
                } finally {
                    expect(builtDiagnoser).toBeEmpty;
                }
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
                expect(builtAnnenFraversArsak).toBeUndefined();
            });

            it('Should not return annenFraversArsak if arsaker is empty', () => {
                const builtAnnenFraversArsak = buildAnnenFraversArsak(true, [], 'Må være hjemme');
                expect(builtAnnenFraversArsak).toBeUndefined();
            });
        });
    });

    describe('Utdypende opplysninger', () => {
        it('Includes every utdypende opplysning if they exist', () => {
            const schema: SchemaType = {
                yrkesskade: false,
                svangerskap: false,
                biDiagnoser: [],
                annenFraversArsak: false,
                avventendeSykmelding: false,
                gradertReisetilskudd: false,
                gradertSykmelding: false,
                aktivitetIkkeMuligSykmelding: false,
                behandlingsdagerSykmelding: false,
                reisetilskuddSykmelding: false,
                arbeidsfoerEtterPeriode: false,
                egetArbeidPaSikt: false,
                annetArbeidPaSikt: false,
                arbeidsforPaSikt: false,
                meldingTilNavBistand: false,
                erTilbakedatert: false,
                kunneIkkeIvaretaEgneInteresser: false,
                //
                utdypende611: '611',
                utdypende612: '612',
                utdypende613: '613',
                utdypende614: '614',
                utdypende615: '615',
                utdypende621: '621',
                utdypende622: '622',
                utdypende623: '623',
                utdypende624: '624',
                utdypende631: '631',
                utdypende632: '632',
                utdypende641: '641',
                utdypende642: '642',
                utdypende643: '643',
                utdypende651: '651',
                utdypende652: '652',
                utdypende653: '653',
                utdypende654: '654',
                utdypende661: '661',
                utdypende662: '662',
                utdypende663: '663',
            };

            const expected: UtdypendeOpplysningerReturn = {
                '6.1': {
                    '6.1.1': '611',
                    '6.1.2': '612',
                    '6.1.3': '613',
                    '6.1.4': '614',
                    '6.1.5': '615',
                },
                '6.2': {
                    '6.2.1': '621',
                    '6.2.2': '622',
                    '6.2.3': '623',
                    '6.2.4': '624',
                },
                '6.3': {
                    '6.3.1': '631',
                    '6.3.2': '632',
                },
                '6.4': {
                    '6.4.1': '641',
                    '6.4.2': '642',
                    '6.4.3': '643',
                },
                '6.5': {
                    '6.5.1': '651',
                    '6.5.2': '652',
                    '6.5.3': '653',
                    '6.5.4': '654',
                },
                '6.6': {
                    '6.6.1': '661',
                    '6.6.2': '662',
                    '6.6.3': '663',
                },
            };

            expect(buildUtdypendeOpplysninger(schema)).toEqual(expected);
        });

        it("Does not include utdypende opplysninger if they don't exist", () => {
            const schema: SchemaType = {
                yrkesskade: false,
                svangerskap: false,
                biDiagnoser: [],
                annenFraversArsak: false,
                avventendeSykmelding: false,
                gradertReisetilskudd: false,
                gradertSykmelding: false,
                aktivitetIkkeMuligSykmelding: false,
                behandlingsdagerSykmelding: false,
                reisetilskuddSykmelding: false,
                arbeidsfoerEtterPeriode: false,
                egetArbeidPaSikt: false,
                annetArbeidPaSikt: false,
                arbeidsforPaSikt: false,
                meldingTilNavBistand: false,
                erTilbakedatert: false,
                kunneIkkeIvaretaEgneInteresser: false,
            };

            const expected: UtdypendeOpplysningerReturn = {
                '6.1': {
                    '6.1.1': undefined,
                    '6.1.2': undefined,
                    '6.1.3': undefined,
                    '6.1.4': undefined,
                    '6.1.5': undefined,
                },
                '6.2': {
                    '6.2.1': undefined,
                    '6.2.2': undefined,
                    '6.2.3': undefined,
                    '6.2.4': undefined,
                },
                '6.3': {
                    '6.3.1': undefined,
                    '6.3.2': undefined,
                },
                '6.4': {
                    '6.4.1': undefined,
                    '6.4.2': undefined,
                    '6.4.3': undefined,
                },
                '6.5': {
                    '6.5.1': undefined,
                    '6.5.2': undefined,
                    '6.5.3': undefined,
                    '6.5.4': undefined,
                },
                '6.6': {
                    '6.6.1': undefined,
                    '6.6.2': undefined,
                    '6.6.3': undefined,
                },
            };

            expect(buildUtdypendeOpplysninger(schema)).toEqual(expected);
        });
    });

    describe('buildRegistrertSykmelding', () => {
        it('Builds complete registrert sykmelding object', () => {
            const schema: SchemaType = {
                pasientFnr: '12345678910',
                syketilfelleStartDato: new Date(),
                behandletDato: new Date(),
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
                avventendeSykmelding: true,
                avventendePeriode: [new Date(), new Date()],
                avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                gradertReisetilskudd: true,
                gradertSykmelding: true,
                gradertPeriode: [new Date(), new Date()],
                gradertGrad: 80,
                aktivitetIkkeMuligSykmelding: true,
                aktivitetIkkeMuligPeriode: [new Date(), new Date()],
                aktivitetIkkeMuligMedisinskArsak: true,
                aktivitetIkkeMuligMedisinskArsakType: ['AKTIVITET_FORHINDRER_BEDRING', 'ANNET'],
                aktivitetIkkeMuligMedisinskArsakBeskrivelse: 'Medisinsk beskrivelse',
                aktivitetIkkeMuligArbeidsrelatertArsak: true,
                aktivitetIkkeMuligArbeidsrelatertArsakType: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: 'Arbeidsrelatert beskrivelse',
                behandlingsdagerSykmelding: true,
                behandlingsdagerPeriode: [new Date(), new Date()],
                behandlingsdagerAntall: 20,
                reisetilskuddSykmelding: true,
                reisetilskuddPeriode: [new Date(), new Date()],
                arbeidsfoerEtterPeriode: true,
                hensynArbeidsplassen: 'Hensyn på arbeidsplassen',
                erIArbeid: true,
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: true,
                arbeidFOM: new Date(),
                vurderingsDatoIArbeid: new Date(),
                erIkkeIArbeid: true,
                arbeidsforPaSikt: true,
                arbeidsforFOM: new Date(),
                vurderingsDatoUtenArbeid: new Date(),
                tiltakArbeidsplassen: 'Tiltak arbeidsplassen',
                tiltakNav: 'Tiltak NAV',
                andreTiltak: 'Andre tiltak',
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
                kontaktDato: new Date('01-02-2020'),
                kunneIkkeIvaretaEgneInteresser: true,
                begrunnelseIkkeKontakt: 'Pasienten hadde omgangssjuke',
                utdypende611: '611',
                utdypende612: '612',
                utdypende613: '613',
                utdypende614: '614',
                utdypende615: '615',
                utdypende621: '621',
                utdypende622: '622',
                utdypende623: '623',
                utdypende624: '624',
                utdypende631: '631',
                utdypende632: '632',
                utdypende641: '641',
                utdypende642: '642',
                utdypende643: '643',
                utdypende651: '651',
                utdypende652: '652',
                utdypende653: '653',
                utdypende654: '654',
                utdypende661: '661',
                utdypende662: '662',
                utdypende663: '663',
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
                        fom: schema.avventendePeriode![0],
                        tom: schema.avventendePeriode![1],
                        avventendeInnspillTilArbeidsgiver: schema.avventendeInnspillTilArbeidsgiver,
                        reisetilskudd: false,
                    },
                    {
                        fom: schema.gradertPeriode![0],
                        tom: schema.gradertPeriode![1],
                        gradert: {
                            grad: schema.gradertGrad,
                            reisetilskudd: schema.gradertReisetilskudd!,
                        },
                        reisetilskudd: false,
                    },
                    {
                        fom: schema.aktivitetIkkeMuligPeriode![0],
                        tom: schema.aktivitetIkkeMuligPeriode![1],
                        aktivitetIkkeMulig: {
                            medisinskArsak: {
                                arsak: schema.aktivitetIkkeMuligMedisinskArsakType!,
                                beskrivelse: schema.aktivitetIkkeMuligMedisinskArsakBeskrivelse,
                            },
                            arbeidsrelatertArsak: {
                                arsak: schema.aktivitetIkkeMuligArbeidsrelatertArsakType!,
                                beskrivelse: schema.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
                            },
                        },
                        reisetilskudd: false,
                    },
                    {
                        fom: schema.behandlingsdagerPeriode![0],
                        tom: schema.behandlingsdagerPeriode![1],
                        behandlingsdager: schema.behandlingsdagerAntall,
                        reisetilskudd: false,
                    },
                    {
                        fom: schema.reisetilskuddPeriode![0],
                        tom: schema.reisetilskuddPeriode![1],
                        reisetilskudd: true,
                    },
                ],
                prognose: {
                    arbeidsforEtterPeriode: schema.arbeidsfoerEtterPeriode,
                    hensynArbeidsplassen: schema.hensynArbeidsplassen,
                    erIArbeid: {
                        annetArbeidPaSikt: schema.annetArbeidPaSikt,
                        arbeidFOM: schema.arbeidFOM,
                        egetArbeidPaSikt: schema.egetArbeidPaSikt,
                        vurderingsdato: schema.vurderingsDatoIArbeid,
                    },
                    erIkkeIArbeid: {
                        arbeidsforPaSikt: schema.arbeidsforPaSikt,
                        arbeidsforFOM: schema.arbeidsforFOM,
                        vurderingsdato: schema.vurderingsDatoUtenArbeid,
                    },
                },
                utdypendeOpplysninger: {
                    '6.1': {
                        '6.1.1': '611',
                        '6.1.2': '612',
                        '6.1.3': '613',
                        '6.1.4': '614',
                        '6.1.5': '615',
                    },
                    '6.2': {
                        '6.2.1': '621',
                        '6.2.2': '622',
                        '6.2.3': '623',
                        '6.2.4': '624',
                    },
                    '6.3': {
                        '6.3.1': '631',
                        '6.3.2': '632',
                    },
                    '6.4': {
                        '6.4.1': '641',
                        '6.4.2': '642',
                        '6.4.3': '643',
                    },
                    '6.5': {
                        '6.5.1': '651',
                        '6.5.2': '652',
                        '6.5.3': '653',
                        '6.5.4': '654',
                    },
                    '6.6': {
                        '6.6.1': '661',
                        '6.6.2': '662',
                        '6.6.3': '663',
                    },
                },
                tiltakArbeidsplassen: schema.tiltakArbeidsplassen,
                tiltakNAV: schema.tiltakNav,
                andreTiltak: schema.andreTiltak,
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
                sykmelderFnr: schema.sykmelderFnr!,
                behandler: {
                    fnr: schema.sykmelderFnr!,
                    fornavn: schema.sykmeldersFornavn!,
                    etternavn: schema.sykmeldersEtternavn!,
                    hpr: schema.hpr,
                    aktoerId: schema.aktoerId!,
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

            expect(buildRegistrertSykmelding(schema)).toEqual(expected);
        });
    });
});
