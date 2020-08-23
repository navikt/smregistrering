import React from 'react';
import dayjs from 'dayjs';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import { render, waitForElementToBeRemoved } from '@testing-library/react';

import App from '../App';

const oppgave = {
    fnr: '20026900817',
    sykmeldingId: 'a62a4ab1-aaf2-4394-9b16-0507583bcab3',
    oppgaveid: 315980624,
    pdfPapirSykmelding:
        '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zqkpw6YdN8OOwqrDicOzS1M54oiC4oKsTFg84oiCwrRdD1DPgE48w5pKW+KAoWnCtMOhw5rLhuKAnuKAmcK4w6sX4oGETMK2wrDDqBIhGR15wrBKS8OR4oCmHg8fUMOJxpLDq8uc76yCwqXGkjgeWzIsNkVW4oGEN+KIj+KIhgvCtWvigJ7DjeKIq14fNw/CqsudGl1Xw59CPUDFksOkw7PDi+KJoMO2InDCusOVKsaSYcO5wrF9w6I0w4Z8wrvigKFeRSTDol/ihKJVWcOHw4YXwrTiiaVPF8Ozw6PDs1rDisuHAOKAlCBtw4QKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L1BhcmVudCA0IDAgUi9Db250ZW50cyAzIDAgUi9UeXBlL1BhZ2UvUmVzb3VyY2VzPDwvRm9udDw8L0YxIDEgMCBSL0YyIDIgMCBSPj4+Pi9NZWRpYUJveFswIDAgNTk1IDg0Ml0+PgplbmRvYmoKMSAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EtQm9sZC9UeXBlL0ZvbnQvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMiAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EvVHlwZS9Gb250L0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9QYWdlcy9Db3VudCAxL0tpZHNbNSAwIFJdPj4KZW5kb2JqCjYgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDQgMCBSPj4KZW5kb2JqCjcgMCBvYmoKPDwvUHJvZHVjZXIoaVRleHTDhiA1LjQuNCDCqTIwMDAtMjAxMyAxVDNYVCBCVkJBIFwoQUdQTC12ZXJzaW9uXCkpL01vZERhdGUoRDoyMDE5MDIwMTA4MzQ1OSswMScwMCcpL0NyZWF0aW9uRGF0ZShEOjIwMTkwMjAxMDgzNDU5KzAxJzAwJyk+PgplbmRvYmoKeHJlZgowIDgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAzMDY1IDAwMDAwIG4gCjAwMDAwMDMxNTggMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAzMjQ2IDAwMDAwIG4gCjAwMDAwMDI5NDQgMDAwMDAgbiAKMDAwMDAwMzI5NyAwMDAwMCBuIAowMDAwMDAzMzQyIDAwMDAwIG4gCnRyYWlsZXIKPDwvUm9vdCA2IDAgUi9JRCBbPGI0NDM3ZWExMmZkZDQ0OTY1MjM5NjhiNDY2ZjQxZWFhPjxkZWY0YzM2MzUyNDA0Y2FhN2NiODcyZWFkOGQwMjQ5Yj5dL0luZm8gNyAwIFIvU2l6ZSA4Pj4KJWlUZXh0LTUuNC40CnN0YXJ0eHJlZgozNDk1CiUlRU9GCg==',
    papirSmRegistering: {
        journalpostId: '467035825',
        fnr: '20026900817',
        aktorId: '1865011360761',
        dokumentInfoId: '485253318',
        datoOpprettet: '2020-02-19T08:14:24',
        sykmeldingId: 'a62a4ab1-aaf2-4394-9b16-0507583bcab3',
        syketilfelleStartDato: '2020-08-06',
        arbeidsgiver: {
            harArbeidsgiver: 'EN_ARBEIDSGIVER',
            navn: 'Langtvekkistan politidistrikt',
            yrkesbetegnelse: 'Politi',
            stillingsprosent: 100,
        },
        medisinskVurdering: {
            hovedDiagnose: {
                system: '2.16.578.1.12.4.1.1.7110',
                kode: 'A009',
                tekst: 'Uspesifisert kolera',
            },
            biDiagnoser: [
                {
                    kode: 'H02',
                    system: '2.16.578.1.12.4.1.1.7170',
                    tekst: 'Auditiv diskriminerings lidelse',
                },
                {
                    kode: 'I714',
                    system: '2.16.578.1.12.4.1.1.7110',
                    tekst: 'Abdominalt aorta-aneurisme uten opplysning om ruptur',
                },
            ],
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: '2020-02-06',
            annenFraversArsak: {
                grunn: ['BEHANDLING_FORHINDRER_ARBEID', 'NODVENDIG_KONTROLLUNDENRSOKELSE'],
                beskrivelse: 'Dette er årsaken',
            },
        },
        skjermesForPasient: true,
        perioder: [
            {
                fom: '2020-01-01',
                tom: '2020-01-05',
                aktivitetIkkeMulig: null,
                avventendeInnspillTilArbeidsgiver: 'Må avvente',
                behandlingsdager: null,
                gradert: null,
                reisetilskudd: false,
            },
            {
                fom: '2020-02-01',
                tom: '2020-02-05',
                aktivitetIkkeMulig: null,
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    grad: 80,
                    reisetilskudd: true,
                },
                reisetilskudd: false,
            },
            {
                fom: '2020-03-01',
                tom: '2020-03-05',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORHINDRER_BEDRING'],
                        beskrivelse: 'Dette er beskrivelsen på den medisinske årsaken',
                    },
                    arbeidsrelatertArsak: {
                        arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                        beskrivelse: 'Dette er beskrivelsen på den arbeidsrelaterte årsaken',
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: null,
                reisetilskudd: false,
            },
            {
                fom: '2020-04-01',
                tom: '2020-04-05',
                aktivitetIkkeMulig: null,
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: 13,
                gradert: null,
                reisetilskudd: false,
            },
            {
                fom: '2020-05-01',
                tom: '2020-05-05',
                aktivitetIkkeMulig: null,
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: null,
                reisetilskudd: true,
            },
        ],
        prognose: {
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'Dette er hensyn som må tas på arbeidsplassen',
            erIArbeid: {
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: true,
                arbeidFOM: '2020-03-14',
                vurderingsdato: '2020-03-06',
            },
            erIkkeIArbeid: {
                arbeidsforPaSikt: true,
                arbeidsforFOM: '2020-02-03',
                vurderingsdato: '2020-05-16',
            },
        },
        utdypendeOpplysninger: {
            '6.1': {
                '6.1.1': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks en en',
                    svar: 'Dette er seksjon seks en en',
                    restriksjoner: [],
                },
                '6.1.2': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks en to',
                    svar: 'Dette er seksjon seks en to',
                    restriksjoner: [],
                },
                '6.1.3': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks en tre',
                    svar: 'Dette er seksjon seks en tre',
                    restriksjoner: [],
                },
                '6.1.4': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks en fire',
                    svar: 'Dette er seksjon seks en fire',
                    restriksjoner: [],
                },
                '6.1.5': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks en fem',
                    svar: 'Dette er seksjon seks en fem',
                    restriksjoner: [],
                },
            },
            '6.2': {
                '6.2.1': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks to en',
                    svar: 'Dette er seksjon seks to en',
                    restriksjoner: [],
                },
                '6.2.2': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks to to',
                    svar: 'Dette er seksjon seks to to',
                    restriksjoner: [],
                },
                '6.2.3': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks to tre',
                    svar: 'Dette er seksjon seks to tre',
                    restriksjoner: [],
                },
                '6.2.4': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks to fire',
                    svar: 'Dette er seksjon seks to fire',
                    restriksjoner: [],
                },
            },
            '6.3': {
                '6.3.1': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks tre en',
                    svar: 'Dette er seksjon seks tre en',
                    restriksjoner: [],
                },
                '6.3.2': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks tre to',
                    svar: 'Dette er seksjon seks tre to',
                    restriksjoner: [],
                },
            },
            '6.4': {
                '6.4.1': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks fire en',
                    svar: 'Dette er seksjon seks fire en',
                    restriksjoner: [],
                },
                '6.4.2': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks fire to',
                    svar: 'Dette er seksjon seks fire to',
                    restriksjoner: [],
                },
                '6.4.3': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks fire tre',
                    svar: 'Dette er seksjon seks fire tre',
                    restriksjoner: [],
                },
            },
            '6.5': {
                '6.5.1': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks fem en',
                    svar: 'Dette er seksjon seks fire en',
                    restriksjoner: [],
                },
                '6.5.2': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks fem to',
                    svar: 'Dette er seksjon seks fem to',
                    restriksjoner: [],
                },
                '6.5.3': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks fem tre',
                    svar: 'Dette er seksjon seks fem tre',
                    restriksjoner: [],
                },
                '6.5.4': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks fem fire',
                    svar: 'Dette er seksjon seks fem fire',
                    restriksjoner: [],
                },
            },
            '6.6': {
                '6.6.1': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks seks en',
                    svar: 'Dette er seksjon seks seks en',
                    restriksjoner: [],
                },
                '6.6.2': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks seks to',
                    svar: 'Dette er seksjon seks seks to',
                    restriksjoner: [],
                },
                '6.6.3': {
                    sporsmal: 'Dette er spørsmålet til seksjon seks seks tre',
                    svar: 'Dette er seksjon seks seks tre',
                    restriksjoner: [],
                },
            },
        },
        tiltakNAV: 'Dette er tiltak som må gjøres av NAV',
        tiltakArbeidsplassen: 'Dette er tiltak som må gjøres på arbeidsplassen',
        andreTiltak: 'Dette er andre tiltak',
        meldingTilNAV: {
            bistandUmiddelbart: true,
            beskrivBistand: 'Dette er en beskrivelse av bistand',
        },
        meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
        kontaktMedPasient: {
            kontaktDato: '2020-10-03',
            begrunnelseIkkeKontakt: 'Pasienten kunne ikke bevege seg',
        },
        behandletTidspunkt: '2020-11-06',
        behandler: {
            fornavn: 'Nina Unni',
            mellomnavn: null,
            etternavn: 'Borge',
            aktoerId: '1804968790639',
            fnr: '01117302624',
            hpr: '7125186',
            her: '',
            adresse: {
                gate: 'Gatenavn',
                postnummer: 1234,
                kommune: 'Andeby',
                postboks: 'Tulleboks',
                land: 'LaaangtVekke',
            },
            tlf: '+4712345678',
        },
    },
};

