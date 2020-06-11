import './FormSubmit.less';

import * as iotsPromise from 'io-ts-promise';
import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Checkbox } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';

import { Oppgave } from '../../../types/Oppgave';
import { RegistrertSykmelding } from '../../../types/RegistrertSykmelding';
import { RuleHitErrors } from '../../../types/RuleHitErrors';
import { SchemaType } from '../Form';
import { buildRegistrertSykmelding } from '../../../utils/registrertSykmeldingUtils';

interface FormSubmitProps {
    oppgave: Oppgave;
    schema: SchemaType;
    hasFormErrors: boolean;
    validateAll: () => boolean;
    focusErrorSummary: () => void;
}

const FormSubmit = ({ oppgave, schema, hasFormErrors, validateAll, focusErrorSummary }: FormSubmitProps) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiErrors, setApiErrors] = useState<RuleHitErrors | undefined>(undefined);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const registrerSykmelding = () => {
        if (validateAll()) {
            const sykmelding = buildRegistrertSykmelding(oppgave, schema);
            if (sykmelding) {
                setIsLoading(true);
                fetch(`backend/api/v1/sendPapirSykmeldingManuellOppgave/?oppgaveid=${oppgave.oppgaveid}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(RegistrertSykmelding.encode(sykmelding)),
                })
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            setModalIsOpen(true);
                        } else {
                            return res.json();
                        }
                    })
                    .then(json => {
                        console.log(json);
                        return iotsPromise.decode(RuleHitErrors, json);
                    })
                    .then(ruleHitErrors => {
                        setApiErrors(ruleHitErrors);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => setIsLoading(false));
                console.log(RegistrertSykmelding.encode(sykmelding));
            } else {
                console.log('Noe gikk galt');
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
                onChange={() => setChecked(state => !state)}
            />
            {apiErrors && (
                <>
                    <AlertStripeFeil>
                        <Element>Baksystemet fant ytterligerer feil som må behandles:</Element>
                        <ul>
                            {apiErrors.ruleHits.map(ruleHit => (
                                <li>{ruleHit.messageForSender}</li>
                            ))}
                        </ul>
                    </AlertStripeFeil>
                    <br />
                </>
            )}
            <Hovedknapp
                disabled={!checked}
                spinner={isLoading}
                onClick={e => {
                    e.preventDefault();
                    registrerSykmelding();
                }}
            >
                Registrer sykmelding
            </Hovedknapp>
            <Flatknapp
                onClick={() => {
                    console.log('avbryt'); // TODO: send tilbake til gosys?
                    // TODO: Legg til modal som spør "Er du sikker på at du vil avbryte?" dersom bruker har fylt inn noen av feltene
                }}
            >
                Avbryt
            </Flatknapp>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)} // TODO: window.location.href = *gosyslink*
                closeButton={true}
                contentLabel="Registrer sykmelding suksess modalt vindu"
            >
                <p style={{ padding: '2rem 2.5rem' }}>
                    Sykmeldingen ble registrert. Du sendes tilbake til gosys ved å trykke på krysset.
                </p>
            </Modal>
        </div>
    );
};

export default FormSubmit;
