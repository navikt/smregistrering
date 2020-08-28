import dayjs from 'dayjs';

/// <reference types="cypress" />
import { Oppgave } from '../../src/types/Oppgave';

context('App', () => {
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
            url: '/user',
            response: 'Ola Normann',
        });

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json
    });

    it('Should fill all fields when "oppgave" is complete', () => {
        cy.route({
            method: 'GET',
            url: '/backend/api/v1/hentPapirSykmeldingManuellOppgave/?oppgaveid=123',
            response: 'fixture:fullOppgave.json', // Gets the response from ../fixtures/fullOppgave.json
        });

        cy.fixture('fullOppgave').then((oppgave: Oppgave) => {
            cy.get('#syketilfelleStartDato').should(
                'have.value',
                dayjs(oppgave.papirSmRegistering.syketilfelleStartDato).format('DD.MM.YYYY'),
            );
            cy.get('#pasientFnr').should('have.value', oppgave.fnr);
            cy.get('#harArbeidsgiver')
                .should('have.value', oppgave.papirSmRegistering.arbeidsgiver.harArbeidsgiver)
                .and('be.visible');
        });
    });

    it('Should not fill any field when "oppgave" is empty', () => {
        cy.route({
            method: 'GET',
            url: '/backend/api/v1/hentPapirSykmeldingManuellOppgave/?oppgaveid=123',
            response: 'fixture:emptyOppgave.json', // Gets the response from ../fixtures/emptyOppgave.json
        });

        cy.get('#syketilfelleStartDato').should('not.have.value').click();
        cy.get('.flatpickr-day').contains('6').should('be.visible').click();
        cy.get('#pasientFnr').should('not.have.value').type('12345678910');
        cy.get('#harArbeidsgiver').select('Én arbeidsgiver');
    });
});
