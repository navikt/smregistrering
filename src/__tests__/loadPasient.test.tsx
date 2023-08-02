import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import FetchMock from 'yet-another-fetch-mock'

import Index from '../pages/index'
import { mockBehandlerinfo, mockLocation, render, screen, waitForElementToBeRemoved } from '../utils/testUtils'

import nullFnrOppgave from './testData/nullFnrOppgave.json'

describe('Load pasientinfo', () => {
    let mock: FetchMock

    const oppgaveid = 123

    beforeEach(() => {
        mock = FetchMock.configure({
            enableFallback: false,
        })
        mockLocation(oppgaveid)
        mock.get(`/api/backend/api/v1/oppgave/${oppgaveid}`, (req, res, ctx) => res(ctx.json(nullFnrOppgave)))
        mockBehandlerinfo(mock)
    })

    afterEach(() => {
        mock.restore()
    })

    it('Should search for name of pasient when typing 11 digits in pasientFnr input field', async () => {
        mock.get('/api/backend/api/v1/pasient', (req, res, ctx) =>
            res(
                ctx.json({
                    fornavn: 'Per',
                    mellomnavn: 'Anders',
                    etternavn: 'Persson',
                }),
            ),
        )

        render(
            <div id="root">
                <Index />
            </div>,
        )

        expect(await screen.findByRole('heading', { name: 'Vennligst legg inn opplysningene fra papirsykmeldingen' }))
        await userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910')
        expect(await screen.findByText(/Henter informasjon/)).toBeInTheDocument()
        await waitForElementToBeRemoved(() => screen.queryByText(/Henter informasjon/))
        expect(await screen.findByText('Per Anders Persson')).toBeInTheDocument()
    })

    it('Should display error when request fails', async () => {
        mock.get('/api/backend/api/v1/pasient', (req, res, ctx) => res(ctx.status(500)))
        render(
            <div id="root">
                <Index />
            </div>,
        )

        expect(await screen.findByRole('heading', { name: 'Vennligst legg inn opplysningene fra papirsykmeldingen' }))
        await userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910')
        expect(await screen.findByText(/Henter informasjon/)).toBeInTheDocument()
        await waitForElementToBeRemoved(() => screen.queryByText(/Henter informasjon/))
        expect(
            await screen.findByText('En feil oppsto ved henting av pasientinfo. Ta kontakt dersom feilen vedvarer.'),
        ).toBeInTheDocument()
    })
})
