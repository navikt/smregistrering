import './FormSubmit.less';

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
}

const FormSubmit = ({ oppgave, schema, hasFormErrors }: FormSubmitProps) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiErrors, setApiErrors] = useState<string | undefined>(undefined);

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
                disabled={hasFormErrors || !checked}
                spinner={isLoading}
                onClick={() => {
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
                                    alert('Sykmeldingen ble registrert');
                                }
                                return res.json();
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
                }}
            >
                Registrer sykmelding
            </Hovedknapp>
            <Flatknapp onClick={() => console.log('avbryt')}>Avbryt</Flatknapp>
        </div>
    );
};

export default FormSubmit;
