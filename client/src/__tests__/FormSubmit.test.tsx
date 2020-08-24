import React from 'react';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import FormSubmit from '../components/Form/components/FormSubmit';
import { DiagnosekodeSystem } from '../types/Diagnosekode';
import { SchemaType } from '../components/Form/Form';

const oppgave = require('../mock/oppgave.json');

// Represents the form-object filled out by the user
const schema: SchemaType = {
    pasientFnr: '12345678910',
    sykmelderFnr: '12345678920',
    aktoerId: '12345',
    sykmeldersEtternavn: 'Legesen',
    sykmeldersFornavn: 'Lege',
    harArbeidsgiver: 'EN_ARBEIDSGIVER',
    syketilfelleStartDato: new Date('2018-11-29'),
    behandletDato: new Date('2018-12-29'),
    annenFraversArsak: false,
    avventendeSykmelding: false,
    gradertSykmelding: false,
    gradertReisetilskudd: false,
    aktivitetIkkeMuligSykmelding: false,
    behandlingsdagerSykmelding: false,
    reisetilskuddSykmelding: false,
    hovedDiagnose: {
        system: DiagnosekodeSystem.ICPC2,
        kode: 'F001',
        tekst: 'diagnosetekst',
    },
    biDiagnoser: [],
    yrkesskade: false,
    skjermesForPasient: false,
    svangerskap: false,
    erTilbakedatert: false,
    meldingTilNavBistand: false,
    arbeidsfoerEtterPeriode: false,
    egetArbeidPaSikt: false,
    annetArbeidPaSikt: false,
    arbeidsforPaSikt: false,
    kunneIkkeIvaretaEgneInteresser: false,
    sykmelderGate: 'Gateveien',
    sykmelderLand: 'Norge',
    sykmelderKommune: 'Oslo',
    sykmelderPostboks: '7064',
    sykmelderPostnummer: 1230,
    sykmelderTelefon: '45000022',
    utdypende611: 'Dette er utdypende opplysnigner 6.1.1',
    utdypende612: 'Dette er utdypende opplysnigner 6.1.2',
    utdypende613: 'Dette er utdypende opplysnigner 6.1.3',
    utdypende614: 'Dette er utdypende opplysnigner 6.1.4',
    utdypende615: 'Dette er utdypende opplysnigner 6.1.5',
    utdypende621: 'Dette er utdypende opplysnigner 6.2.1',
    utdypende622: 'Dette er utdypende opplysnigner 6.2.2',
    utdypende623: 'Dette er utdypende opplysnigner 6.2.3',
    utdypende624: 'Dette er utdypende opplysnigner 6.2.4',
    utdypende631: 'Dette er utdypende opplysnigner 6.3.1',
    utdypende632: 'Dette er utdypende opplysnigner 6.3.2',
    utdypende641: 'Dette er utdypende opplysnigner 6.4.1',
    utdypende642: 'Dette er utdypende opplysnigner 6.4.2',
    utdypende643: 'Dette er utdypende opplysnigner 6.4.3',
    utdypende651: 'Dette er utdypende opplysnigner 6.5.1',
    utdypende652: 'Dette er utdypende opplysnigner 6.5.2',
    utdypende653: 'Dette er utdypende opplysnigner 6.5.3',
    utdypende654: 'Dette er utdypende opplysnigner 6.5.4',
    utdypende661: 'Dette er utdypende opplysnigner 6.6.1',
    utdypende662: 'Dette er utdypende opplysnigner 6.6.2',
    utdypende663: 'Dette er utdypende opplysnigner 6.6.3',
};

