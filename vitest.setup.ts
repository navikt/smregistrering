import '@testing-library/jest-dom/vitest'
import { vi, afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import Modal from 'nav-frontend-modal'

import { server } from './src/mocks/server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dirtyGlobal = global as any

Modal.setAppElement(dirtyGlobal.document.createElement('div'))
dirtyGlobal.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))
dirtyGlobal.scrollTo = vi.fn().mockImplementation(() => 0)

// @ts-expect-error Difficult to type :))
HTMLCanvasElement.prototype.getContext = vi.fn()

vi.mock('@navikt/next-oasis', () => ({
    validateToken: () => ({ ok: true, token: 'fake-token' }),
}))

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers()
    cleanup()
})
afterAll(() => server.close())

process.env.DEBUG_PRINT_LIMIT = '1000000'
