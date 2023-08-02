import FetchMock from 'yet-another-fetch-mock'
import { PropsWithChildren, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

import pasientNavn from '../mock/pasientNavn.json'
import sykmelder from '../mock/sykmelder.json'
import StoreProvider from '../store'

export function mockLocation(oppgaveid: string | number): void {
    Object.defineProperty(window, 'location', {
        value: {
            href: `http://localhost/?oppgaveid=${oppgaveid}`,
            search: `?oppgaveid=${oppgaveid}`,
        },
    })
}

export function mockBehandlerinfo(mock: FetchMock): void {
    mock.get('/api/backend/api/v1/sykmelder/:hpr', (_, res, ctx) => res(ctx.json(sykmelder)))
}

export function mockPasientinfo(mock: FetchMock): void {
    mock.get('/api/backend/api/v1/pasient', (_, res, ctx) => res(ctx.json(pasientNavn)))
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
)
export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
