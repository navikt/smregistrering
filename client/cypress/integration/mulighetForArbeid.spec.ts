/// <reference types="cypress" />
/// <reference types="../support" />

context('Mulighet for arbeid section', () => {
    beforeEach(() => {
        cy.intercept('GET', '/backend/api/v1/oppgave/123', {
            fixture: 'fullOppgaveWithoutPeriods.json',
        }).as('getOppgave');
        cy.intercept('GET', '/modiacontextholder/api/context/aktivenhet', {
            body: { aktivBruker: null, aktivEnhet: '0314' },
        });
        cy.intercept('GET', '/modiacontextholder/api/decorator', {
            body: {
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
        cy.intercept('GET', '/backend/api/v1/sykmelder/1234567', {
            fixture: 'sykmelder.json',
        });
        cy.intercept('POST', '/backend/api/v1/oppgave/123/send', {
            statusCode: 204,
        }).as('postOppgave');
    });

    it('Should be able to delete periode without messing up other periods', () => {
        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');

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

        // delete middle periode
        cy.getAndScrollIntoView('#mulighetForArbeid-clear-button-1').click();

        // Assert after deletion
        // Avventende
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-0').should('have.value', 'avventende');
        cy.getAndScrollIntoView('#avventendePeriode-0').focus().should('have.value', '010120-030120');
        cy.getAndScrollIntoView('#avventendeInnspillTilArbeidsgiver-0').should(
            'have.value',
            'Innspill til arbeidsgiver',
        );

        // Aktivitet ikke mulig
        cy.getAndScrollIntoView('#mulighetForArbeid-selector-1').should('have.value', 'fullsykmelding');
        cy.getAndScrollIntoView('#aktivitetIkkeMuligPeriode-1').should('have.value', '010320-030320');
        cy.getAndScrollIntoView('#aktivitetIkkeMuligMedisinskArsak-1').should('be.checked');
        cy.get('#TILSTAND_HINDRER_AKTIVITET-medisinsk-1').should('be.checked');
        cy.getAndScrollIntoView('#aktivitetIkkeMuligMedisinskArsakBeskrivelse-1').should(
            'have.value',
            'Medisinsk beskrivelse',
        );
        cy.getAndScrollIntoView('#aktivitetIkkeMuligArbeidsrelatertArsak-1').should('be.checked');
        cy.get('#MANGLENDE_TILRETTELEGGING-arbeidsrelatert-1').should('be.checked');
        cy.getAndScrollIntoView('#aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse-1').should(
            'have.value',
            'Arbeidsrelatert beskrivelse',
        );

        // ----- REGISTRATION -----
        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.getAndScrollIntoView('#success-modal-text').contains('Oppgaven ble ferdigstilt.');

        cy.wait('@postOppgave')
            .its('request.body')
            .its('perioder')
            .should('deep.equal', [
                {
                    fom: '2020-01-01',
                    tom: '2020-01-03',
                    reisetilskudd: false,
                    avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
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
            ]);
    });
});
