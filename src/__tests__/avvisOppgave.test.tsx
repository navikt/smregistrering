import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { within } from '@testing-library/react'

import { mockBehandlerinfo, mockPasientinfo, render, screen } from '../utils/testUtils'
import { server } from '../mocks/server'
import { apiUrl } from '../utils/fetchUtils'
import FormView from '../components/FormView'
import { Oppgave } from '../types/oppgave/Oppgave'
import { getDiagnosekoder } from '../utils/dataUtils'

import fullOppgave from './testData/fullOppgave.json'

describe('Avvis oppgave', async () => {
    const diagnosekoder = await getDiagnosekoder()

    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
    })

    it('Should display modal with confirmation when clicking "avvis sykmeldingen"', async () => {
        server.use(
            http.post(
                apiUrl(`/v1/oppgave/${fullOppgave.oppgaveid}/avvis`),
                () =>
                    new HttpResponse('OK', {
                        status: 200,
                    }),
            ),
        )
        render(
            <FormView
                sykmeldingId={null}
                aktivEnhet="test-enhet"
                oppgave={fullOppgave as Oppgave}
                diagnosekoder={diagnosekoder}
                isFerdigstilt={false}
            />,
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