describe('Mapping values from the oppgave to the schema', () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    beforeEach(() => {
        spy = new SpyMiddleware();
        mock = FetchMock.configure({
            middleware: spy.middleware,
        });
        mock.get('backend/api/v1/hentPapirSykmeldingManuellOppgave/', oppgave);
        expect(spy.size()).toBe(0);
    });

    afterEach(() => {
        mock.restore();
    });

    it('Should render all oppgave feilds in the window', async () => {
        const { getByText, getByDisplayValue, getAllByDisplayValue, getByLabelText, getAllByLabelText } = render(
            <App />,
        );

        await waitForElementToBeRemoved(() => getByText(/Vennligst vent mens oppgaven laster/i));

        expect(spy.size()).toBe(1);
        expect(spy.lastUrl()).toBe(`backend/api/v1/hentPapirSykmeldingManuellOppgave/?oppgaveid=test`);

        // Fnr
        expect(getByDisplayValue(oppgave.fnr)).toBeInTheDocument();

        // Arbeidsgiver
        expect(getByText('Én arbeidsgiver')).toBeInTheDocument();

        // Arbeidsgiver navn
        expect(getByLabelText('2.2 Arbeidsgiver for denne sykmeldingen')).toHaveValue(
            oppgave.papirSmRegistering.arbeidsgiver.navn,
        );

        // Yrkesbetegnelse
        expect(getByLabelText('2.3 Yrke/stilling for dette arbeidsforholdet')).toHaveValue(
            oppgave.papirSmRegistering.arbeidsgiver.yrkesbetegnelse,
        );

        // Stillingsprosent
        expect(getByLabelText('2.4 Stillingsprosent')).toHaveValue(
            oppgave.papirSmRegistering.arbeidsgiver.stillingsprosent,
        );

        // diagnose
        expect(getAllByDisplayValue('ICD-10')).toHaveLength(2);
        expect(getAllByDisplayValue('ICPC-2')).toHaveLength(1);
        expect(getByText(oppgave.papirSmRegistering.medisinskVurdering.hovedDiagnose.kode)).toBeInTheDocument();
        expect(oppgave.papirSmRegistering.medisinskVurdering.biDiagnoser).toHaveLength(2);
        expect(getByText(oppgave.papirSmRegistering.medisinskVurdering.biDiagnoser[0].kode)).toBeInTheDocument();
        expect(getByText(oppgave.papirSmRegistering.medisinskVurdering.biDiagnoser[1].kode)).toBeInTheDocument();

        // Svangerskap
        expect(getByLabelText('Sykdommen er svangerskapsrelatert', { selector: 'input' })).toBeChecked();

        // Yrkesskade
        expect(
            getByLabelText('Sykmeldingen kan skyldes en yrkesskade / yrkessykdom', { selector: 'input' }),
        ).toBeChecked();
        expect(getByLabelText('3.6 Eventuell skadedato', { selector: 'input' })).toHaveValue(
            dayjs(oppgave.papirSmRegistering.medisinskVurdering.yrkesskadeDato).format('DD.MM.YYYY'),
        );

        // Annen fraversarsak
        expect(
            getByLabelText(
                'Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
                { selector: 'input' },
            ),
        ).toBeChecked();
        expect(
            getByLabelText(
                'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
                { selector: 'input' },
            ),
        ).toBeChecked();
        expect(getByLabelText('3.3.2 Beskriv fravær (valgfritt)')).toHaveValue(
            oppgave.papirSmRegistering.medisinskVurdering.annenFraversArsak.beskrivelse,
        );

        // Skjermes for pasient
        expect(
            getByLabelText(
                'Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og brukerrettighetsloven §§ 3-2 og 5-1',
                { selector: 'input' },
            ),
        ).toBeChecked();

        // Avventende periode
        const avventendePeriode = oppgave.papirSmRegistering.perioder.find(
            (periode) => !!periode.avventendeInnspillTilArbeidsgiver,
        );
        expect(getByLabelText('4.1.1 f.o.m. - 4.1.2 t.o.m.', { selector: 'input' })).toHaveValue(
            `${dayjs(avventendePeriode?.fom).format('DD.MM.YYYY')} - ${dayjs(avventendePeriode?.tom).format(
                'DD.MM.YYYY',
            )}`,
        );
        expect(getByLabelText('4.1.3 Innspill til arbeidsgiver om tilrettelegging')).toHaveValue(
            avventendePeriode?.avventendeInnspillTilArbeidsgiver,
        );

        // Gradert periode
        const gradertPeriode = oppgave.papirSmRegistering.perioder.find((periode) => !!periode.gradert);
        expect(getByLabelText('4.2.1 f.o.m. - 4.2.2 t.o.m.', { selector: 'input' })).toHaveValue(
            `${dayjs(gradertPeriode?.fom).format('DD.MM.YYYY')} - ${dayjs(gradertPeriode?.tom).format('DD.MM.YYYY')}`,
        );
        expect(getByLabelText('4.2.3 Oppgi grad for sykmelding', { selector: 'input' })).toHaveValue(
            gradertPeriode?.gradert?.grad,
        );
        expect(
            getByLabelText('Pasienten kan være delvis i arbeid ved bruk av reisetilskudd', { selector: 'input' }),
        ).toBeChecked();

        // Aktivitet ikke mulig periode
        const aktivitetIkkeMuligPeriode = oppgave.papirSmRegistering.perioder.find(
            (periode) => !!periode.aktivitetIkkeMulig,
        );
        expect(getByLabelText('4.3.1 f.o.m. - 4.3.2 t.o.m.', { selector: 'input' })).toHaveValue(
            `${dayjs(aktivitetIkkeMuligPeriode?.fom).format('DD.MM.YYYY')} - ${dayjs(
                aktivitetIkkeMuligPeriode?.tom,
            ).format('DD.MM.YYYY')}`,
        );
        expect(
            getByLabelText('Helsetilstanden hindrer pasienten i å være i aktivitet', { selector: 'input' }),
        ).toBeChecked();
        expect(
            getByLabelText('Aktivitet vil hindre/forsinke bedring av helsetilstanden', { selector: 'input' }),
        ).toBeChecked();
        expect(getByDisplayValue('Dette er beskrivelsen på den medisinske årsaken')).toBeInTheDocument();
        expect(getByLabelText('Manglende tilrettelegging på arbeidsplassen', { selector: 'input' })).toBeChecked();
        expect(getAllByLabelText('Annet', { selector: 'input' })[1]).toBeChecked();
        expect(getByDisplayValue('Dette er beskrivelsen på den arbeidsrelaterte årsaken')).toBeInTheDocument();

        // Behandlingsdager periode
        const behandlingsdagerPeriode = oppgave.papirSmRegistering.perioder.find(
            (periode) => !!periode.behandlingsdager,
        );
        expect(getByLabelText('4.4.1 f.o.m. - 4.4.2 t.o.m.', { selector: 'input' })).toHaveValue(
            `${dayjs(behandlingsdagerPeriode?.fom).format('DD.MM.YYYY')} - ${dayjs(behandlingsdagerPeriode?.tom).format(
                'DD.MM.YYYY',
            )}`,
        );
        expect(getByLabelText('4.4.3 Oppgi antall dager i perioden', { selector: 'input' })).toHaveValue(
            behandlingsdagerPeriode?.behandlingsdager,
        );

        // Reisetilskudd periode
        const reisetilskuddPeriode = oppgave.papirSmRegistering.perioder.find((periode) => !!periode.reisetilskudd);
        expect(getByLabelText('4.5.1 f.o.m. - 4.5.2 t.o.m.', { selector: 'input' })).toHaveValue(
            `${dayjs(reisetilskuddPeriode?.fom).format('DD.MM.YYYY')} - ${dayjs(reisetilskuddPeriode?.tom).format(
                'DD.MM.YYYY',
            )}`,
        );

        // Arbeidsfør etter perioden
        expect(
            getByLabelText('Pasienten er 100 prosent arbeidsfør etter denne perioden', { selector: 'input' }),
        ).toBeChecked();

        // Hensyn arbeidsplassen
        expect(getByLabelText('5.1.1 Beskrive eventuelle hensyn som må tas på arbeidsplassen')).toHaveValue(
            oppgave.papirSmRegistering.prognose.hensynArbeidsplassen,
        );

        // Er i arbeid
        expect(
            getByLabelText('Pasienten kan på sikt komme tilbake til samme arbeidsgiver', { selector: 'input' }),
        ).toBeChecked();
        expect(getAllByLabelText('Anslå når dette kan skje', { selector: 'input' })[0]).toHaveValue(
            dayjs(oppgave.papirSmRegistering.prognose.erIArbeid.arbeidFOM).format('DD.MM.YYYY'),
        );
        expect(
            getByLabelText('Pasienten kan på sikt komme i arbeid hos annen arbeidsgiver', { selector: 'input' }),
        ).toBeChecked();
        expect(
            getAllByLabelText('5.2.3 Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?', {
                selector: 'input',
            })[0],
        ).toHaveValue(dayjs(oppgave.papirSmRegistering.prognose.erIArbeid.vurderingsdato).format('DD.MM.YYYY'));

        // Er ikke i arbeid
        expect(getByLabelText('Pasienten kan komme tilbake i arbeid på sikt', { selector: 'input' })).toBeChecked();
        expect(getAllByLabelText('Anslå når dette kan skje', { selector: 'input' })[1]).toHaveValue(
            dayjs(oppgave.papirSmRegistering.prognose.erIkkeIArbeid.arbeidsforFOM).format('DD.MM.YYYY'),
        );
        expect(
            getAllByLabelText('5.3.2 Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?', {
                selector: 'input',
            })[0],
        ).toHaveValue(dayjs(oppgave.papirSmRegistering.prognose.erIkkeIArbeid.vurderingsdato).format('DD.MM.YYYY'));

        // Utdypende
        expect(
            getByLabelText(
                '6.1.1 Er det sykdommen, utredningen og/eller behandlingen som hindrer økt aktivitet? Beskriv.',
            ),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.1'].svar);
        expect(getByLabelText('6.1.2 Har behandlingen frem til nå bedret arbeidsevnen?')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.2'].svar,
        );
        expect(getByLabelText('6.1.3 Hva er videre plan for behandling?')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.3'].svar,
        );
        expect(getByLabelText('6.1.4 Er det arbeidsforholdet som hindrer (økt) aktivitet? Beskriv.')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.4'].svar,
        );
        expect(getByLabelText('6.1.5 Er det andre forhold som hindrer (økt) aktivitet?')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.5'].svar,
        );
        expect(getByLabelText('6.2.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.2']['6.2.1'].svar,
        );
        expect(getByLabelText('6.2.2 Hvordan påvirker sykdommen arbeidsevnen?')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.2']['6.2.2'].svar,
        );
        expect(getByLabelText('6.2.3 Har behandlingen frem til nå bedret arbeidsevnen?')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.2']['6.2.3'].svar,
        );
        expect(
            getByLabelText('6.2.4 Beskriv pågående og planlagt henvisning,utredning og/eller behandling.'),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.2']['6.2.4'].svar);
        expect(getByLabelText('6.3.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.3']['6.3.1'].svar,
        );
        expect(
            getByLabelText(
                '6.3.2 Beskriv pågående og planlagt henvisning, utredning og/eller behandling. Lar dette seg kombinere med delvis arbeid?',
            ),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.3']['6.3.2'].svar);
        expect(getByLabelText('6.4.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.4']['6.4.1'].svar,
        );
        expect(
            getByLabelText('6.4.2 Beskriv pågående og planlagt henvisning, utredning og/eller behandling'),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.4']['6.4.2'].svar);
        expect(
            getByLabelText('6.4.3 Hva mener du skal til for at pasienten kan komme tilbake i eget eller annet arbeid?'),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.4']['6.4.3'].svar);
        expect(getByLabelText('6.5.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.5']['6.5.1'].svar,
        );
        expect(getByLabelText('6.5.2 Hvordan påvirker dette funksjons-/arbeidsevnen?')).toHaveValue(
            oppgave.papirSmRegistering.utdypendeOpplysninger['6.5']['6.5.2'].svar,
        );
        expect(
            getByLabelText('6.5.3 Beskriv pågående og planlagt henvisning, utredning og/eller medisinsk behandling'),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.5']['6.5.3'].svar);
        expect(
            getByLabelText(
                '6.5.4 Kan arbeidsevnen bedres gjennom medisinsk behandling og/eller arbeidsrelatert aktivitet? I så fall hvordan? Angi tidsperspektiv',
            ),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.5']['6.5.4'].svar);
        expect(
            getByLabelText(
                '6.6.1 Hva antar du at pasienten kan utføre av eget arbeid/arbeidsoppgaver i dag eller i nær framtid?',
            ),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.6']['6.6.1'].svar);
        expect(
            getByLabelText(
                '6.6.2 Hvis pasienten ikke kan gå tilbake til eget arbeid, hva antar du at pasienten kan utføre av annet arbeid/arbeidsoppgaver?',
            ),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.6']['6.6.2'].svar);
        expect(
            getByLabelText('6.6.3 Hvilken betydning har denne sykdommen for den nedsatte arbeidsevnen?'),
        ).toHaveValue(oppgave.papirSmRegistering.utdypendeOpplysninger['6.6']['6.6.3'].svar);

        // TiltakNAV
        expect(
            getByLabelText('Tilrettelegging/hensyn som bør tas på arbeidsplassen', { selector: 'textarea' }),
        ).toHaveTextContent(oppgave.papirSmRegistering.tiltakArbeidsplassen);

        // Tiltak arbeidsgiver
        expect(
            getByLabelText('Tiltak i regi av NAV. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)', {
                selector: 'textarea',
            }),
        ).toHaveTextContent(oppgave.papirSmRegistering.tiltakNAV);

        // Andre tiltak
        expect(getByLabelText('Eventuelle andre innspill til NAV', { selector: 'textarea' })).toHaveTextContent(
            oppgave.papirSmRegistering.andreTiltak,
        );

        // Melding til NAV
        expect(getByLabelText('Ønskes bistand fra NAV nå?', { selector: 'input' })).toBeChecked();
        expect(getByLabelText('Begrunn nærmere', { selector: 'textarea' })).toHaveTextContent(
            oppgave.papirSmRegistering.meldingTilNAV.beskrivBistand,
        );

        // Melding til arbeidsgiver
        expect(getByLabelText('9.1 Andre innspill til arbeidsgiver', { selector: 'textarea' })).toHaveTextContent(
            oppgave.papirSmRegistering.meldingTilArbeidsgiver,
        );

        // Tilbakedatering
        expect(getByLabelText('Er sykmelding tilbakedatert?', { selector: 'input' })).toBeChecked();
        expect(getByLabelText('Oppgi dato for dokumenterbar kontakt med pasienten', { selector: 'input' })).toHaveValue(
            dayjs(oppgave.papirSmRegistering.kontaktMedPasient.kontaktDato).format('DD.MM.YYYY'),
        );
        expect(
            getByLabelText('Pasienten har ikke kunnet ivareta egne interesser', { selector: 'input' }),
        ).toBeChecked();
        expect(getByLabelText('Begrunn', { selector: 'textarea' })).toHaveValue(
            oppgave.papirSmRegistering.kontaktMedPasient.begrunnelseIkkeKontakt,
        );

        // Behandler FNR
        expect(getByLabelText('Sykmelders fødselsnummer (11 siffer)', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.fnr,
        );

        // Behandler AktørID
        expect(getByLabelText('AktørID', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.aktoerId,
        );

        // Behandletdato
        expect(getByLabelText('12.1 Behandletdato', { selector: 'input' })).toHaveValue(
            dayjs(oppgave.papirSmRegistering.behandletTidspunkt).format('DD.MM.YYYY'),
        );

        // Behandler fornavn
        expect(getByLabelText('12.2.1 Sykmelders fornavn', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.fornavn,
        );

        // Behandler etternavn
        expect(getByLabelText('12.2.2 Sykmelders etternavn', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.etternavn,
        );

        // HPR nummer
        expect(getByLabelText('12.4 HPR-nummer', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.hpr,
        );

        // Telefon
        expect(getByLabelText('12.5 Telefon', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.tlf,
        );

        // Adresse
        expect(getByLabelText('Gate', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.adresse.gate,
        );
        expect(getByLabelText('Postnummer', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.adresse.postnummer,
        );
        expect(getByLabelText('Kommune', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.adresse.kommune,
        );
        expect(getByLabelText('Postboks', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.adresse.postboks,
        );
        expect(getByLabelText('Land', { selector: 'input' })).toHaveValue(
            oppgave.papirSmRegistering.behandler.adresse.land,
        );
    });
});
