import { DiagnosekodeSystem } from '../types/Diagnosekode';
import { HarArbeidsgiver, RegistrertSykmelding } from '../types/RegistrertSykmelding';

describe('RegistrertSykmelding', () => {
    it('Encodes sykmelding dates to ISO date string', () => {
        const sykmelding: RegistrertSykmelding = {
            pasientFnr: '12345678910',
            sykmelderFnr: '12345678910',
            behandler: {
                fornavn: 'lege',
                etternavn: 'legesen',
                fnr: '12345678910',
                aktoerId: '1234',
            },
            perioder: [
                {
                    fom: new Date('2020-04-22T14:12:25.731Z'),
                    tom: new Date('2020-04-22T14:12:25.731Z'),
                    reisetilskudd: false,
                },
            ],
            medisinskVurdering: {
                svangerskap: false,
                yrkesskade: false,
                hovedDiagnose: {
                    system: DiagnosekodeSystem.ICD10,
                    kode: 'A001',
                    tekst: 'Diagnosetekst',
                },
                biDiagnoser: [
                    {
                        system: DiagnosekodeSystem.ICD10,
                        kode: 'A001',
                        tekst: 'Diagnosetekst',
                    },
                ],
            },
            syketilfelleStartDato: new Date('2020-04-22T14:12:25.731Z'),
            arbeidsgiver: {
                harArbeidsgiver: 'EN_ARBEIDSGIVER',
            },
            behandletDato: new Date('2020-04-22T14:12:25.731Z'),
            skjermesForPasient: false,
            kontaktMedPasient: {},
        };
        const encodedSykmelding = RegistrertSykmelding.encode(sykmelding);
        expect(encodedSykmelding.behandletDato).toBe('2020-04-22');
    });
});
