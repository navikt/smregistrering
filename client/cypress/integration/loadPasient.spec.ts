/// <reference types="cypress" />

context('Load pasient info', () => {
    beforeEach(() => {
        cy.route2('GET', '/backend/api/v1/oppgave/123', {
            fixture: 'nullFnrOppgave.json',
        }).as('getOppgave');
    });
    it('Should search for name of pasient when typing 11 digits in pasientFnr input field', () => {
        cy.route2('GET', '/backend/api/v1/pasient/12345678910', {
            delayMs: 1000,
            fixture: 'pasient.json',
        });

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');
        cy.get('#pasientFnr').type('12345678910');
        cy.get('#pasientFnr--name').contains('Per Anders Persson');
    });
    it('Should display error when request fails', () => {
        cy.route2('GET', '/backend/api/v1/pasient/12345678910', {
            delayMs: 1000,
            statusCode: 500,
        });

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');
        cy.get('#pasientFnr').type('12345678910');
        cy.get('#Pasientopplysninger').contains('Fant ikke pasient knyttet til det aktuelle fødselsnummeret');
    });
});
