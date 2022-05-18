import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import Index from '../pages/App';
import { mockBehandlerinfo, mockLocation, mockPasientinfo } from '../utils/testUtils';

import emptyOppgave from './testData/emptyOppgave.json';

describe('Submit oppgave', () => {
    const oppgaveid = 123;
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockLocation(oppgaveid);
        mockPasientinfo(apiNock);
        mockBehandlerinfo(apiNock);
    });

    it('Should be able to fill out and submit form', async () => {
        apiNock.get(`/backend/api/v1/oppgave/${oppgaveid}`).reply(200, emptyOppgave);
        apiNock
            .post(`/backend/api/v1/oppgave/${oppgaveid}/send`, (body) => {
                expect(body).toEqual({
                    pasientFnr: '12345678910',
                    sykmelderFnr: '',
                    perioder: [
                        {
                            aktivitetIkkeMulig: null,
                            avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                            behandlingsdager: null,
                            fom: '2020-01-01',
                            gradert: null,
                            reisetilskudd: false,
                            tom: '2020-01-03',
                        },
                        {
                            aktivitetIkkeMulig: null,
                            avventendeInnspillTilArbeidsgiver: null,
                            behandlingsdager: null,
                            fom: '2020-02-01',
                            gradert: { reisetilskudd: true, grad: 80 },
                            reisetilskudd: false,
                            tom: '2020-02-03',
                        },
                        {
                            aktivitetIkkeMulig: {
                                medisinskArsak: {
                                    arsak: ['TILSTAND_HINDRER_AKTIVITET'],
                                    beskrivelse: 'Medisinsk beskrivelse',
                                },
                                arbeidsrelatertArsak: {
                                    arsak: ['MANGLENDE_TILRETTELEGGING'],
                                    beskrivelse: 'Arbeidsrelatert beskrivelse',
                                },
                            },
                            avventendeInnspillTilArbeidsgiver: null,
                            behandlingsdager: null,
                            fom: '2020-03-01',
                            gradert: null,
                            reisetilskudd: false,
                            tom: '2020-03-03',
                        },
                        {
                            aktivitetIkkeMulig: null,
                            avventendeInnspillTilArbeidsgiver: null,
                            behandlingsdager: 1,
                            fom: '2020-04-01',
                            gradert: null,
                            reisetilskudd: false,
                            tom: '2020-04-03',
                        },
                        {
                            aktivitetIkkeMulig: null,
                            avventendeInnspillTilArbeidsgiver: null,
                            behandlingsdager: null,
                            fom: '2020-05-01',
                            gradert: null,
                            reisetilskudd: true,
                            tom: '2020-05-03',
                        },
                    ],
                    medisinskVurdering: {
                        svangerskap: true,
                        yrkesskade: true,
                        yrkesskadeDato: '2020-01-01',
                        hovedDiagnose: {
                            system: '2.16.578.1.12.4.1.1.7110',
                            kode: 'A000',
                            tekst: 'Kolera som skyldes Vibrio cholerae 01, biovar cholerae',
                        },
                        biDiagnoser: [
                            {
                                system: '2.16.578.1.12.4.1.1.7110',
                                kode: 'A000',
                                tekst: 'Kolera som skyldes Vibrio cholerae 01, biovar cholerae',
                            },
                        ],
                        annenFraversArsak: {
                            grunn: ['GODKJENT_HELSEINSTITUSJON'],
                            beskrivelse: 'Dette er en beskrivelse av fraværet',
                        },
                    },
                    arbeidsgiver: {
                        harArbeidsgiver: 'EN_ARBEIDSGIVER',
                        navn: 'Politiet',
                        yrkesbetegnelse: 'Politibetjent',
                        stillingsprosent: 25,
                    },
                    behandletDato: '2020-02-01',
                    skjermesForPasient: true,
                    behandler: {
                        fnr: '',
                        fornavn: '',
                        mellomnavn: null,
                        etternavn: '',
                        hpr: '1234567',
                        her: null,
                        aktoerId: '',
                        adresse: {
                            gate: null,
                            postnummer: null,
                            kommune: null,
                            postboks: null,
                            land: null,
                        },
                        tlf: '12345678',
                    },
                    harUtdypendeOpplysninger: true,
                    meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
                    meldingTilNAV: { bistandUmiddelbart: true, beskrivBistand: 'Melding til NAV' },
                    kontaktMedPasient: {
                        kontaktDato: '2020-10-15',
                        begrunnelseIkkeKontakt: 'Hadde omgangssyke',
                    },
                    syketilfelleStartDato: null,
                    navnFastlege: null,
                });
                return true;
            })
            .reply(204);

        render(
            <div id="root">
                <Index height={700} enhet={'0314'} />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));

        // await waitForElementToBeRemoved(() => screen.queryByText('Henter informasjon om pasient'));

        // 1 Pasientopplysninger
        userEvent.type(screen.getByLabelText('1.2 Fødselsnummer (11 siffer)'), '12345678910');

        // 2 Arbeidsgiver
        userEvent.selectOptions(screen.getByLabelText('2.1 Pasienten har'), 'Én arbeidsgiver');
        userEvent.type(screen.getByLabelText('2.2 Arbeidsgiver for denne sykmeldingen'), 'Politiet');
        userEvent.type(screen.getByLabelText('2.3 Yrke/stilling for dette arbeidsforholdet'), 'Politibetjent');
        userEvent.type(screen.getByLabelText('2.4 Stillingsprosent'), '25');

        // 3 Diagnose
        userEvent.type(screen.getByLabelText('3.1.2 Kode'), 'A000{enter}');
        userEvent.click(screen.getByRole('button', { name: 'Legg til bidiagnose' }));
        userEvent.type(screen.getByLabelText('3.2.2 Kode'), 'A000{enter}');
        userEvent.click(screen.getByRole('checkbox', { name: /Annen lovfestet fraværsgrunn/ }));
        userEvent.click(
            screen.getByRole('checkbox', { name: /Når vedkommende er innlagt i en godkjent helseinstitusjon/ }),
        );
        userEvent.type(
            screen.getByLabelText('3.3.2 Beskriv fravær (valgfritt)'),
            'Dette er en beskrivelse av fraværet',
        );
        userEvent.click(screen.getByRole('checkbox', { name: /Sykdommen er svangerskapsrelatert/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Sykmeldingen kan skyldes en yrkesskade/ }));
        userEvent.type(screen.getByLabelText('3.6 Eventuell skadedato'), '010120{enter}');
        userEvent.click(screen.getByRole('checkbox', { name: /nødvendig å skjerme pasienten/ }));

        // 4 Mulighet for arbeid
        userEvent.selectOptions(screen.getByLabelText('Periodetype'), '4.1 Avventende sykmelding');
        userEvent.type(screen.getByLabelText('F.o.m - t.o.m'), '010120-030120{enter}');
        userEvent.type(screen.getByLabelText('Andre innspill til arbeidsgiver'), 'Innspill til arbeidsgiver');

        userEvent.click(screen.getByRole('button', { name: 'Legg til periode' }));

        userEvent.selectOptions(screen.getAllByLabelText('Periodetype')[1], '4.2 Gradert sykmelding');
        userEvent.type(screen.getByLabelText('Oppgi grad'), '80{enter}');
        userEvent.type(screen.getAllByLabelText('F.o.m - t.o.m')[1], '010220-030220{enter}');
        userEvent.click(screen.getByRole('checkbox', { name: /Pasienten kan være delvis i arbeid/ }));

        userEvent.click(screen.getByRole('button', { name: 'Legg til periode' }));

        userEvent.selectOptions(screen.getAllByLabelText('Periodetype')[2], '4.3 100% sykmelding');
        userEvent.type(screen.getAllByLabelText('F.o.m - t.o.m')[2], '010320-030320{enter}');
        userEvent.click(screen.getByRole('checkbox', { name: /Det er medisinske årsaker/ }));
        userEvent.click(
            screen.getByRole('checkbox', { name: /Helsetilstanden hindrer pasienten i å være i aktivitet/ }),
        );
        userEvent.type(screen.getByLabelText('Beskrivelse'), 'Medisinsk beskrivelse');
        userEvent.click(
            screen.getByRole('checkbox', { name: /Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet/ }),
        );
        userEvent.click(screen.getByRole('checkbox', { name: /Manglende tilrettelegging på arbeidsplassen/ }));
        userEvent.type(screen.getAllByLabelText('Beskrivelse')[1], 'Arbeidsrelatert beskrivelse');

        userEvent.click(screen.getByRole('button', { name: 'Legg til periode' }));

        userEvent.selectOptions(screen.getAllByLabelText('Periodetype')[3], '4.4 Behandlingsdager');
        userEvent.type(screen.getAllByLabelText('F.o.m - t.o.m')[3], '010420-030420{enter}');
        userEvent.type(screen.getByLabelText('Oppgi antall dager i perioden'), '1{enter}');

        userEvent.click(screen.getByRole('button', { name: 'Legg til periode' }));

        userEvent.selectOptions(screen.getAllByLabelText('Periodetype')[4], '4.5 Reisetilskudd');
        userEvent.type(screen.getAllByLabelText('F.o.m - t.o.m')[4], '010520-030520{enter}');

        // 6 Utdypende opplysninger
        userEvent.click(screen.getByRole('checkbox', { name: /Sykmeldingen har utdypende opplysninger/ }));

        // 8 Melding til NAV
        userEvent.click(screen.getByRole('checkbox', { name: /Ønskes bistand fra NAV nå?/ }));
        userEvent.type(screen.getByRole('textbox', { name: 'Begrunn nærmere' }), 'Melding til NAV');

        // 9 Melding til arbeidsgiver
        userEvent.type(
            screen.getByRole('textbox', { name: '9.1 Andre innspill til arbeidsgiveren' }),
            'Melding til arbeidsgiver',
        );

        // 10 Tilbakdedatering
        userEvent.click(screen.getByRole('checkbox', { name: /Er sykmeldingen tilbakedatert?/ }));
        userEvent.type(screen.getByLabelText('Oppgi dato for dokumenterbar kontakt med pasienten'), '151020{enter}');
        userEvent.click(screen.getByRole('checkbox', { name: /Pasienten har ikke kunnet ivareta egne interesser/ }));
        userEvent.type(screen.getByLabelText('Begrunn'), 'Hadde omgangssyke');

        // 12 Behandler
        userEvent.type(screen.getByLabelText('12.1 Behandletdato'), '010220{enter}');
        userEvent.type(screen.getByRole('textbox', { name: /12.4 HPR-nummer/ }), '1234567');
        userEvent.type(screen.getByRole('textbox', { name: '12.5 Telefon' }), '12345678');

        // ----- REGISTRATION -----
        userEvent.click(screen.getByRole('checkbox', { name: /Feltene stemmer overens/ }));
        userEvent.click(screen.getByRole('button', { name: 'Registrer sykmeldingen' }));
    });
});
