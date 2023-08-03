import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { within } from '@testing-library/react'

import Index from '../pages/index'
import { mockBehandlerinfo, mockLocation, mockPasientinfo, render, screen } from '../utils/testUtils'
import { server } from '../mocks/server'
import { apiUrl } from '../utils/fetchUtils'

import fullOppgave from './testData/fullOppgave.json'

describe('Avvis oppgave', () => {
    const oppgaveid = 123

    beforeEach(() => {
        mockLocation(oppgaveid)
        server.use(rest.get(apiUrl(`/v1/oppgave/${oppgaveid}`), (req, res, ctx) => res(ctx.json(fullOppgave))))
        mockPasientinfo()
        mockBehandlerinfo()
    })

    it('Should display modal with confirmation when clicking "avvis sykmeldingen"', async () => {
        server.use(
            rest.post(apiUrl(`/v1/oppgave/${oppgaveid}/avvis`), (req, res, ctx) =>
                res(ctx.status(200), ctx.text('OK')),
            ),
        )
        render(
            <div id="root">
                <Index />
            </div>,
        )

        expect(
            await screen.findByRole('heading', { name: 'Vennligst legg inn opplysningene fra papirsykmeldingen' }),
        ).toBeInTheDocument()
        await userEvent.click(await screen.findByRole('button', { name: 'Avvis sykmeldingen' }))
        expect(await screen.findByText('Er du sikker på at du vil avvise sykmeldingen?')).toBeInTheDocument()
        await userEvent.click(await screen.findByRole('button', { name: 'AVVIS SYKMELDING' }))

        expect(
            within(await screen.findByRole('dialog', { name: 'Oppgaven ble ferdigstilt.' })).getByRole('link', {
                name: 'Tilbake til GOSYS',
            }),
        ).toBeInTheDocument()
    })
})
