import { setupServer } from 'msw/node'

import { browserEnv } from '../utils/env'

import { handlers as defaultHandlers } from './handlers'

const handlers = browserEnv.NEXT_PUBLIC_ENVIRONMENT === 'test' ? [] : defaultHandlers

export const server = setupServer(...handlers)
