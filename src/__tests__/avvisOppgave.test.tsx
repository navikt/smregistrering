import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import FetchMock from 'yet-another-fetch-mock'

import Index from '../pages/index'
import { mockBehandlerinfo, mockLocation, mockPasientinfo, render, screen } from '../utils/testUtils'

import fullOppgave from './testData/fullOppgave.json'

describe('Avvis oppgave', () => {
    let mock: FetchMock

    const oppgaveid = 123

    beforeEach(() => {
        mock = FetchMock.configure({
            enableFallback: false,
        })

        mockLocation(oppgaveid)
        mock.get(`/api/backend/api/v1/oppgave/${oppgaveid}`, (req, res, ctx) => res(ctx.json(fullOppgave)))
        mockPasientinfo(mock)
        mockBehandlerinfo(mock)
    })

    afterEach(() => {
        mock.restore()
    })

    it('Should display modal with confirmation when clicking "avvis sykmeldingen"', async () => {
        mock.post(`/api/backend/api/v1/oppgave/${oppgaveid}/avvis`, (req, res, ctx) =>
            res(ctx.status(200), ctx.text('OK')),
        )
        render(
            <div id="root">
                <Index />
            </div>,
        )

        expect(await screen.findByRole('heading', { name: 'Vennligst legg inn opplysningene fra papirsykmeldingen' }))
        await userEvent.click(await screen.findByRole('button', { name: 'Avvis sykmeldingen' }))
        expect(await screen.findByText('Er du sikker på at du vil avvise sykmeldingen?')).toBeInTheDocument()
        await userEvent.click(await screen.findByRole('button', { name: 'AVVIS SYKMELDING' }))
        expect(await screen.findByText('Tilbake til GOSYS')).toBeInTheDocument()
    })
})
