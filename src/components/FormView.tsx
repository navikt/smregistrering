import React, { ReactElement } from 'react'

import { Oppgave } from '../types/oppgave/Oppgave'
import { Diagnosekoder } from '../types/diagnosekoder/Diagnosekoder'

import Pdf from './Pdf/Pdf'
import Form from './Form/Form'

type Props = {
    sykmeldingId: string | null
    aktivEnhet: string | null
    oppgave: Oppgave
    diagnosekoder: Diagnosekoder
    isFerdigstilt: boolean
}

function FormView({ sykmeldingId, oppgave, diagnosekoder, aktivEnhet, isFerdigstilt }: Props): ReactElement {
    return (
        <main className="main-content-container">
            <Form
                oppgave={oppgave}
                diagnosekoder={diagnosekoder}
                enhet={aktivEnhet}
                isFerdigstilt={isFerdigstilt}
                sykmeldingId={sykmeldingId}
            />
            <Pdf pdf={oppgave.pdfPapirSykmelding} />
        </main>
    )
}

export default FormView
