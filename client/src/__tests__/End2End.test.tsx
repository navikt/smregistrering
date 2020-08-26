import React from 'react';
import dayjs from 'dayjs';
import user from '@testing-library/user-event';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import { render, waitForElementToBeRemoved } from '@testing-library/react';

import App from '../App';
import { AnnenFraverGrunn, ArbeidsrelatertArsakType, MedisinskArsakType, Periode } from '../types/RegistrertSykmelding';

const oppgave = {
    fnr: '20026900817',
    sykmeldingId: 'a62a4ab1-aaf2-4394-9b16-0507583bcab3',
    oppgaveid: 315980624,
    pdfPapirSykmelding:
        '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zqkpw6YdN8OOwqrDicOzS1M54oiC4oKsTFg84oiCwrRdD1DPgE48w5pKW+KAoWnCtMOhw5rLhuKAnuKAmcK4w6sX4oGETMK2wrDDqBIhGR15wrBKS8OR4oCmHg8fUMOJxpLDq8uc76yCwqXGkjgeWzIsNkVW4oGEN+KIj+KIhgvCtWvigJ7DjeKIq14fNw/CqsudGl1Xw59CPUDFksOkw7PDi+KJoMO2InDCusOVKsaSYcO5wrF9w6I0w4Z8wrvigKFeRSTDol/ihKJVWcOHw4YXwrTiiaVPF8Ozw6PDs1rDisuHAOKAlCBtw4QKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L1BhcmVudCA0IDAgUi9Db250ZW50cyAzIDAgUi9UeXBlL1BhZ2UvUmVzb3VyY2VzPDwvRm9udDw8L0YxIDEgMCBSL0YyIDIgMCBSPj4+Pi9NZWRpYUJveFswIDAgNTk1IDg0Ml0+PgplbmRvYmoKMSAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EtQm9sZC9UeXBlL0ZvbnQvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMiAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EvVHlwZS9Gb250L0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9QYWdlcy9Db3VudCAxL0tpZHNbNSAwIFJdPj4KZW5kb2JqCjYgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDQgMCBSPj4KZW5kb2JqCjcgMCBvYmoKPDwvUHJvZHVjZXIoaVRleHTDhiA1LjQuNCDCqTIwMDAtMjAxMyAxVDNYVCBCVkJBIFwoQUdQTC12ZXJzaW9uXCkpL01vZERhdGUoRDoyMDE5MDIwMTA4MzQ1OSswMScwMCcpL0NyZWF0aW9uRGF0ZShEOjIwMTkwMjAxMDgzNDU5KzAxJzAwJyk+PgplbmRvYmoKeHJlZgowIDgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAzMDY1IDAwMDAwIG4gCjAwMDAwMDMxNTggMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAzMjQ2IDAwMDAwIG4gCjAwMDAwMDI5NDQgMDAwMDAgbiAKMDAwMDAwMzI5NyAwMDAwMCBuIAowMDAwMDAzMzQyIDAwMDAwIG4gCnRyYWlsZXIKPDwvUm9vdCA2IDAgUi9JRCBbPGI0NDM3ZWExMmZkZDQ0OTY1MjM5NjhiNDY2ZjQxZWFhPjxkZWY0YzM2MzUyNDA0Y2FhN2NiODcyZWFkOGQwMjQ5Yj5dL0luZm8gNyAwIFIvU2l6ZSA4Pj4KJWlUZXh0LTUuNC40CnN0YXJ0eHJlZgozNDk1CiUlRU9GCg==',
};

