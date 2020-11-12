/// <reference types="cypress" />
import { Oppgave } from '../../src/types/Oppgave';

context('Submit oppgave', () => {
    beforeEach(() => {
        // Cypress does not support stubbing of window.fetch
        // Fetch is polyfilled in /client/src/index.ts
        // Must delete window.fetch for the polyfill to work
        cy.on('window:before:load', (win) => {
            win.fetch = null;
        });

        cy.server(); // enable response stubbing
    });

    it('Should submit oppgave, and display success modal', () => {
        cy.route({
            method: 'GET',
            url: '/backend/api/v1/oppgave/123',
            response: 'fixture:fullOppgave.json', // Gets the response from ../fixtures/fullOppgave.json
        }).as('getOppgave');
        cy.route({
            method: 'POST',
            url: '/backend/api/v1/oppgave/123/send',
            status: 204,
            response: {}
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

        cy.wait('@getOppgave')
        cy.wait(1000) // to allow for synchronization of enhet from decorator
        cy.get('#form-submit-checkbox').scrollIntoView().should('be.visible').click({ force: true }); // Force because cypress complains that the label covers the input element.
        cy.get('#submit-form').click();
        cy.get('#success-modal-text').contains("Oppgaven ble ferdigstilt.")
    })

    it('Should be able to fill out form and ')
})