/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        getAndScrollIntoView(
            selector: string,
            options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
        ): Chainable<any>;
    }
}
