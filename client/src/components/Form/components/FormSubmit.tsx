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

const FormSubmit = ({ oppgaveid, errorSummaryRef, enhet, handleSubmit }: FormSubmitProps) => {
    // Registrer sykmelding
    const [checked, setChecked] = useState<boolean>(false);
    const [ruleHitErrors, setRuleHitErrors] = useState<RuleHitErrors | undefined>(undefined);
    const [isLoadingSuccess, setIsLoadingSuccess] = useState<boolean>(false);
    const [successModalContent, setSuccessModalContent] = useState<string | undefined>(undefined);
    const [successError, setSuccessError] = useState<Error | null>(null);

    Modal.setAppElement('#root');

    const registrerSykmelding = () => {
        handleSubmit((formState) => {
            if (!!enhet) {
                const sykmelding = buildRegistrertSykmelding(formState);
                if (sykmelding) {
                    setIsLoadingSuccess(true);
                    setSuccessError(null);
                    fetch(`backend/api/v1/oppgave/${oppgaveid}/send`, {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Nav-Enhet': enhet,
                        },
                        body: JSON.stringify(RegistrertSykmelding.encode(sykmelding)),
                    })
                        .then((res) => {
                            if (res.status === 204) {
                                setSuccessModalContent('Oppgaven ble ferdigstilt.');
                            } else if (res.status === 400) {
                                // Try to parse body as json. if it fails, catch the error and parse the body as text instead
                                return res
                                    .clone()
                                    .json()
                                    .then((json) => {
                                        return iotsPromise.decode(RuleHitErrors, json);
                                    })
                                    .then((ruleHitErrors) => {
                                        setRuleHitErrors(ruleHitErrors);
                                    })
                                    .catch(() => res.text());
                            } else if ([401, 404, 500].includes(res.status)) {
                                return res.text();
                            } else {
                                throw new Error('Det oppsto en feil i baksystemet med feilkode: ' + res.status);
                            }
                        })
                        .then((errorText) => {
                            if (errorText) {
                                throw new Error(errorText);
                            }
                        })
                        .catch((error) => {
                            setSuccessError(error);
                            console.error(error);
                        })
                        .finally(() => setIsLoadingSuccess(false));
                } else {
                    console.error('Noe gikk galt med konstruksjon av sykmeldingsobjekt');
                }
            } else {
                setTimeout(() => {
                    if (errorSummaryRef.current) {
                        errorSummaryRef.current.focus();
                        errorSummaryRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            }
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
            {ruleHitErrors && (
                <>
                    <AlertStripeFeil>
                        <Element>
                            Baksystemet fant ytterligere feil som må behandles. Rett feilene nedenfor, og forsøk å
                            registrere sykmeldingen på nytt.
                        </Element>
                        <ul>
                            {ruleHitErrors.ruleHits.map((ruleHit) => (
                                <li>{ruleHit.messageForSender}</li>
                            ))}
                        </ul>
                    </AlertStripeFeil>
                    <br />
                </>
            )}
            {successError && (
                <>
                    <AlertStripeFeil>{successError.message}</AlertStripeFeil>
                    <br />
                </>
            )}
            {!enhet && (
                <>
                    <AlertStripeFeil>
                        <Element>Enhet mangler.</Element>
                        <Normaltekst>Velg enhet i nedtrekksmenyen øverst på siden.</Normaltekst>
                    </AlertStripeFeil>
                    <br />
                </>
            )}
            <Hovedknapp
                id="submit-form"
                disabled={!checked || !enhet || isLoadingSuccess}
                spinner={isLoadingSuccess}
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
