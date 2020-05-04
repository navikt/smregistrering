import './FormSubmit.less';

import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Checkbox } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';

import { Oppgave } from '../../../types/Oppgave';
import { RegistrertSykmelding } from '../../../types/RegistrertSykmelding';
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
    const [apiErrors, setApiErrors] = useState<string | undefined>(undefined);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    return (
        <div className="form-submit-container">
            <Checkbox
                className="form-submit-checkbox"
                checked={checked}
                label="Informasjonen stemmer overens med papirsykmelding"
                onChange={() => setChecked(state => !state)}
            />
            {apiErrors && <AlertStripeFeil>{apiErrors}</AlertStripeFeil>}
            <Hovedknapp
                disabled={!checked}
                spinner={isLoading}
                onClick={() => {
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
                                    if (res.ok) {
                                        setModalIsOpen(true);
                                    } else {
                                        return res.json();
                                    }
                                })
                                .then(json => setApiErrors(json))
                                .catch(error => {
                                    console.error(error);
                                })
                                .finally(() => setIsLoading(false));
                            console.log(RegistrertSykmelding.encode(sykmelding));
                        } else {
                            console.log('Noe gikk galt');
                        }
                    } else {
                        console.log('focusing');
                        focusErrorSummary();
                    }
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
                <div style={{ padding: '2rem 2.5rem' }}>
                    Sykmeldingen ble registrert. Du sendes tilbake til gosys ved å trykke på krysset.
                </div>
            </Modal>
        </div>
    );
};

export default FormSubmit;
