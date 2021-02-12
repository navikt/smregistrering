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

        cy.intercept('GET', '/modiacontextholder/api/context/aktivenhet', { aktivBruker: null, aktivEnhet: '0314' });
        cy.intercept('GET', '/modiacontextholder/api/decorator', {
            ident: 'Z123456',
            navn: 'F_Z123456 E_Z123456',
            fornavn: 'F_Z123456',
            etternavn: 'E_Z123456',
            enheter: [
                { enhetId: '0314', navn: 'NAV Sagene' },
                { enhetId: '0393', navn: 'NAV Oppfølging utland' },
            ],
        });
        cy.intercept('GET', '/backend/api/v1/sykmelder/1234567', { fixture: 'sykmelder.json' });
    });

    it('Should be able to fill out form and submit', () => {
        cy.intercept('GET', '/backend/api/v1/oppgave/123', {
            fixture: 'emptyOppgave.json', // Gets the response from ../fixtures/emptyOppgave.json
        }).as('getOppgave');
        cy.intercept('POST', '/backend/api/v1/oppgave/123/send', {
            statusCode: 204,
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
        cy.getAndScrollIntoView('#yrkesskadeDato').type('010120{enter}', { force: true });
        cy.getAndScrollIntoView('#skjermesForPasient').click({ force: true }).should('be.checked');

        // 4 Mulighet for arbeid
        //
        // TODO: Make generic so that it doesn't rely on a specific count/order of periods

        // Avventende
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-0').select('avventende', { force: true });
        cy.getAndScrollIntoView('#avventendePeriode-0').focus().should('be.focused').type('010120-030120{enter}');
        cy.getAndScrollIntoView('#avventendeInnspillTilArbeidsgiver-0').type('Innspill til arbeidsgiver', {
            force: true,
        });
        cy.getAndScrollIntoView('#mulighetForArbeid-leggTilPeriode').click();

        // Gradert
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-1').select('gradert', { force: true });
        cy.getAndScrollIntoView('#gradertPeriode-1').focus().should('be.focused').type('010220-030220{enter}');
        cy.getAndScrollIntoView('#gradertGrad-1').type('80', { force: true });
        cy.getAndScrollIntoView('#gradertReisetilskudd-1').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#mulighetForArbeid-leggTilPeriode').click();

        // Aktivitet ikke mulig
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-2').select('fullsykmelding', { force: true });
        cy.getAndScrollIntoView('#aktivitetIkkeMuligPeriode-2')
            .focus()
            .should('be.focused')
            .type('010320-030320{enter}');
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
        cy.getAndScrollIntoView('#behandlingsdagerPeriode-3').focus().should('be.focused').type('010420-030420{enter}');
        cy.getAndScrollIntoView('#behandlingsdagerAntall-3').type('1', { force: true });
        cy.getAndScrollIntoView('#mulighetForArbeid-leggTilPeriode').click();

        // Reisetilskudd
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-4').select('reisetilskudd', { force: true });
        cy.getAndScrollIntoView('#reisetilskuddPeriode-4').focus().should('be.focused').type('010520-030520{enter}');

        // 6 Utdypende opplysninger
        cy.getAndScrollIntoView('#harUtdypendeOpplysninger').click({ force: true }).should('be.checked');

        // 8 Melding til NAV
        cy.getAndScrollIntoView('#meldingTilNavBistand').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#meldingTilNavBegrunn').type('Meldin til NAV', { force: true });

        // 9 Melding til arbeidsgiver
        cy.getAndScrollIntoView('#meldingTilArbeidsgiverBeskriv').type('Melding til arbeidsgiver', { force: true });

        // 10 Tilbakedatering
        cy.getAndScrollIntoView('#erTilbakedatert').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#kontaktDato').focus().should('be.focused').type('151020{enter}');
        cy.getAndScrollIntoView('#kunneIkkeIvaretaEgneInteresser').click({ force: true }).should('be.checked');
        cy.getAndScrollIntoView('#begrunnelseIkkeKontakt').type('Hadde omgangssyke', { force: true });

        // 12 Behandler
        cy.getAndScrollIntoView('#behandletDato').type('010220{enter}', { force: true });
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
                harUtdypendeOpplysninger: true,
                meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
                meldingTilNAV: { bistandUmiddelbart: true, beskrivBistand: 'Meldin til NAV' },
                kontaktMedPasient: {
                    kontaktDato: '2020-10-15',
                    begrunnelseIkkeKontakt: 'Hadde omgangssyke',
                },
            });
    });
});
