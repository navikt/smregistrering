import { Diagnose, Periode, Prognose } from '../types/RegistrertSykmelding';
import { DiagnosekodeSystem } from '../types/Diagnosekode';
import {
    buildAktivitetIkkeMuligSykmelding,
    buildAvventendeSykmelding,
    buildBehandlingsdagerSykmelding,
    buildDiagnose,
    buildDiagnoser,
    buildGradertSykmelding,
    buildPrognose,
    buildReisetilskuddSykmelding,
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
});
