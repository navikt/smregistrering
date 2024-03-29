import Modal from 'nav-frontend-modal'
import React, { useEffect, useState } from 'react'
import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import { Checkbox } from 'nav-frontend-skjema'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import { Hovedknapp } from 'nav-frontend-knapper'

import useSubmitSykmelding from '../../../hooks/useSubmitSykmelding'
import { FormType } from '../Form'
import { getReturnToURL } from '../../../utils/urlUtils'

interface FormSubmitProps {
    oppgaveid: number
    enhet: string | null | undefined
    handleSubmit: (onSubmit: (state: FormType) => void) => void
    setIsComplete: React.Dispatch<React.SetStateAction<boolean>>
    isFerdigstilt: boolean
    sykmeldingId: string | null
}

const FormSubmit = ({
    oppgaveid,
    enhet,
    handleSubmit,
    setIsComplete,
    isFerdigstilt,
    sykmeldingId,
}: FormSubmitProps) => {
    const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false)

    const { checked, setChecked, isLoading, errorMessage, ruleHitError, submit, submitSuccess } = useSubmitSykmelding(
        oppgaveid,
        enhet,
        handleSubmit,
        isFerdigstilt,
        sykmeldingId,
    )

    useEffect(() => {
        if (submitSuccess) {
            setSuccessModalOpen(true)
            setIsComplete(true)
        }
    }, [submitSuccess, setIsComplete])

    const returnLink = getReturnToURL(sykmeldingId)

    return (
        <div role="region" aria-label="skjemainnsendingbeholder" className="form-submit-container">
            <Checkbox
                id="form-submit-checkbox"
                className="form-submit-checkbox"
                checked={checked}
                label="Feltene stemmer overens med opplysningene i papirsykmeldingen"
                onChange={() => setChecked((state) => !state)}
            />
            {ruleHitError && (
                <div id="api-validation-rulehits">
                    <AlertStripeFeil>
                        <Element>
                            Baksystemet fant ytterligere feil som må behandles. Rett feilene nedenfor, og forsøk å
                            registrere sykmeldingen på nytt.
                        </Element>
                        <ul>
                            {ruleHitError.ruleHits.map((ruleHit) => (
                                <li key={ruleHit.ruleName}>{ruleHit.messageForSender}</li>
                            ))}
                        </ul>
                    </AlertStripeFeil>
                    <br />
                </div>
            )}
            {errorMessage && (
                <div id="api-error">
                    <AlertStripeFeil>{errorMessage}</AlertStripeFeil>
                    <br />
                </div>
            )}
            <Hovedknapp
                id="submit-form"
                disabled={!checked || isLoading}
                spinner={isLoading}
                onClick={(e) => {
                    e.preventDefault()
                    submit()
                }}
            >
                {isFerdigstilt ? 'Korriger sykmeldingen' : 'Registrer sykmeldingen'}
            </Hovedknapp>
            <Modal
                isOpen={successModalOpen}
                onRequestClose={() => setSuccessModalOpen(false)}
                closeButton
                contentLabel="Oppgaven ble ferdigstilt."
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 2.5rem' }}>
                    <Normaltekst id="success-modal-text" style={{ marginBottom: '2rem' }}>
                        Oppgaven ble ferdigstilt.
                    </Normaltekst>
                    <a href={returnLink.url} className="knapp knapp--hoved">
                        {returnLink.text}
                    </a>
                </div>
            </Modal>
        </div>
    )
}

export default FormSubmit
