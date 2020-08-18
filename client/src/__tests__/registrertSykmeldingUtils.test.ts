import {
    AnnenFraversArsak,
    Arbeidsgiver,
    Behandler,
    Diagnose,
    KontaktMedPasient,
    Periode,
    Prognose,
    UtdypendeOpplysningerReturn,
} from '../types/RegistrertSykmelding';
import { DiagnosekodeSystem } from '../types/Diagnosekode';
import { SchemaType } from '../components/Form/Form';
import {
    buildAktivitetIkkeMuligSykmelding,
    buildAnnenFraversArsak,
    buildAvventendeSykmelding,
    buildBehandlingsdagerSykmelding,
    buildDiagnose,
    buildDiagnoser,
    buildGradertSykmelding,
    buildPrognose,
    buildRegistrertSykmelding,
    buildReisetilskuddSykmelding,
    buildUtdypendeOpplysninger,
} from '../utils/registrertSykmeldingUtils';

describe('registrertSykmeldingUtils', () => {
    describe('buildPerioder', () => {
        describe('buildAvventendeSykmelding', () => {
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
        });
        describe('buildGradertSykmelding', () => {
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
        });
        describe('buildAktivitetIkkeMuligSykmelding', () => {
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
        });
        describe('buildBehandlingsdagerSykmelding', () => {
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
        });
        describe('buildReisetilskuddSykmelding', () => {
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
        });
    });
    describe('buildPrognose', () => {
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
    });

    describe('buildAnnenFraversArsak', () => {
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
    });

    describe('buildDiagnose', () => {
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

    describe('buildDiagnoser', () => {
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

    describe('buildUtdypendeOpplysninger', () => {
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
    });

    describe('buildRegistrertSykmelding', () => {
        it('Includes arbeidsgiver', () => {
            const schema: SchemaType = {
                pasientFnr: '12345678910',
                sykmelderFnr: '12345678910',
                aktoerId: '1245',
                sykmeldersEtternavn: 'Legesen',
                sykmeldersFornavn: 'Lege',
                syketilfelleStartDato: new Date(),
                behandletDato: new Date(),
                skjermesForPasient: false,
                yrkesskade: false,
                svangerskap: false,
                hovedDiagnose: {
                    system: DiagnosekodeSystem.ICD10,
                    kode: 'A001',
                    tekst: 'Diagnosetekst',
                },
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
                harArbeidsgiver: 'EN_ARBEIDSGIVER',
                arbeidsgiverNavn: 'Olav Normann',
                yrkesbetegnelse: 'Brannmann',
                stillingsprosent: 100,
            };

            const expected: Arbeidsgiver = {
                harArbeidsgiver: 'EN_ARBEIDSGIVER',
                navn: 'Olav Normann',
                yrkesbetegnelse: 'Brannmann',
                stillingsprosent: 100,
            };

            expect(buildRegistrertSykmelding(schema)?.arbeidsgiver).toEqual(expected);
        });

        it('Includes behandler', () => {
            const schema: SchemaType = {
                pasientFnr: '12345678910',
                syketilfelleStartDato: new Date(),
                behandletDato: new Date(),
                skjermesForPasient: false,
                yrkesskade: false,
                svangerskap: false,
                hovedDiagnose: {
                    system: DiagnosekodeSystem.ICD10,
                    kode: 'A001',
                    tekst: 'Diagnosetekst',
                },
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
                harArbeidsgiver: 'EN_ARBEIDSGIVER',
                //
                sykmelderFnr: '12345678910',
                aktoerId: '54321',
                sykmeldersEtternavn: 'Legesen',
                sykmeldersFornavn: 'Lege',
                hpr: '12345',
                sykmelderGate: 'Gatenavn',
                sykmelderKommune: 'Kommune',
                sykmelderLand: 'Noreg',
                sykmelderPostboks: '1234',
                sykmelderPostnummer: 4321,
                sykmelderTelefon: '12345678',
            };

            const expected: Behandler = {
                fnr: '12345678910',
                fornavn: 'Lege',
                etternavn: 'Legesen',
                hpr: '12345',
                aktoerId: '54321',
                adresse: {
                    gate: 'Gatenavn',
                    kommune: 'Kommune',
                    postboks: '1234',
                    postnummer: 4321,
                    land: 'Noreg',
                },
                tlf: '12345678',
            };

            expect(buildRegistrertSykmelding(schema)?.behandler).toEqual(expected);
        });

        it('Includes kontakMedPasient', () => {
            const schema: SchemaType = {
                pasientFnr: '12345678910',
                syketilfelleStartDato: new Date(),
                behandletDato: new Date(),
                skjermesForPasient: false,
                yrkesskade: false,
                svangerskap: false,
                hovedDiagnose: {
                    system: DiagnosekodeSystem.ICD10,
                    kode: 'A001',
                    tekst: 'Diagnosetekst',
                },
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
                harArbeidsgiver: 'EN_ARBEIDSGIVER',
                sykmelderFnr: '12345678910',
                aktoerId: '54321',
                sykmeldersEtternavn: 'Legesen',
                sykmeldersFornavn: 'Lege',
                //
                erTilbakedatert: true,
                kontaktDato: new Date('01-02-2020'),
                kunneIkkeIvaretaEgneInteresser: false,
                begrunnelseIkkeKontakt: 'Pasienten hadde omgangssjuke',
            };

            const expected: KontaktMedPasient = {
                kontaktDato: new Date('01-02-2020'),
                begrunnelseIkkeKontakt: 'Pasienten hadde omgangssjuke',
            };

            expect(buildRegistrertSykmelding(schema)?.kontaktMedPasient).toEqual(expected);
        });
    });
});
