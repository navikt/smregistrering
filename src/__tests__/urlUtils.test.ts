import { describe, it, expect, beforeEach } from 'vitest'

import { getIdFromSearchParams, getReturnToURL } from '../utils/urlUtils'

describe('urlUtils', () => {
    beforeEach(() => {
        // @ts-expect-error JSDom allows this to be overwritten
        delete window.location
    })

    it('Returns the oppgaveid if it exists', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore - Because we only need the "search" property of the location, and TS complains that other properties are missing
        window.location = new URL('https://url.com/?oppgaveid=123456789')
        expect(getIdFromSearchParams()).toStrictEqual({ oppgaveId: '123456789' })
    })

    it('Returns the oppgaveid when multiple parameters exist', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore - Because we only need the "search" property of the location, and TS complains that other properties are missing
        window.location = new URL('https://url.com/?oppgaveid=123456789&param=val')
        expect(getIdFromSearchParams()).toStrictEqual({ oppgaveId: '123456789' })
    })

    it('Throws UrlError if the URI does not contain oppgaveid', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore - Because we only need the "search" property of the location, and TS complains that other properties are missing
        window.location = new URL('https://url.com/')
        expect(() => {
            getIdFromSearchParams()
        }).toThrow(URIError)
    })

    describe('getReturnToURL', () => {
        it('should return to modia when sykmeldingId is provided', () => {
            const returnToURL = getReturnToURL('123456789')

            expect(returnToURL.url).toEqual('http://localhost/modia')
            expect(returnToURL.text).toEqual('Tilbake til Modia')
        })

        it('should return to GOSYS when no sykmeldingId', () => {
            const returnToURL = getReturnToURL(null)

            expect(returnToURL.url).toEqual('http://localhost/gosys')
            expect(returnToURL.text).toEqual('Tilbake til GOSYS')
        })
    })
})