const registeredOppgave = {
    pasientFnr: '20026900817',
    sykmelderFnr: '01117302624',
    perioder: [
        {
            fom: '2020-06-01',
            tom: '2020-06-05',
            avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
        },
        { fom: '2020-06-01', tom: '2020-06-05', reisetilskudd: false },
        { fom: '2020-06-01', tom: '2020-06-05', reisetilskudd: false, gradert: { reisetilskudd: true, grad: 80 } },
        {
            fom: '2020-06-01',
            tom: '2020-06-05',
            reisetilskudd: false,
            aktivitetIkkeMulig: {
                medisinskArsak: {
                    arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORHINDRER_BEDRING'],
                    beskrivelse: 'Dette er beskrivelsen på den medisinske årsaken',
                },
                arbeidsrelatertArsak: {
                    arsak: ['MANGLENDE_TILRETTELEGGING'],
                    beskrivelse: 'Dette er beskrivelsen på den arbeidsrelaterte årsaken',
                },
            },
        },
        { fom: '2020-06-01', tom: '2020-06-05', reisetilskudd: false, behandlingsdager: 13 },
        { fom: '2020-06-01', tom: '2020-06-05', reisetilskudd: true },
    ],
    medisinskVurdering: {
        svangerskap: true,
        yrkesskade: true,
        yrkesskadeDato: '2020-03-05',
        hovedDiagnose: { system: '2.16.578.1.12.4.1.1.7110', kode: 'A009', tekst: 'Uspesifisert kolera' },
        biDiagnoser: [
            { system: '2.16.578.1.12.4.1.1.7170', kode: 'H02', tekst: 'Auditiv diskriminerings lidelse' },
            {
                system: '2.16.578.1.12.4.1.1.7110',
                kode: 'I714',
                tekst: 'Abdominalt aorta-aneurisme uten opplysning om ruptur',
            },
        ],
        annenFraversArsak: {
            grunn: ['BEHANDLING_FORHINDRER_ARBEID', 'NODVENDIG_KONTROLLUNDENRSOKELSE'],
            beskrivelse: 'Dette er årsaken',
        },
    },
    syketilfelleStartDato: '2020-06-16',
    arbeidsgiver: {
        harArbeidsgiver: 'EN_ARBEIDSGIVER',
        navn: 'Langtvekkistan politidistrikt',
        yrkesbetegnelse: 'Politi',
        stillingsprosent: 100,
    },
    behandletDato: '2020-06-01',
    skjermesForPasient: true,
    behandler: {
        fnr: '01117302624',
        fornavn: 'Nina Unni',
        etternavn: 'Borge',
        hpr: '7125186',
        aktoerId: '1804968790639',
        adresse: { gate: 'Gatenavn', kommune: 'Andeby', postnummer: 1234, postboks: 'Tulleboks', land: 'LaaangtVekke' },
        tlf: '+4712345678',
    },
    meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
    meldingTilNAV: { bistandUmiddelbart: true, beskrivBistand: 'Dette er en beskrivelse av bistand' },
    tiltakNAV: 'Dette er tiltak som må gjøres av NAV',
    tiltakArbeidsplassen: 'Dette er tiltak som må gjøres på arbeidsplassen',
    andreTiltak: 'Dette er andre tiltak',
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Dette er hensyn som må tas på arbeidsplassen',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2020-06-01',
            vurderingsdato: '2020-06-01',
        },
        erIkkeIArbeid: { arbeidsforPaSikt: true, arbeidsforFOM: '2020-06-01', vurderingsdato: '2020-06-01' },
    },
    utdypendeOpplysninger: {
        '6.1': {
            '6.1.1': 'Dette er seksjon seks en en',
            '6.1.2': 'Dette er seksjon seks en to',
            '6.1.3': 'Dette er seksjon seks en tre',
            '6.1.4': 'Dette er seksjon seks en fire',
            '6.1.5': 'Dette er seksjon seks en fem',
        },
        '6.2': {
            '6.2.1': 'Dette er seksjon seks to en',
            '6.2.2': 'Dette er seksjon seks to to',
            '6.2.3': 'Dette er seksjon seks to tre',
            '6.2.4': 'Dette er seksjon seks to fire',
        },
        '6.3': { '6.3.1': 'Dette er seksjon seks tre en', '6.3.2': 'Dette er seksjon seks tre to' },
        '6.4': {
            '6.4.1': 'Dette er seksjon seks fire en',
            '6.4.2': 'Dette er seksjon seks fire to',
            '6.4.3': 'Dette er seksjon seks fire tre',
        },
        '6.5': {
            '6.5.1': 'Dette er seksjon seks fire en',
            '6.5.2': 'Dette er seksjon seks fem to',
            '6.5.3': 'Dette er seksjon seks fem tre',
            '6.5.4': 'Dette er seksjon seks fem fire',
        },
        '6.6': {
            '6.6.1': 'Dette er seksjon seks seks en',
            '6.6.2': 'Dette er seksjon seks seks to',
            '6.6.3': 'Dette er seksjon seks seks tre',
        },
    },
    kontaktMedPasient: { kontaktDato: '2020-06-01', begrunnelseIkkeKontakt: 'Pasienten kunne ikke bevege seg' },
};

