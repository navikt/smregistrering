import { StartOptions } from 'msw/browser'

import { isLocalOrDemo } from '../utils/env'

const whitelistRequests = ['/_next/', '/api/logger', '/teamsykmelding/smregistrering/_next', '/aksel/fonts']

const onUnhandledRequest: StartOptions['onUnhandledRequest'] = (req, print): void => {
    const url: URL = new URL(req.url)
    if (whitelistRequests.some((whitelisted) => url.pathname.startsWith(whitelisted))) {
        return
    }

    print.warning()
}

async function initMocks() {
    if (typeof window === 'undefined') {
        // Don't mock server side in demo
        if (isLocalOrDemo) return

        const { server } = await import('./server')
        server.listen()
    } else {
        const { worker } = await import('./browser')
        worker.start({
            onUnhandledRequest,
        })
    }
}

initMocks()

export {}
