/// <reference types="cypress" />
/// <reference types="../support" />

context('Submit oppgave', () => {
    beforeEach(() => {
        // Cypress does not support stubbing of window.fetch
        // Fetch is polyfilled in /client/src/index.ts
        // Must delete window.fetch for the polyfill to work
        cy.on('window:before:load', (win) => {
            win.fetch = null;
        });

        cy.server(); // enable response stubbing

        cy.route({
            method: 'GET',
            url: '/modiacontextholder/api/context/aktivenhet',
            response: { aktivBruker: null, aktivEnhet: '0314' },
        });
        cy.route({
            method: 'GET',
            url: '/modiacontextholder/api/decorator',
            response: {
                ident: 'Z123456',
                navn: 'F_Z123456 E_Z123456',
                fornavn: 'F_Z123456',
                etternavn: 'E_Z123456',
                enheter: [
                    { enhetId: '0314', navn: 'NAV Sagene' },
                    { enhetId: '0393', navn: 'NAV Oppfølging utland' },
                ],
            },
        });
        cy.route({
            method: 'GET',
            url: '/backend/api/v1/sykmelder/1234567',
            response: 'fixture:sykmelder.json',
        });
    });

    it('Should be able to fill out form and submit', () => {
        cy.route({
            method: 'GET',
            url: '/backend/api/v1/oppgave/123',
            response: 'fixture:emptyOppgave.json', // Gets the response from ../fixtures/emptyOppgave.json
        }).as('getOppgave');
        cy.route({
            method: 'POST',
            url: '/backend/api/v1/oppgave/123/send',
            status: 204,
            response: {},
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json
        cy.wait('@getOppgave');

        // 1 Pasientopplysninger
        cy.getAndScrollIntoView('#pasientFnr').type('12345678910');

        // 2 Arbeidsgiver
        cy.getAndScrollIntoView('#harArbeidsgiver').select('EN_ARBEIDSGIVER');
        cy.getAndScrollIntoView('#arbeidsgiverNavn').type('Politiet');
        cy.getAndScrollIntoView('#yrkesbetegnelse').type('Politibetjent');
        cy.getAndScrollIntoView('#stillingsprosent').type('25');

        // 3 Diagnose
        cy.getAndScrollIntoView('#hovedDiagnose').within(() => {
            cy.getAndScrollIntoView('#hovedDiagnose-system')
                .select('2.16.578.1.12.4.1.1.7110', { force: true })
                .contains('ICD-10');
            cy.getAndScrollIntoView('#hovedDiagnose-kode').type('A000{enter}', { force: true });
        });
        cy.getAndScrollIntoView('#biDiagnoser').within(() => {
            cy.contains('Legg til bidiagnose').click({ force: true });
            cy.getAndScrollIntoView('#bidiagnose-0-system').select('2.16.578.1.12.4.1.1.7110', { force: true });
            cy.getAndScrollIntoView('#bidiagnose-0-kode').type('A000{enter}', { force: true });
        });
        cy.getAndScrollIntoView('#annenFraversArsak').click({ force: true });
        cy.getAndScrollIntoView('#annenFraversArsakGrunn').within(() => {
            cy.get('#GODKJENT_HELSEINSTITUSJON').click({ force: true }).should('be.checked');
        });
        cy.getAndScrollIntoView('#annenFraversArsakBeskrivelse').type('Dette er en beskrivelse av fraværet', {
            force: true,
        });
        cy.getAndScrollIntoView('#svangerskap').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#yrkesskade').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#yrkesskadeDato').type('01.01.2020{enter}', { force: true });
        cy.getAndScrollIntoView('#skjermesForPasient').click({ force: true }).should('be.checked');

        // 4 Mulighet for arbeid
        //
        // TODO: Make generic so that it doesn't rely on a specific count/order of periods

        // Avventende
        cy.getAndScrollIntoView('#mulighetForArbeid-selector').select('avventende', { force: true });
        cy.getAndScrollIntoView('#avventendePeriode-0').focus().should('be.focused').type('01.01.2020 - 03.01.2020');
        cy.getAndScrollIntoView('#avventendeInnspillTilArbeidsgiver-0').type('Innspill til arbeidsgiver', {
            force: true,
        });
        cy.getAndScrollIntoView('#mulighetForArbeid-leggTilPeriode').click();

        // Gradert
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-1').select('gradert', { force: true });
        cy.getAndScrollIntoView('#gradertPeriode-1').focus().should('be.focused').type('01.02.2020 - 03.02.2020');
        cy.getAndScrollIntoView('#gradertGrad-1').type('80', { force: true });
        cy.getAndScrollIntoView('#gradertReisetilskudd-1').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#mulighetForArbeid-leggTilPeriode').click();

        // Aktivitet ikke mulig
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-2').select('fullsykmelding', { force: true });
        cy.getAndScrollIntoView('#aktivitetIkkeMuligPeriode-2')
            .focus()
            .should('be.focused')
            .type('01.03.2020 - 03.03.2020');
        cy.getAndScrollIntoView('#aktivitetIkkeMuligMedisinskArsak-2').click({ force: true }).should('be.checked');
        cy.get('#TILSTAND_HINDRER_AKTIVITET-medisinsk-2').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#aktivitetIkkeMuligMedisinskArsakBeskrivelse-2').type('Medisinsk beskrivelse', {
            force: true,
        });
        cy.getAndScrollIntoView('#aktivitetIkkeMuligArbeidsrelatertArsak-2')
            .click({ force: true })
            .should('be.checked');
        cy.get('#MANGLENDE_TILRETTELEGGING-arbeidsrelatert-2').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse-2').type(
            'Arbeidsrelatert beskrivelse',
            {
                force: true,
            },
        );
        cy.getAndScrollIntoView('#mulighetForArbeid-leggTilPeriode').click();

        // Behandlingsdager
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-3').select('behandlingsdager', { force: true });
        cy.getAndScrollIntoView('#behandlingsdagerPeriode-3')
            .focus()
            .should('be.focused')
            .type('01.04.2020 - 03.04.2020');
        cy.getAndScrollIntoView('#behandlingsdagerAntall-3').type('1', { force: true });
        cy.getAndScrollIntoView('#mulighetForArbeid-leggTilPeriode').click();

        // Reisetilskudd
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-4').select('reisetilskudd', { force: true });
        cy.getAndScrollIntoView('#reisetilskuddPeriode-4').focus().should('be.focused').type('01.05.2020 - 03.05.2020');

        // 5 Prognose
        cy.getAndScrollIntoView('#arbeidsfoerEtterPeriode').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#hensynArbeidsplassen').type('Hensyn arbeidsplassen', { force: true });
        cy.getAndScrollIntoView('#erIArbeid').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#egetArbeidPaSikt').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#arbeidFOM').focus().should('be.focused').type('21.10.2020');
        cy.getAndScrollIntoView('#annetArbeidPaSikt').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#vurderingsDatoIArbeid').focus().should('be.focused').type('24.10.2020');

        cy.getAndScrollIntoView('#erIkkeIArbeid').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#arbeidsforPaSikt').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#arbeidsforFOM').focus().should('be.focused').type('10.10.2020');
        cy.getAndScrollIntoView('#vurderingsDatoUtenArbeid').focus().should('be.focused').type('25.10.2020');

        // 6 Utdypende opplysninger
        cy.getAndScrollIntoView('#utdypende61').click();
        cy.getAndScrollIntoView('#utdypende611').type('utdypende611', { force: true });
        cy.getAndScrollIntoView('#utdypende612').type('utdypende612', { force: true });
        cy.getAndScrollIntoView('#utdypende613').type('utdypende613', { force: true });
        cy.getAndScrollIntoView('#utdypende614').type('utdypende614', { force: true });
        cy.getAndScrollIntoView('#utdypende615').type('utdypende615', { force: true });

        cy.getAndScrollIntoView('#utdypende62').click();
        cy.getAndScrollIntoView('#utdypende621').type('utdypende621', { force: true });
        cy.getAndScrollIntoView('#utdypende622').type('utdypende622', { force: true });
        cy.getAndScrollIntoView('#utdypende623').type('utdypende623', { force: true });
        cy.getAndScrollIntoView('#utdypende624').type('utdypende624', { force: true });

        cy.getAndScrollIntoView('#utdypende63').click();
        cy.getAndScrollIntoView('#utdypende631').type('utdypende631', { force: true });
        cy.getAndScrollIntoView('#utdypende632').type('utdypende632', { force: true });

        cy.getAndScrollIntoView('#utdypende64').click();
        cy.getAndScrollIntoView('#utdypende641').type('utdypende641', { force: true });
        cy.getAndScrollIntoView('#utdypende642').type('utdypende642', { force: true });
        cy.getAndScrollIntoView('#utdypende643').type('utdypende643', { force: true });

        cy.getAndScrollIntoView('#utdypende65').click();
        cy.getAndScrollIntoView('#utdypende651').type('utdypende651', { force: true });
        cy.getAndScrollIntoView('#utdypende652').type('utdypende652', { force: true });
        cy.getAndScrollIntoView('#utdypende653').type('utdypende653', { force: true });
        cy.getAndScrollIntoView('#utdypende654').type('utdypende654', { force: true });

        cy.getAndScrollIntoView('#utdypende66').click();
        cy.getAndScrollIntoView('#utdypende661').type('utdypende661', { force: true });
        cy.getAndScrollIntoView('#utdypende662').type('utdypende662', { force: true });
        cy.getAndScrollIntoView('#utdypende663').type('utdypende663', { force: true });

        // 8 Melding til NAV
        cy.getAndScrollIntoView('#meldingTilNavBistand').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#meldingTilNavBegrunn').type('Meldin til NAV', { force: true });

        // 9 Melding til arbeidsgiver
        cy.getAndScrollIntoView('#meldingTilArbeidsgiverBeskriv').type('Melding til arbeidsgiver', { force: true });

        // 10 Tilbakedatering
        cy.getAndScrollIntoView('#erTilbakedatert').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#kontaktDato').focus().should('be.focused').type('15.10.2020');
        cy.getAndScrollIntoView('#kunneIkkeIvaretaEgneInteresser').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#begrunnelseIkkeKontakt').type('Hadde omgangssyke', { force: true });

        // 12 Behandler
        cy.getAndScrollIntoView('#behandletDato').type('01.02.2020{enter}', { force: true });
        cy.getAndScrollIntoView('#hpr').type('1234567', { force: true });
        cy.getAndScrollIntoView('#sykmelderTelefon').type('12345678', { force: true });

        // ----- REGISTRATION -----
        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.getAndScrollIntoView('#success-modal-text').contains('Oppgaven ble ferdigstilt.');

        // Assert on network request
        cy.get('@postOppgave')
            .its('request.body')
            .should('deep.equal', {
                pasientFnr: '12345678910',
                sykmelderFnr: '',
                perioder: [
                    {
                        fom: '2020-01-01',
                        tom: '2020-01-03',
                        reisetilskudd: false,
                        avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                    },
                    {
                        fom: '2020-02-01',
                        tom: '2020-02-03',
                        reisetilskudd: false,
                        gradert: { reisetilskudd: true, grad: 80 },
                    },
                    {
                        fom: '2020-03-01',
                        tom: '2020-03-03',
                        reisetilskudd: false,
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
                    },
                    { fom: '2020-04-01', tom: '2020-04-03', reisetilskudd: false, behandlingsdager: 1 },
                    { fom: '2020-05-01', tom: '2020-05-03', reisetilskudd: true },
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
                    etternavn: '',
                    hpr: '1234567',
                    aktoerId: '',
                    adresse: {},
                    tlf: '12345678',
                },
                meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
                meldingTilNAV: { bistandUmiddelbart: true, beskrivBistand: 'Meldin til NAV' },
                prognose: {
                    arbeidsforEtterPeriode: true,
                    hensynArbeidsplassen: 'Hensyn arbeidsplassen',
                    erIArbeid: {
                        egetArbeidPaSikt: true,
                        annetArbeidPaSikt: true,
                        arbeidFOM: '2020-10-21',
                        vurderingsdato: '2020-10-24',
                    },
                    erIkkeIArbeid: {
                        arbeidsforPaSikt: true,
                        arbeidsforFOM: '2020-10-10',
                        vurderingsdato: '2020-10-25',
                    },
                },
                utdypendeOpplysninger: {
                    '6.1': {
                        '6.1.1': 'utdypende611',
                        '6.1.2': 'utdypende612',
                        '6.1.3': 'utdypende613',
                        '6.1.4': 'utdypende614',
                        '6.1.5': 'utdypende615',
                    },
                    '6.2': {
                        '6.2.1': 'utdypende621',
                        '6.2.2': 'utdypende622',
                        '6.2.3': 'utdypende623',
                        '6.2.4': 'utdypende624',
                    },
                    '6.3': { '6.3.1': 'utdypende631', '6.3.2': 'utdypende632' },
                    '6.4': { '6.4.1': 'utdypende641', '6.4.2': 'utdypende642', '6.4.3': 'utdypende643' },
                    '6.5': {
                        '6.5.1': 'utdypende651',
                        '6.5.2': 'utdypende652',
                        '6.5.3': 'utdypende653',
                        '6.5.4': 'utdypende654',
                    },
                    '6.6': { '6.6.1': 'utdypende661', '6.6.2': 'utdypende662', '6.6.3': 'utdypende663' },
                },
                kontaktMedPasient: {
                    kontaktDato: '2020-10-15',
                    begrunnelseIkkeKontakt: 'Hadde omgangssyke',
                },
            });
    });
});