describe('End-2-end', () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    beforeEach(() => {
        delete window.location;
        spy = new SpyMiddleware();
        mock = FetchMock.configure({
            middleware: spy.middleware,
        });
        mock.get('backend/api/v1/hentPapirSykmeldingManuellOppgave/', oppgave);
        mock.put('backend/api/v1/sendPapirSykmeldingManuellOppgave/', () => Promise.resolve({ status: 204 }));
        // mock.get('/user', 'User name');
        expect(spy.size()).toBe(0);
    });

    afterEach(() => {
        mock.restore();
    });

    it('Should update all fields and call submit-endpoint with correct values', async () => {
        //@ts-ignore - Because we only need the "search" property of the location, and TS complains that other properties are missing
        window.location = new URL('https://url.com/?oppgaveid=test');

        const { queryByText, getByText, getByLabelText, getByTestId, findByText } = render(<App />);
        await waitForElementToBeRemoved(() => queryByText(/Vennligst vent mens oppgaven laster/i));

        // Startdato
        user.type(
            getByLabelText('Startdato for legemeldt fravær', { selector: 'input' }),
            dayjs(registeredOppgave.syketilfelleStartDato).format('DD.MM.YYYY'),
        );

        // Pasientopplysninger
        user.type(getByLabelText('1.2 Fødselsnummer (11 siffer)', { selector: 'input' }), registeredOppgave.pasientFnr);

        // Arbeidsgiver
        user.selectOptions(getByTestId('harArbeidsgiver'), registeredOppgave.arbeidsgiver.harArbeidsgiver);
        user.type(
            getByLabelText('2.2 Arbeidsgiver for denne sykmeldingen', { selector: 'input' }),
            registeredOppgave.arbeidsgiver.navn,
        );
        user.type(
            getByLabelText('2.3 Yrke/stilling for dette arbeidsforholdet', { selector: 'input' }),
            registeredOppgave.arbeidsgiver.yrkesbetegnelse,
        );
        user.type(
            getByLabelText('2.4 Stillingsprosent', { selector: 'input' }),
            registeredOppgave.arbeidsgiver.stillingsprosent.toString(),
        );

        // Hoveddiagnose
        user.selectOptions(
            getByTestId('hovedDiagnose-system'),
            registeredOppgave.medisinskVurdering.hovedDiagnose.system,
        );
        user.type(
            getByLabelText('3.1.2 Kode', { selector: 'input' }),
            registeredOppgave.medisinskVurdering.hovedDiagnose.kode,
        );

        // Bidiagnose
        user.click(getByText(/Legg til bidiagnose/i));
        user.selectOptions(
            getByTestId('bidiagnose-0-system'),
            registeredOppgave.medisinskVurdering.biDiagnoser[0].system,
        );
        user.type(
            getByLabelText('3.2.2 Kode', { selector: 'input' }),
            registeredOppgave.medisinskVurdering.biDiagnoser[0].kode,
        );

        // Annen fraværsgrunn
        user.click(getByText('Annen lovfestet fraværsgrunn § 8-4, 3. ledd oppgis hvis relevant'));
        registeredOppgave.medisinskVurdering.annenFraversArsak.grunn.forEach((grunn) => {
            user.click(getByLabelText(AnnenFraverGrunn[grunn as keyof typeof AnnenFraverGrunn], { selector: 'input' }));
        });
        user.type(
            getByLabelText('3.3.2 Beskriv fravær (valgfritt)', { selector: 'input' }),
            registeredOppgave.medisinskVurdering.annenFraversArsak.beskrivelse,
        );

        // Svangerskap
        user.click(getByText('Sykdommen er svangerskapsrelatert'));

        // Yrkesskade
        user.click(getByText('Sykmeldingen kan skyldes en yrkesskade / yrkessykdom'));
        user.type(
            getByLabelText('3.6 Eventuell skadedato', { selector: 'input' }),
            dayjs(registeredOppgave.medisinskVurdering.yrkesskadeDato).format('DD.MM.YYYY'),
        );

        // Skjermes for pasient
        user.click(
            getByText(
                'Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og brukerrettighetsloven §§ 3-2 og 5-1',
            ),
        );

        // Avventende periode
        user.click(getByText('Pasienten kan benytte avventende sykmelding'));
        const avventendePeriode = registeredOppgave.perioder.find(
            (periode) => periode.avventendeInnspillTilArbeidsgiver,
        );
        user.type(
            getByLabelText('4.1.1 f.o.m. - 4.1.2 t.o.m.', { selector: 'input' }),
            dayjs(avventendePeriode?.fom).format('DD.MM.YYYY') +
                ' - ' +
                dayjs(avventendePeriode?.tom).format('DD.MM.YYYY'),
        );
        user.type(
            getByLabelText('4.1.1 f.o.m. - 4.1.2 t.o.m.', { selector: 'input' }),
            avventendePeriode!.avventendeInnspillTilArbeidsgiver!,
        );

        // Gradert periode
        user.click(getByText('Pasienten kan være delvis i arbeid (gradert sykmelding)'));
        const gradertPeriode = registeredOppgave.perioder.find((periode) => periode.gradert);
        user.type(
            getByLabelText('4.2.1 f.o.m. - 4.2.2 t.o.m.', { selector: 'input' }),
            dayjs(gradertPeriode?.fom).format('DD.MM.YYYY') + ' - ' + dayjs(gradertPeriode?.tom).format('DD.MM.YYYY'),
        );
        user.type(
            getByLabelText('4.2.3 Oppgi grad for sykmelding', { selector: 'input' }),
            gradertPeriode?.gradert?.grad.toString()!,
        );
        if (gradertPeriode?.gradert?.reisetilskudd) {
            user.click(getByText('Pasienten kan være delvis i arbeid ved bruk av reisetilskudd'));
        }

        // Aktivitet ikke mulig periode
        user.click(getByText('Pasienten kan ikke være i arbeid (100 prosent sykmelding)'));
        const aktivitetIkkeMuligPeriode = registeredOppgave.perioder.find((periode) => periode.aktivitetIkkeMulig);
        user.type(
            getByLabelText('4.3.1 f.o.m. - 4.3.2 t.o.m.', { selector: 'input' }),
            dayjs(aktivitetIkkeMuligPeriode?.fom).format('DD.MM.YYYY') +
                ' - ' +
                dayjs(aktivitetIkkeMuligPeriode?.tom).format('DD.MM.YYYY'),
        );
        if (aktivitetIkkeMuligPeriode?.aktivitetIkkeMulig?.medisinskArsak) {
            user.click(getByText('Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet'));
            aktivitetIkkeMuligPeriode.aktivitetIkkeMulig.medisinskArsak.arsak.forEach((arsak) => {
                user.click(getByText(MedisinskArsakType[arsak as keyof typeof MedisinskArsakType]));
            });
            user.type(
                getByTestId('aktivitetIkkeMuligMedisinskArsakBeskrivelse'),
                aktivitetIkkeMuligPeriode.aktivitetIkkeMulig.medisinskArsak.beskrivelse,
            );
        }
        if (aktivitetIkkeMuligPeriode?.aktivitetIkkeMulig?.arbeidsrelatertArsak) {
            user.click(getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'));
            aktivitetIkkeMuligPeriode.aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.forEach((arsak) => {
                user.click(getByText(ArbeidsrelatertArsakType[arsak as keyof typeof ArbeidsrelatertArsakType]));
            });
            user.type(
                getByTestId('aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse'),
                aktivitetIkkeMuligPeriode.aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse,
            );
        }

        // Behandlingsdager periode
        user.click(getByText('Pasienten kan ikke være i arbeid på behandlingsdager'));
        const behandlingsdagerPeriode = registeredOppgave.perioder.find((periode) => periode.behandlingsdager);
        user.type(
            getByLabelText('4.4.1 f.o.m. - 4.4.2 t.o.m.', { selector: 'input' }),
            dayjs(behandlingsdagerPeriode?.fom).format('DD.MM.YYYY') +
                ' - ' +
                dayjs(behandlingsdagerPeriode?.tom).format('DD.MM.YYYY'),
        );
        user.type(
            getByLabelText('4.4.3 Oppgi antall dager i perioden', { selector: 'input' }),
            behandlingsdagerPeriode?.behandlingsdager!.toString()!,
        );

        // Reisetilskudd periode
        user.click(getByText('Pasienten kan være i fullt arbeid ved bruk av reisetilskudd'));
        const reisetilskuddPeriode = registeredOppgave.perioder.find((periode) => periode.reisetilskudd);
        user.type(
            getByLabelText('4.5.1 f.o.m. - 4.5.2 t.o.m.', { selector: 'input' }),
            dayjs(reisetilskuddPeriode?.fom).format('DD.MM.YYYY') +
                ' - ' +
                dayjs(reisetilskuddPeriode?.tom).format('DD.MM.YYYY'),
        );

        // Prognose
        user.click(getByText('Pasienten er 100 prosent arbeidsfør etter denne perioden'));
        user.type(
            getByLabelText('5.1.1 Beskrive eventuelle hensyn som må tas på arbeidsplassen', { selector: 'textarea' }),
            registeredOppgave.prognose.hensynArbeidsplassen,
        );

        // Er i arbeid
        user.click(getByText('Pasienten har arbeidsgiver'));
        user.click(getByText('Pasienten kan på sikt komme tilbake til samme arbeidsgiver'));
        user.type(
            getByLabelText('Anslå når pasienten kan komme tilbake til samme arbeidsgiver', { selector: 'input' }),
            dayjs(registeredOppgave.prognose.erIArbeid.arbeidFOM).format('DD.MM.YYYY'),
        );
        user.click(getByText('Pasienten kan på sikt komme i arbeid hos annen arbeidsgiver'));
        user.type(
            getByLabelText('5.2.3 Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?', {
                selector: 'input',
            }),
            dayjs(registeredOppgave.prognose.erIArbeid.vurderingsdato).format('DD.MM.YYYY'),
        );

        // Er ikke i arbeid
        user.click(getByText('Pasienten har ikke arbeidsgiver'));
        user.click(getByText('Pasienten kan komme tilbake i arbeid på sikt'));
        user.type(
            getByLabelText('Anslå når du tror pasienten kan komme tilbake i arbeid', { selector: 'input' }),
            dayjs(registeredOppgave.prognose.erIkkeIArbeid.arbeidsforFOM).format('DD.MM.YYYY'),
        );
        user.type(
            getByLabelText('Anslå når du tror pasienten kan komme tilbake i arbeid', { selector: 'input' }),
            dayjs(registeredOppgave.prognose.erIkkeIArbeid.vurderingsdato).format('DD.MM.YYYY'),
        );

        // Utdypende opplysninger
        user.click(getByText('6.1'));
        user.type(
            getByLabelText('6.1.1', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.1']['6.1.1'],
        );
        user.type(
            getByLabelText('6.1.2', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.1']['6.1.2'],
        );
        user.type(
            getByLabelText('6.1.3', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.1']['6.1.3'],
        );
        user.type(
            getByLabelText('6.1.4', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.1']['6.1.4'],
        );
        user.type(
            getByLabelText('6.1.5', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.1']['6.1.5'],
        );

        user.click(getByText('6.2'));
        user.type(
            getByLabelText('6.2.1', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.2']['6.2.1'],
        );
        user.type(
            getByLabelText('6.2.2', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.2']['6.2.2'],
        );
        user.type(
            getByLabelText('6.2.3', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.2']['6.2.3'],
        );
        user.type(
            getByLabelText('6.2.4', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.2']['6.2.4'],
        );

        user.click(getByText('6.3'));
        user.type(
            getByLabelText('6.3.1', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.3']['6.3.1'],
        );
        user.type(
            getByLabelText('6.3.2', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.3']['6.3.2'],
        );

        user.click(getByText('6.4'));
        user.type(
            getByLabelText('6.4.1', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.4']['6.4.1'],
        );
        user.type(
            getByLabelText('6.4.2', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.4']['6.4.2'],
        );
        user.type(
            getByLabelText('6.4.3', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.4']['6.4.3'],
        );

        user.click(getByText('6.5'));
        user.type(
            getByLabelText('6.5.1', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.5']['6.5.1'],
        );
        user.type(
            getByLabelText('6.5.2', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.5']['6.5.2'],
        );
        user.type(
            getByLabelText('6.5.3', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.5']['6.5.3'],
        );
        user.type(
            getByLabelText('6.5.4', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.5']['6.5.4'],
        );

        user.click(getByText('6.6'));
        user.type(
            getByLabelText('6.6.1', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.6']['6.6.1'],
        );
        user.type(
            getByLabelText('6.6.2', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.6']['6.6.2'],
        );
        user.type(
            getByLabelText('6.6.3', { exact: false, selector: 'textarea' }),
            registeredOppgave.utdypendeOpplysninger['6.6']['6.6.3'],
        );

        // Arbeidsevne
        user.type(
            getByLabelText('Tilrettelegging/hensyn som bør tas på arbeidsplassen', {
                selector: 'textarea',
            }),
            registeredOppgave.tiltakArbeidsplassen,
        );
        user.type(
            getByLabelText('Tiltak i regi av NAV. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)', {
                selector: 'textarea',
            }),
            registeredOppgave.tiltakNAV,
        );
        user.type(
            getByLabelText('Eventuelle andre innspill til NAV', {
                selector: 'textarea',
            }),
            registeredOppgave.andreTiltak,
        );

        // Melding til NAV
        user.click(getByText('Ønskes bistand fra NAV nå?'));
        user.type(
            getByLabelText('Begrunn nærmere', {
                selector: 'textarea',
            }),
            registeredOppgave.meldingTilNAV.beskrivBistand,
        );

        // Melding til Arbeidsgiver
        user.type(
            getByLabelText('9.1 Andre innspill til arbeidsgiver', {
                selector: 'textarea',
            }),
            registeredOppgave.meldingTilArbeidsgiver,
        );

        // Tilbakedatering
        user.click(getByText('Er sykmelding tilbakedatert?'));
        user.type(
            getByLabelText('Oppgi dato for dokumenterbar kontakt med pasienten', { selector: 'input' }),
            dayjs(registeredOppgave.kontaktMedPasient.kontaktDato).format('DD.MM.YYYY'),
        );
        user.click(getByText('Pasienten har ikke kunnet ivareta egne interesser'));
        user.type(
            getByLabelText('Begrunnelse', {
                selector: 'textarea',
            }),
            registeredOppgave.kontaktMedPasient.begrunnelseIkkeKontakt,
        );

        // Behandler
        user.type(
            getByLabelText('Sykmelders fødselsnummer (11 siffer)', { selector: 'input' }),
            registeredOppgave.behandler.fnr,
        );
        user.type(getByLabelText('AktørID', { selector: 'input' }), registeredOppgave.behandler.aktoerId);
        user.type(
            getByLabelText('12.1 Behandletdato', { selector: 'input' }),
            dayjs(registeredOppgave.behandletDato).format('DD.MM.YYYY'),
        );
        user.type(
            getByLabelText('12.2.1 Sykmelders fornavn', { selector: 'input' }),
            registeredOppgave.behandler.fornavn,
        );
        user.type(
            getByLabelText('12.2.2 Sykmelders etternavn', { selector: 'input' }),
            registeredOppgave.behandler.etternavn,
        );
        user.type(getByLabelText('12.4 HPR-nummer', { selector: 'input' }), registeredOppgave.behandler.hpr);
        user.type(getByLabelText('12.5 Telefon', { selector: 'input' }), registeredOppgave.behandler.tlf);
        user.type(getByLabelText('Gate', { selector: 'input' }), registeredOppgave.behandler.adresse.gate);
        user.type(
            getByLabelText('Postnummer', { selector: 'input' }),
            registeredOppgave.behandler.adresse.postnummer.toString(),
        );
        user.type(getByLabelText('Kommune', { selector: 'input' }), registeredOppgave.behandler.adresse.kommune);
        user.type(getByLabelText('Postboks', { selector: 'input' }), registeredOppgave.behandler.adresse.postboks);
        user.type(getByLabelText('Land', { selector: 'input' }), registeredOppgave.behandler.adresse.land);

        // Submit
        user.click(getByText('Informasjonen stemmer overens med papirsykmelding'));
        user.click(getByText('Registrer sykmelding'));

        expect(findByText('For å gå videre må du rette opp følgende:')).not.toBeInTheDocument();

        await findByText('Sykmeldingen ble registrert', { exact: false });
        //        expect(spy.size()).toBe(2);
        expect(spy.lastUrl()).toBe(`backend/api/v1/sendPapirSykmeldingManuellOppgave/?oppgaveid=${oppgave.oppgaveid}`);
        expect(spy.lastCall()?.request.body).toEqual(registeredOppgave);
    }, 300000);
});