// Represents the object sent to the API
const registrertSykmelding: any = {
    arbeidsgiver: {
        harArbeidsgiver: 'EN_ARBEIDSGIVER',
    },
    behandler: {
        adresse: {
            gate: 'Gateveien',
            kommune: 'Oslo',
            postnummer: 1230,
            postboks: '7064',
            land: 'Norge',
        },
        aktoerId: '12345',
        etternavn: 'Legesen',
        fnr: '12345678920',
        fornavn: 'Lege',
        tlf: '45000022',
    },
    behandletDato: '2018-12-29',
    kontaktMedPasient: {},
    medisinskVurdering: {
        hovedDiagnose: {
            kode: 'F001',
            system: '2.16.578.1.12.4.1.1.7170',
            tekst: 'diagnosetekst',
        },
        biDiagnoser: [],
        svangerskap: false,
        yrkesskade: false,
    },
    meldingTilNAV: {
        bistandUmiddelbart: false,
    },
    pasientFnr: '12345678910',
    perioder: [],
    skjermesForPasient: false,
    syketilfelleStartDato: '2018-11-29',
    sykmelderFnr: '12345678920',
    utdypendeOpplysninger: {
        '6.1': {
            '6.1.1': 'Dette er utdypende opplysnigner 6.1.1',
            '6.1.2': 'Dette er utdypende opplysnigner 6.1.2',
            '6.1.3': 'Dette er utdypende opplysnigner 6.1.3',
            '6.1.4': 'Dette er utdypende opplysnigner 6.1.4',
            '6.1.5': 'Dette er utdypende opplysnigner 6.1.5',
        },
        '6.2': {
            '6.2.1': 'Dette er utdypende opplysnigner 6.2.1',
            '6.2.2': 'Dette er utdypende opplysnigner 6.2.2',
            '6.2.3': 'Dette er utdypende opplysnigner 6.2.3',
            '6.2.4': 'Dette er utdypende opplysnigner 6.2.4',
        },
        '6.3': {
            '6.3.1': 'Dette er utdypende opplysnigner 6.3.1',
            '6.3.2': 'Dette er utdypende opplysnigner 6.3.2',
        },
        '6.4': {
            '6.4.1': 'Dette er utdypende opplysnigner 6.4.1',
            '6.4.2': 'Dette er utdypende opplysnigner 6.4.2',
            '6.4.3': 'Dette er utdypende opplysnigner 6.4.3',
        },
        '6.5': {
            '6.5.1': 'Dette er utdypende opplysnigner 6.5.1',
            '6.5.2': 'Dette er utdypende opplysnigner 6.5.2',
            '6.5.3': 'Dette er utdypende opplysnigner 6.5.3',
            '6.5.4': 'Dette er utdypende opplysnigner 6.5.4',
        },
        '6.6': {
            '6.6.1': 'Dette er utdypende opplysnigner 6.6.1',
            '6.6.2': 'Dette er utdypende opplysnigner 6.6.2',
            '6.6.3': 'Dette er utdypende opplysnigner 6.6.3',
        },
    },
};

const validateAll = jest.fn(() => true);
const focusErrorSummary = jest.fn();

describe('FormSubmit', () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    beforeEach(() => {
        jest.spyOn(window, 'confirm').mockImplementation(() => true);
        jest.spyOn(window, 'alert').mockImplementation();
        spy = new SpyMiddleware();
        mock = FetchMock.configure({
            middleware: spy.middleware,
        });
        mock.put('backend/api/v1/sendPapirSykmeldingManuellOppgave/', () => Promise.resolve({ status: 204 }));
        expect(spy.size()).toBe(0);
    });

    afterEach(() => {
        mock.restore();
    });

    it('Should make a PUT request to correct endpoint', async () => {
        const { getByText } = render(
            <FormSubmit
                oppgave={oppgave}
                schema={schema}
                validateAll={validateAll}
                focusErrorSummary={focusErrorSummary}
            />,
        );
        expect(getByText('Informasjonen stemmer overens med papirsykmelding')).toBeInTheDocument();
        expect(getByText('Registrer sykmelding')).toBeInTheDocument();
        act(() => {
            fireEvent.click(getByText('Informasjonen stemmer overens med papirsykmelding'));
        });
        act(() => {
            fireEvent.click(getByText('Registrer sykmelding'));
        });
        expect(validateAll).toHaveBeenCalled();

        await waitFor(() =>
            expect(window.confirm).toHaveBeenCalledWith('Oppgaven ble ferdigstilt. Vil du sendes tilbake til GOSYS?'),
        );
        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Kunne ikke sende deg tilbake til gosys'));

        expect(spy.size()).toBe(1);
        expect(spy.lastUrl()).toBe(`backend/api/v1/sendPapirSykmeldingManuellOppgave/?oppgaveid=${oppgave.oppgaveid}`);
        expect(spy.lastCall()?.request.body).toEqual(registrertSykmelding);
    });
});
