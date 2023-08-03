import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

import Index from '../pages/index'
import { mockBehandlerinfo, mockLocation, mockPasientinfo, render, screen } from '../utils/testUtils'
import { server } from '../mocks/server'
import { apiUrl } from '../utils/fetchUtils'

import fullOppgave from './testData/fullOppgave.json'

describe('Registration api errors', () => {
    const oppgaveid = 123

    beforeEach(() => {
        mockLocation(oppgaveid)
        mockPasientinfo()
        mockBehandlerinfo()
        server.use(rest.get(apiUrl(`/v1/oppgave/${oppgaveid}`), (req, res, ctx) => res(ctx.json(fullOppgave))))
    })

    it('Should show received body error message when status code is 400', async () => {
        server.use(
            rest.post(apiUrl(`/v1/oppgave/${oppgaveid}/send`), (req, res, ctx) =>
                res(ctx.status(400), ctx.text('This is an error')),
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

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', { name: 'Registrer sykmeldingen' })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(await screen.findByText('This is an error')).toBeInTheDocument()
    })

    it('Should show generic error message when status code is 500', async () => {
        server.use(
            rest.post(apiUrl(`/v1/oppgave/${oppgaveid}/send`), (req, res, ctx) =>
                res(ctx.status(500), ctx.text('This is an error')),
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

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', { name: 'Registrer sykmeldingen' })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(
            await screen.findByText('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere'),
        ).toBeInTheDocument()
    })

    it('Should show list of validation rulehits when content-type is application/json and status code is 400', async () => {
        server.use(
            rest.post(apiUrl(`/v1/oppgave/${oppgaveid}/send`), (req, res, ctx) =>
                res(
                    ctx.status(400),
                    ctx.set('Content-Type', 'application/json'),
                    ctx.json({
                        status: 'INVALID',
                        ruleHits: [
                            {
                                ruleName: 'RULE_NUMBER_ONE',
                                ruleStatus: 'INVALID',
                                messageForSender: 'Dont break the rules, please',
                                messageForUser: 'message for user',
                            },
                        ],
                    }),
                ),
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

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', { name: 'Registrer sykmeldingen' })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(await screen.findByText(/Baksystemet fant ytterligere feil som må behandles/)).toBeInTheDocument()
        expect(await screen.findByText('Dont break the rules, please')).toBeInTheDocument()
    })

    it('Should show validation error when receiving wrongly structured json and status code is 400', async () => {
        server.use(
            rest.post(apiUrl(`/v1/oppgave/${oppgaveid}/send`), (req, res, ctx) =>
                res(ctx.status(400), ctx.json({ wrong: 'prop' })),
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

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', { name: 'Registrer sykmeldingen' })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(
            await screen.findByText(/Det oppsto en valideringsfeil ved registrering av oppgave med id: 123/),
        ).toBeInTheDocument()
    })
})
