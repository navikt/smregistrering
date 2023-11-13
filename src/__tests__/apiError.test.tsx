import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { mockBehandlerinfo, mockPasientinfo, render, screen } from '../utils/testUtils'
import { server } from '../mocks/server'
import { apiUrl } from '../utils/fetchUtils'
import FormView from '../components/FormView'
import { Oppgave } from '../types/oppgave/Oppgave'
import { getDiagnosekoder } from '../utils/dataUtils'

import fullOppgave from './testData/fullOppgave.json'

describe('Registration api errors', async () => {
    const diagnosekoder = await getDiagnosekoder()

    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
    })

    it('Should show received body error message when status code is 400', async () => {
        server.use(
            http.post(
                apiUrl(`/v1/oppgave/${fullOppgave.oppgaveid}/send`),
                () =>
                    new HttpResponse('This is an error', {
                        status: 400,
                    }),
            ),
        )

        render(
            <FormView
                sykmeldingId="test-id"
                aktivEnhet="test-enhet"
                oppgave={fullOppgave as Oppgave}
                diagnosekoder={diagnosekoder}
                isFerdigstilt={false}
            />,
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
            http.post(
                apiUrl(`/v1/oppgave/${fullOppgave.oppgaveid}/send`),
                () =>
                    new HttpResponse('This is an error', {
                        status: 500,
                    }),
            ),
        )
        render(
            <FormView
                sykmeldingId="test-id"
                aktivEnhet="test-enhet"
                oppgave={fullOppgave as Oppgave}
                diagnosekoder={diagnosekoder}
                isFerdigstilt={false}
            />,
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
        const body = {
            status: 'INVALID',
            ruleHits: [
                {
                    ruleName: 'RULE_NUMBER_ONE',
                    ruleStatus: 'INVALID',
                    messageForSender: 'Dont break the rules, please',
                    messageForUser: 'message for user',
                },
            ],
        }
        server.use(
            http.post(apiUrl(`/v1/oppgave/${fullOppgave.oppgaveid}/send`), () =>
                HttpResponse.json(body, {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            ),
        )
        render(
            <FormView
                sykmeldingId="test-id"
                aktivEnhet="test-enhet"
                oppgave={fullOppgave as Oppgave}
                diagnosekoder={diagnosekoder}
                isFerdigstilt={false}
            />,
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
        const body = { wrong: 'prop' }
        server.use(
            http.post(apiUrl(`/v1/oppgave/${fullOppgave.oppgaveid}/send`), () =>
                HttpResponse.json(body, {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            ),
        )

        render(
            <FormView
                sykmeldingId="test-id"
                aktivEnhet="test-enhet"
                oppgave={fullOppgave as Oppgave}
                diagnosekoder={diagnosekoder}
                isFerdigstilt={false}
            />,
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
