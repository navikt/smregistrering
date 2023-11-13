import { PropsWithChildren, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import pasientNavn from '../mocks/mock/pasientNavn.json'
import sykmelder from '../mocks/mock/sykmelder.json'
import StoreProvider from '../store'
import { server } from '../mocks/server'

import { apiUrl } from './fetchUtils'

export function mockLocation(oppgaveid: string | number): void {
    Object.defineProperty(window, 'location', {
        value: {
            href: `http://localhost/?oppgaveid=${oppgaveid}`,
            search: `?oppgaveid=${oppgaveid}`,
        },
    })
}

export function mockBehandlerinfo(): void {
    server.use(http.get(apiUrl('/v1/sykmelder/:hpr'), () => HttpResponse.json(sykmelder)))
}

export function mockPasientinfo(): void {
    server.use(http.get(apiUrl('/v1/pasient'), () => HttpResponse.json(pasientNavn)))
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
