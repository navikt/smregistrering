/// <reference types="cypress" />

context('Api errors', () => {
    beforeEach(() => {
        cy.route2('GET', '/backend/api/v1/oppgave/123', {
            fixture: 'fullOppgave.json',
        }).as('getOppgave');
        cy.route2('GET', '/modiacontextholder/api/context/aktivenhet', {
            body: { aktivBruker: null, aktivEnhet: '0314' },
        });
        cy.route2('GET', '/modiacontextholder/api/decorator', {
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
        cy.route2('POST', '/backend/api/v1/oppgave/123/send', {
            body: 'This is a text body',
            statusCode: 400,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');

        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.getAndScrollIntoView('#api-error').contains('This is a text body');
    });

    it('Should show received body error message when status code is 401', () => {
        cy.route2('POST', '/backend/api/v1/oppgave/123/send', {
            body: 'This is a text body',
            statusCode: 401,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');

        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.getAndScrollIntoView('#api-error').contains('This is a text body');
    });

    it('Should show received body error message when status code is 404', () => {
        cy.route2('POST', '/backend/api/v1/oppgave/123/send', {
            body: 'This is a text body',
            statusCode: 404,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');

        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.getAndScrollIntoView('#api-error').contains('This is a text body');
    });

    it('Should show received body error message when status code is 500', () => {
        cy.route2('POST', '/backend/api/v1/oppgave/123/send', {
            body: 'This is a text body',
            statusCode: 500,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');

        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.getAndScrollIntoView('#api-error').contains('This is a text body');
    });

    it('Should show list of validation rulehits when body is json and status code is 400', () => {
        cy.route2('POST', '/backend/api/v1/oppgave/123/send', {
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
        cy.route2('POST', '/backend/api/v1/oppgave/123/send', {
            body: { wrong: 'prop' },
            statusCode: 400,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');
        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.get('#api-error').contains('Det oppsto en valideringsfeil. Feilkode: 400');
    });

    it('Should show status code is anything other than 400, 401, 403 and 500', () => {
        cy.route2('POST', '/backend/api/v1/oppgave/123/send', {
            body: { wrong: 'prop' },
            statusCode: 501,
        }).as('postOppgave');

        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.wait('@getOppgave');
        cy.getAndScrollIntoView('#form-submit-checkbox').click({ force: true });
        cy.getAndScrollIntoView('#submit-form').click({ force: true });
        cy.get('#api-error').contains('Det oppsto en feil i baksystemet med feilkode: 501');
    });
});
