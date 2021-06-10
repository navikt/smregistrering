import './FormSubmit.less';

import * as iotsPromise from 'io-ts-promise';
import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Checkbox } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import { FormType } from '../Form';
import { RegistrertSykmelding } from '../../../types/RegistrertSykmelding';
import { RuleHitErrors } from '../../../types/RuleHitErrors';
import { buildRegistrertSykmelding } from '../../../utils/registrertSykmeldingUtils';

interface FormSubmitProps {
    oppgaveid: number;
    errorSummaryRef: React.RefObject<HTMLDivElement>;
    enhet: string | null | undefined;
    handleSubmit: (onSubmit: (state: FormType) => void) => void;
}

const FormSubmit = ({ oppgaveid, enhet, handleSubmit }: FormSubmitProps) => {
    // Chexbox for confirming rightful answers
    const [checked, setChecked] = useState<boolean>(false);

    // API state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [ruleHitError, setRuleHitError] = useState<RuleHitErrors | null>(null);

    const [successModalContent, setSuccessModalContent] = useState<string | undefined>(undefined);
    Modal.setAppElement('#root');

    const registrerSykmelding = () => {
        setError(null);
        setRuleHitError(null);

        if (!enhet) {
            setError(new Error('Enhet mangler. Vennligst velg enhet fra nedtrekksmenyen øverst på siden'));
            return;
        }

        handleSubmit(async (formState) => {
            const sykmelding = buildRegistrertSykmelding(formState);

            if (!sykmelding) {
                window.frontendlogger.error('Noe gikk galt med konstruksjon av sykmeldingsobjekt');
                return;
            }

            setIsLoading(true);

            try {
                const res = await fetch(`backend/api/v1/oppgave/${oppgaveid}/send`, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Nav-Enhet': enhet,
                    },
                    body: JSON.stringify(RegistrertSykmelding.encode(sykmelding)),
                });

                if (res.ok) {
                    window.frontendlogger.info(`Oppgave med oppgaveid: ${oppgaveid} ble registrert`);
                    setSuccessModalContent('Oppgaven ble ferdigstilt.');
                } else if (res.status === 400) {
                    window.frontendlogger.error(`User encountered a ruleHit error. Oppgaveid: ${oppgaveid}`);
                    const ruleHits = await iotsPromise.decode(RuleHitErrors, await res.json());
                    setRuleHitError(ruleHits);
                } else if (res.status > 400 && res.status < 500) {
                    const text = await res.text();
                    window.frontendlogger.error(
                        `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
                    );
                    setError(new Error(text));
                } else {
                    const text = await res.text();
                    window.frontendlogger.error(
                        `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
                    );
                    setError(new Error('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere'));
                }
            } catch (e) {
                if (iotsPromise.isDecodeError(e)) {
                    window.frontendlogger.error(
                        `Det oppsto en valideringsfeil ved mottak av ruleHits for oppgaveid: ${oppgaveid}`,
                    );
                } else {
                    window.frontendlogger.error(e);
                }
                setError(
                    new Error(
                        'Det oppsto dessverre en ukjent feil i basystemet. Vennligst prøv igjen om en liten stund, og ta kontakt dersom problemet vedvarer.',
                    ),
                );
            }

            setIsLoading(false);
        });
    };

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
                    <AlertStripeFeil>{error.message}</AlertStripeFeil>
                    <br />
                </div>
            )}
            <Hovedknapp
                id="submit-form"
                disabled={!checked || isLoading}
                spinner={isLoading}
                onClick={(e) => {
                    e.preventDefault();
                    registrerSykmelding();
                }}
            >
                Registrer sykmelding
            </Hovedknapp>
            <Modal
                isOpen={!!successModalContent}
                onRequestClose={() => setSuccessModalContent(undefined)}
                closeButton
                contentLabel={successModalContent || ''}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 2.5rem' }}>
                    <Normaltekst id="success-modal-text" style={{ marginBottom: '2rem' }}>
                        {successModalContent}
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
