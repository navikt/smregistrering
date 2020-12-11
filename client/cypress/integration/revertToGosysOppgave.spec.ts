/// <reference types="cypress" />

context('Revert to gosys oppgave', () => {
    beforeEach(() => {
        // Cypress does not support stubbing of window.fetch
        // Fetch is polyfilled in /client/src/index.ts
        // Must delete window.fetch for the polyfill to work
        cy.on('window:before:load', (win) => {
            win.fetch = null;
        });

        cy.server(); // enable response stubbing
    });

    it('Should display modal when clicking "Send til GOSYS"', () => {
        cy.route({
            method: 'GET',
            url: '/backend/api/v1/oppgave/123',
            response: 'fixture:emptyOppgave.json', // Gets the response from ../fixtures/fullOppgave.json
        });
        cy.route({
            method: 'POST',
            url: '/backend/api/v1/oppgave/123/tilgosys',
            response: 'OK',
        });
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

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.fixture('emptyOppgave').then(() => {
            cy.wait(2000); // To make sure enhet is fetched in decorator
            cy.getAndScrollIntoView('#to-gosys-button').wait(100).contains('Send til GOSYS').click();
            cy.get('#to-gosys-modal-button').contains('Send til GOSYS').click();
            cy.get('#tilbake-til-gosys-lenke').contains('Tilbake til GOSYS');
        });
    });
});
