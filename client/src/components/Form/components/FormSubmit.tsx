import './FormSubmit.less';

import * as iotsPromise from 'io-ts-promise';
import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Checkbox } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';

import { Oppgave } from '../../../types/Oppgave';
import { RegistrertSykmelding } from '../../../types/RegistrertSykmelding';
import { RuleHitErrors } from '../../../types/RuleHitErrors';
import { SchemaType } from '../Form';
import { buildRegistrertSykmelding } from '../../../utils/registrertSykmeldingUtils';

interface FormSubmitProps {
    oppgave: Oppgave;
    schema: SchemaType;
    validateAll: () => boolean;
    focusErrorSummary: () => void;
    enhet: string | null | undefined;
}

const FormSubmit = ({ oppgave, schema, validateAll, focusErrorSummary, enhet }: FormSubmitProps) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiErrors, setApiErrors] = useState<RuleHitErrors | undefined>(undefined);
    const [modalState, setModalState] = useState<{ isOpen: boolean; textContent: string; contentLabel: string }>({
        isOpen: false,
        textContent: '',
        contentLabel: '',
    });

    Modal.setAppElement('#root');

    const registrerSykmelding = () => {
        if (validateAll() && !!enhet) {
            const sykmelding = buildRegistrertSykmelding(schema);
            if (sykmelding) {
                setIsLoading(true);
                fetch(`backend/api/v1/oppgave/${oppgave.oppgaveid}/send`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Nav-Enhet': enhet,
                    },
                    body: JSON.stringify(RegistrertSykmelding.encode(sykmelding)),
                })
                    .then((res) => {
                        if (res.status === 204) {
                            setModalState({
                                isOpen: true,
                                textContent: 'Sykmeldingen ble registrert.',
                                contentLabel: 'Sykmelding registrert',
                            });
                        } else {
                            return res.json();
                        }
                    })
                    .then((json) => {
                        if (json) {
                            return iotsPromise.decode(RuleHitErrors, json);
                        }
                    })
                    .then((ruleHitErrors) => {
                        setApiErrors(ruleHitErrors);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(() => setIsLoading(false));
            } else {
                console.error('Noe gikk galt med konstruksjon av sykmeldingsobjekt');
            }
        } else {
            focusErrorSummary();
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
            {apiErrors && (
                <>
                    <AlertStripeFeil>
                        <Element>
                            Baksystemet fant ytterligere feil som må behandles. Rett feilene nedenfor, og forsøk å
                            registrere sykmeldingen på nytt.
                        </Element>
                        <ul>
                            {apiErrors.ruleHits.map((ruleHit) => (
                                <li>{ruleHit.messageForSender}</li>
                            ))}
                        </ul>
                    </AlertStripeFeil>
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
                disabled={!checked || !enhet}
                spinner={isLoading}
                onClick={(e) => {
                    e.preventDefault();
                    registrerSykmelding();
                }}
            >
                Registrer sykmelding
            </Hovedknapp>
            <Flatknapp
                htmlType="button"
                onClick={() => {
                    setModalState({
                        isOpen: true,
                        textContent: 'Er du sikker på at du vil avbryte oppgaven og gå tilbake til GOSYS?',
                        contentLabel: 'Avbryt sykmelding og gå tilbake til gosys',
                    });
                }}
            >
                Avbryt
            </Flatknapp>
            <Modal
                isOpen={modalState.isOpen}
                onRequestClose={() => setModalState({ isOpen: false, textContent: '', contentLabel: '' })}
                closeButton={true}
                contentLabel={modalState.contentLabel}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 2.5rem' }}>
                    <Normaltekst style={{ marginBottom: '2rem' }}>{modalState.textContent}</Normaltekst>
                    <a href={process.env.REACT_APP_GOSYS_URL} tabIndex={0} className="knapp knapp--hoved">
                        Tilbake til GOSYS
                    </a>
                </div>
            </Modal>
        </div>
    );
};

export default FormSubmit;
