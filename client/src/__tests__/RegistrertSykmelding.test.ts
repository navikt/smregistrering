import { HarArbeidsgiver, RegistrertSykmelding } from '../types/RegistrertSykmelding';

describe('RegistrertSykmelding', () => {
    it('Encodes sykmelding dates to ISO date string', () => {
        const sykmelding: RegistrertSykmelding = {
            pasientFnr: '12345678910',
            sykmelderFnr: '12345678910',
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
                biDiagnoser: [],
            },
            syketilfelleStartDato: new Date('2020-04-22T14:12:25.731Z'),
            arbeidsgiver: {
                harArbeidsgiver: HarArbeidsgiver.EN_ARBEIDSGIVER,
            },
            behandletDato: new Date('2020-04-22T14:12:25.731Z'),
            skjermesForPasient: false,
        };
        const encodedSykmelding = RegistrertSykmelding.encode(sykmelding);
        expect(encodedSykmelding.behandletDato).toBe('2020-04-22T14:12:25.731Z');
    });
});
