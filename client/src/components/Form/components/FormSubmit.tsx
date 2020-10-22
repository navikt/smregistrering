import './FormSubmit.less';

import * as iotsPromise from 'io-ts-promise';
import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Checkbox } from 'nav-frontend-skjema';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Fareknapp, Flatknapp, Hovedknapp } from 'nav-frontend-knapper';

import { Oppgave } from '../../../types/Oppgave';
import { RegistrertSykmelding } from '../../../types/RegistrertSykmelding';
import { RuleHitErrors } from '../../../types/RuleHitErrors';
import { SchemaType } from '../Form';
import { buildRegistrertSykmelding } from '../../../utils/registrertSykmeldingUtils';

interface FormSubmitProps {
    oppgave: Oppgave;
    schema: SchemaType;
    validateAll: () => boolean;
    errorSummaryRef: React.RefObject<HTMLDivElement>;
    enhet: string | null | undefined;
}

const FormSubmit = ({ oppgave, schema, validateAll, errorSummaryRef, enhet }: FormSubmitProps) => {
    // Registrer sykmelding
    const [checked, setChecked] = useState<boolean>(false);
    const [isLoadingSuccess, setIsLoadingSuccess] = useState<boolean>(false);
    const [ruleHitErrors, setRuleHitErrors] = useState<RuleHitErrors | undefined>(undefined);
    const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const [successError, setSuccessError] = useState<Error | null>(null);

    // Avvis sykmelding
    const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);
    const [isLoadingReject, setIsLoadingReject] = useState<boolean>(false);
    const [rejectError, setRejectError] = useState<Error | null>(null);

    // Reverter til GOSYS
    const [revertModalOpen, setRevertModalOpen] = useState<boolean>(false);
    const [isLoadingRevert, setIsLoadingRevert] = useState<boolean>(false);
    const [revertError, setRevertError] = useState<Error | null>(null);

    Modal.setAppElement('#root');

    const registrerSykmelding = () => {
        if (validateAll() && !!enhet) {
            const sykmelding = buildRegistrertSykmelding(schema);
            if (sykmelding) {
                setIsLoadingSuccess(true);
                setSuccessError(null);
                fetch(`backend/api/v1/oppgave/${oppgave.oppgaveid}/send`, {
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
                            setSuccessModalOpen(true);
                        } else if (res.status === 400) {
                            return res.json();
                        } else {
                            throw new Error('Det oppsto en feil i baksystemet med feilkode: ' + res.status);
                        }
                    })
                    .then((json) => {
                        if (json) {
                            return iotsPromise.decode(RuleHitErrors, json);
                        }
                    })
                    .then((ruleHitErrors) => {
                        setRuleHitErrors(ruleHitErrors);
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
    };

    const rejectSykmelding = () => {
        if (!enhet) {
            setRejectError(new Error('Enhet mangler. Vennligst velg enhet øverst på siden'));
        } else {
            setIsLoadingReject(true);
            setRejectError(null);
            fetch(`backend/api/v1/oppgave/${oppgave.oppgaveid}/avvis`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Nav-Enhet': enhet,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setRejectModalOpen(false);
                        setSuccessModalOpen(true);
                    } else {
                        throw new Error(
                            `En feil oppsto ved avvisning av oppgave: ${oppgave.oppgaveid}. Feilkode: ${response.status}`,
                        );
                    }
                })
                .catch((error) => {
                    setRejectError(error);
                })
                .finally(() => {
                    setIsLoadingReject(false);
                });
        }
    };

    const revertSykmelding = () => {
        if (!enhet) {
            setRevertError(new Error('Enhet mangler. Vennligst velg enhet øverst på siden'));
        } else {
            setIsLoadingRevert(true);
            setRevertError(null);
            fetch(`backend/api/v1/oppgave/${oppgave.oppgaveid}/tilgosys`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Nav-Enhet': enhet,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setRevertModalOpen(false);
                        setSuccessModalOpen(true);
                    } else {
                        throw new Error(
                            `En feil oppsto ved sending av oppgave til GOSYS: ${oppgave.oppgaveid}. Feilkode: ${response.status}`,
                        );
                    }
                })
                .catch((error) => {
                    setRevertError(error);
                })
                .finally(() => {
                    setIsLoadingRevert(false);
                });
        }
    };

    return (
        <div role="region" aria-label="skjemainnsendingbeholder" className="form-submit-container">
            <Checkbox
                className="form-submit-checkbox"
                checked={checked}
                label="Informasjonen stemmer overens med papirsykmelding"
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
                disabled={!checked || !enhet || isLoadingSuccess}
                spinner={isLoadingSuccess}
                onClick={(e) => {
                    e.preventDefault();
                    registrerSykmelding();
                }}
            >
                Registrer sykmelding
            </Hovedknapp>
            <Flatknapp htmlType="button" onClick={() => setRejectModalOpen(true)}>
                Avvis sykmelding
            </Flatknapp>

            <Flatknapp htmlType="button" onClick={() => setRevertModalOpen(true)}>
                Send sykmelding tilbake til GOSYS
            </Flatknapp>

            <Modal
                isOpen={successModalOpen}
                onRequestClose={() => setSuccessModalOpen(false)}
                closeButton={true}
                contentLabel="Oppgaven er ferdigstilt"
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 2.5rem' }}>
                    <Normaltekst style={{ marginBottom: '2rem' }}>Oppgaven er ferdigstilt</Normaltekst>
                    <a href={process.env.REACT_APP_GOSYS_URL} tabIndex={0} className="knapp knapp--hoved">
                        Tilbake til GOSYS
                    </a>
                </div>
            </Modal>
            <Modal
                isOpen={rejectModalOpen}
                onRequestClose={() => setRejectModalOpen(false)}
                closeButton={true}
                contentLabel="Bekreft avvisning av sykmelding"
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 2.5rem' }}>
                    <Undertittel tag="h1" style={{ marginBottom: '2rem' }}>
                        Er du sikker på at du vil avvise sykmeldingen?
                    </Undertittel>
                    <Normaltekst tag="p" style={{ marginBottom: '2rem', maxWidth: '30rem' }}>
                        Dette vil ferdigstille oppgaven. Sykmeldingen blir ikke registrert i infotrygd. Behandler og
                        pasient blir ikke varslet.
                    </Normaltekst>
                    <Fareknapp
                        style={{ marginBottom: '1rem', margin: 'auto' }}
                        spinner={isLoadingReject}
                        onClick={() => rejectSykmelding()}
                    >
                        AVVIS SYKMELDING
                    </Fareknapp>
                    {rejectError && <AlertStripeFeil>{rejectError.message}</AlertStripeFeil>}
                </div>
            </Modal>
            <Modal
                isOpen={revertModalOpen}
                onRequestClose={() => setRevertModalOpen(false)}
                closeButton={true}
                contentLabel="Send sykmelding tilbake til GOSYS"
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 2.5rem' }}>
                    <Undertittel tag="h1" style={{ marginBottom: '2rem' }}>
                        Er du sikker på at du vil sende oppgaven tilbake til GOSYS?
                    </Undertittel>
                    <Normaltekst tag="p" style={{ marginBottom: '2rem', maxWidth: '30rem' }}>
                        Dette vil ikke ferdigstille oppgaven, men gjør det mulig å behandle den i GOSYS.
                    </Normaltekst>
                    <Fareknapp
                        style={{ marginBottom: '1rem', margin: 'auto' }}
                        spinner={isLoadingRevert}
                        onClick={() => revertSykmelding()}
                    >
                        Send til GOSYS
                    </Fareknapp>
                    {revertError && <AlertStripeFeil>{revertError.message}</AlertStripeFeil>}
                </div>
            </Modal>
        </div>
    );
};

export default FormSubmit;
