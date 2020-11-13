/// <reference types="cypress" />

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
        cy.get('#pasientFnr').type('12345678910');

        // 2 Arbeidsgiver
        cy.get('#harArbeidsgiver').scrollIntoView().should('be.visible').select('EN_ARBEIDSGIVER');
        cy.get('#arbeidsgiverNavn').scrollIntoView().should('be.visible').type('Politiet');
        cy.get('#yrkesbetegnelse').scrollIntoView().should('be.visible').type('Politibetjent');
        cy.get('#stillingsprosent').scrollIntoView().should('be.visible').type('25');

        // 3 Diagnose
        cy.get('#hovedDiagnose')
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
                cy.get('#hovedDiagnose-system').select('2.16.578.1.12.4.1.1.7110', { force: true }).contains('ICD-10');
                cy.get('#hovedDiagnose-kode').type('A000{enter}', { force: true });
            });
        cy.get('#biDiagnoser')
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
                cy.contains('Legg til bidiagnose').click({ force: true });
                cy.get('#bidiagnose-0-system').select('2.16.578.1.12.4.1.1.7110', { force: true });
                cy.get('#bidiagnose-0-kode').type('A000{enter}', { force: true });
            });
        cy.get('#annenFraversArsak').scrollIntoView().should('be.visible').click({ force: true });
        cy.get('#annenFraversArsakGrunn')
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
                cy.get('#GODKJENT_HELSEINSTITUSJON').click({ force: true }).should('be.checked');
            });
        cy.get('#annenFraversArsakBeskrivelse')
            .scrollIntoView()
            .should('be.visible')
            .type('Dette er en beskrivelse av fraværet', { force: true });
        cy.get('#svangerskap').scrollIntoView().should('be.visible').click({ force: true }).should('be.checked');
        cy.get('#yrkesskade').scrollIntoView().should('be.visible').click({ force: true }).should('be.checked');
        cy.get('#yrkesskadeDato').type('01.01.2020{enter}', { force: true });
        cy.get('#skjermesForPasient').scrollIntoView().click({ force: true }).should('be.checked');

        // 4 Mulighet for arbeid
        cy.get('#avventendeSykmelding')
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true })
            .should('be.checked');
        cy.get('#avventendePeriode').focus().should('be.focused').type('01.10.2020 - 03.10.2020');
        cy.get('#avventendeInnspillTilArbeidsgiver').type('Innspill til arbeidsgiver', { force: true });

        // 7 Hva skal til for å bedre arbeidsevnen
        cy.get('#tiltakArbeidsplassen')
            .scrollIntoView()
            .should('be.visible')
            .type('Tiltak på arbeidsplassen', { force: true });
        cy.get('#tiltakNav').scrollIntoView().should('be.visible').type('Tiltak NAV', { force: true });
        cy.get('#andreTiltak').scrollIntoView().should('be.visible').type('Andre tiltak', { force: true });

        // 8 Melding til NAV
        cy.get('#meldingTilNavBistand')
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true })
            .should('be.checked');
        cy.get('#meldingTilNavBegrunn').scrollIntoView().should('be.visible').type('Meldin til NAV', { force: true });

        // 9 Melding til arbeidsgiver
        cy.get('#meldingTilArbeidsgiverBeskriv')
            .scrollIntoView()
            .should('be.visible')
            .type('Melding til arbeidsgiver', { force: true });

        // 12 Behandler
        cy.get('#behandletDato').scrollIntoView().should('be.visible').type('01.02.2020{enter}', { force: true });
        cy.get('#hpr').scrollIntoView().should('be.visible').type('1234567', { force: true });

        // ----- REGISTRATION -----
        cy.get('#form-submit-checkbox').scrollIntoView().should('be.visible').click({ force: true }); // Force because cypress complains that the label covers the input element.
        cy.get('#submit-form').scrollIntoView().should('be.visible').click({ force: true });
        cy.get('#success-modal-text').contains('Oppgaven ble ferdigstilt.');

        // Assert on network request
        cy.get('@postOppgave')
            .its('request.body')
            .should('deep.equal', {
                pasientFnr: '12345678910',
                sykmelderFnr: '',
                perioder: [
                    {
                        fom: '2020-10-01',
                        tom: '2020-10-03',
                        reisetilskudd: false,
                        avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
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
                    etternavn: '',
                    hpr: '1234567',
                    aktoerId: '',
                    adresse: {},
                },
                meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
                meldingTilNAV: {
                    bistandUmiddelbart: true,
                    beskrivBistand: 'Meldin til NAV',
                },
                tiltakNAV: 'Tiltak NAV',
                tiltakArbeidsplassen: 'Tiltak på arbeidsplassen',
                andreTiltak: 'Andre tiltak',
                utdypendeOpplysninger: {
                    '6.1': {},
                    '6.2': {},
                    '6.3': {},
                    '6.4': {},
                    '6.5': {},
                    '6.6': {},
                },
                kontaktMedPasient: {},
            });
    });
});
