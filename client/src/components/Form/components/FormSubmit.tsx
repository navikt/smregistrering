import './FormSubmit.less';

import Modal from 'nav-frontend-modal';
import React, { useEffect, useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Checkbox } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import useSubmitSykmelding from '../../../hooks/useSubmitSykmelding';
import { FormType } from '../Form';

interface FormSubmitProps {
    oppgaveid: number;
    enhet: string | null | undefined;
    handleSubmit: (onSubmit: (state: FormType) => void) => void;
}

const FormSubmit = ({ oppgaveid, enhet, handleSubmit }: FormSubmitProps) => {
    const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    Modal.setAppElement('#root');

    const { checked, setChecked, isLoading, error, ruleHitError, submit, submitSuccess } = useSubmitSykmelding(
        oppgaveid,
        enhet,
        handleSubmit,
    );

    useEffect(() => {
        if (submitSuccess) {
            setSuccessModalOpen(true);
        }
    }, [submitSuccess]);

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
                                <li>{ruleHit.messageForSender}</li>
                            ))}
                        </ul>
                    </AlertStripeFeil>
                    <br />
                </div>
            )}
            {error && (
                <div id="api-error">
                    <AlertStripeFeil>{error}</AlertStripeFeil>
                    <br />
                </div>
            )}
            <Hovedknapp
                id="submit-form"
                disabled={!checked || isLoading}
                spinner={isLoading}
                onClick={(e) => {
                    e.preventDefault();
                    submit();
                }}
            >
                Registrer sykmelding
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
                    <a href={process.env.REACT_APP_GOSYS_URL} tabIndex={0} className="knapp knapp--hoved">
                        Tilbake til GOSYS
                    </a>
                </div>
            </Modal>
        </div>
    );
};

export default FormSubmit;
