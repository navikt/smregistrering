import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

import { render, screen, within } from '../utils/testUtils'
import { server } from '../mocks/server'
import { apiUrl } from '../utils/fetchUtils'
import FormView from '../components/FormView'
import { Oppgave } from '../types/oppgave/Oppgave'
import { getDiagnosekoder } from '../utils/dataUtils'

import emptyOppgave from './testData/emptyOppgave.json'

describe('Load pasientinfo', async () => {
    const diagnosekoder = await getDiagnosekoder()

    beforeEach(() => {})

    it('Should display modal when clicking "Send til GOSYS"', async () => {
        server.use(
            rest.post(apiUrl(`/v1/oppgave/${emptyOppgave.oppgaveid}/tilgosys`), (req, res, ctx) =>
                res(ctx.status(200), ctx.text('OK')),
            ),
        )
        render(
            <FormView
                sykmeldingId={null}
                aktivEnhet="test-enhet"
                oppgave={emptyOppgave as Oppgave}
                diagnosekoder={diagnosekoder}
                isFerdigstilt={false}
            />,
        )

        expect(
            await screen.findByRole('heading', { name: 'Vennligst legg inn opplysningene fra papirsykmeldingen' }),
        ).toBeInTheDocument()
        await userEvent.click(await screen.findByRole('button', { name: 'Dette er ikke en sykmelding' }))
        expect(await screen.findByText('Send til GOSYS?')).toBeInTheDocument()
        await userEvent.click(await screen.findByRole('button', { name: 'Send til GOSYS' }))

        const dialog = within(await screen.findByRole('dialog', { name: 'Oppgaven ble sendt tilbake til GOSYS.' }))
        expect(dialog.getByRole('link', { name: 'Tilbake til GOSYS' })).toBeInTheDocument()
    })
})
