import './FormSubmit.less';

import * as iotsPromise from 'io-ts-promise';
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
    hasFormErrors?: boolean;
    validateAll: () => boolean;
    focusErrorSummary: () => void;
}

const FormSubmit = ({ oppgave, schema, hasFormErrors, validateAll, focusErrorSummary }: FormSubmitProps) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiErrors, setApiErrors] = useState<RuleHitErrors | undefined>(undefined);

    const registrerSykmelding = () => {
        if (validateAll()) {
            const sykmelding = buildRegistrertSykmelding(schema);
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
                    .then((res) => {
                        if (res.status === 204) {
                            const shouldRedirectToGosys = window.confirm(
                                'Oppgaven ble ferdigstilt. Vil du sendes tilbake til GOSYS?',
                            );
                            if (shouldRedirectToGosys) {
                                const gosysUrl = process.env.REACT_APP_GOSYS_URL;
                                if (gosysUrl) {
                                    window.location.href = gosysUrl;
                                } else {
                                    window.alert('Kunne ikke sende deg tilbake til gosys');
                                }
                            }
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
            <Hovedknapp
                disabled={!checked}
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
                    const shouldRedirectToGosys = window.confirm(
                        'Er du sikker på at du vil avbryte oppgaven og sendes tilbake til GOSYS?',
                    );
                    if (shouldRedirectToGosys) {
                        const gosysUrl = process.env.REACT_APP_GOSYS_URL;
                        if (gosysUrl) {
                            window.location.href = gosysUrl;
                        } else {
                            window.alert('Kunne ikke sende deg tilbake til gosys');
                        }
                    }
                }}
            >
                Avbryt
            </Flatknapp>
        </div>
    );
};

export default FormSubmit;
