import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import FetchMock from 'yet-another-fetch-mock'

import Index from '../pages/index'
import { mockLocation, render, screen, within } from '../utils/testUtils'

import emptyOppgave from './testData/emptyOppgave.json'

describe('Load pasientinfo', () => {
    let mock: FetchMock

    const oppgaveid = 123

    beforeEach(() => {
        mock = FetchMock.configure({
            enableFallback: false,
        })

        mockLocation(oppgaveid)
        mock.get(`/api/backend/api/v1/oppgave/${oppgaveid}`, (req, res, ctx) => res(ctx.json(emptyOppgave)))
    })

    afterEach(() => {
        mock.restore()
    })

    it('Should display modal when clicking "Send til GOSYS"', async () => {
        mock.post(`/api/backend/api/v1/oppgave/${oppgaveid}/tilgosys`, (req, res, ctx) =>
            res(ctx.status(200), ctx.text('OK')),
        )
        render(
            <div id="root">
                <Index />
            </div>,
        )

        expect(await screen.findByRole('heading', { name: 'Vennligst legg inn opplysningene fra papirsykmeldingen' }))
        await userEvent.click(await screen.findByRole('button', { name: 'Dette er ikke en sykmelding' }))
        expect(await screen.findByText('Send til GOSYS?')).toBeInTheDocument()
        await userEvent.click(await screen.findByRole('button', { name: 'Send til GOSYS' }))

        const dialog = within(await screen.findByRole('dialog', { name: 'Oppgaven ble sendt tilbake til GOSYS.' }))
        expect(dialog.getByRole('link', { name: 'Tilbake til GOSYS' })).toBeInTheDocument()
    })
})
