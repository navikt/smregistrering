import { TextDecoder, TextEncoder } from 'util'

import 'vitest-dom/extend-expect'

import * as matchers from 'vitest-dom/matchers'
import { vi, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import Modal from 'nav-frontend-modal'

expect.extend(matchers)

process.env.DEBUG_PRINT_LIMIT = '1000000'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dirtyGlobal = global as any

Modal.setAppElement(dirtyGlobal.document.createElement('div'))
dirtyGlobal.TextEncoder = TextEncoder
dirtyGlobal.TextDecoder = TextDecoder
dirtyGlobal.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))
dirtyGlobal.scrollTo = vi.fn().mockImplementation(() => 0)

// @ts-expect-error Difficult to type :))
HTMLCanvasElement.prototype.getContext = vi.fn()

afterEach(() => {
    cleanup()
})
