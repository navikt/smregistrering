import { Scope } from 'nock';
import { PropsWithChildren, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import pasientNavn from '../mock/pasientNavn.json';
import sykmelder from '../mock/sykmelder.json';
import StoreProvider from '../store';

export function mockLocation(oppgaveid: string | number): void {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
        value: {
            href: `http://localhost/?oppgaveid=${oppgaveid}`,
            search: `?oppgaveid=${oppgaveid}`,
        },
    });
}

export function mockBehandlerinfo(nock: Scope): void {
    nock.get(/\/backend\/api\/v1\/sykmelder\/(.*)/).reply(200, sykmelder);
}

export function mockPasientinfo(nock: Scope): void {
    nock.get('/api/backend/api/v1/pasient').reply(200, pasientNavn);
}

const AllTheProviders = ({ children }: PropsWithChildren<unknown>) => (
    <StoreProvider
        modiaContext={{
            aktivEnhet: '0314',
            enheter: [{ enhetId: '0314', navn: 'Testlamoen' }],
            navn: 'Test S. Testsson',
            ident: 'test-s-testsson',
        }}
    >
        {children}
    </StoreProvider>
);
export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
