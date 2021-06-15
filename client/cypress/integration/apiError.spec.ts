/// <reference types="cypress" />

context('Api errors', () => {
    beforeEach(() => {
        cy.intercept('GET', '/backend/api/v1/oppgave/123', {
            fixture: 'fullOppgave.json',
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
    });

    it('Should show received body error message when status code is 400', () => {
        cy.intercept('POST', '/backend/api/v1/oppgave/123/send', {
            body: 'This is a text body',
            statusCode: 400,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');

        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.getAndScrollIntoView('#api-error').contains('This is a text body');
    });

    it('Should show generic error message when status code is 500', () => {
        cy.intercept('POST', '/backend/api/v1/oppgave/123/send', {
            body: 'This is a text body',
            statusCode: 500,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');

        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.getAndScrollIntoView('#api-error').contains(
            'Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere',
        );
    });

    it('Should show list of validation rulehits when content-type is application/json and status code is 400', () => {
        cy.intercept('POST', '/backend/api/v1/oppgave/123/send', {
            fixture: 'rulehits.json',
            statusCode: 400,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');
        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.get('#api-validation-rulehits').contains(
            'Baksystemet fant ytterligere feil som må behandles. Rett feilene nedenfor, og forsøk å registrere sykmeldingen på nytt.',
        );
        cy.get('#api-validation-rulehits').contains('Dont break the rules, please');
    });

    it('Should show validation error when receiving wrongly structured json and status code is 400', () => {
        cy.intercept('POST', '/backend/api/v1/oppgave/123/send', {
            body: { wrong: 'prop' },
            statusCode: 400,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');
        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.get('#api-error').contains('Det oppsto en valideringsfeil ved registrering av oppgave med id: 123');
    });
});
