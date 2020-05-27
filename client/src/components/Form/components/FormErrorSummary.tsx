import './FormErrorSummary.less';

import React, { RefObject } from 'react';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { ErrorSchemaType } from '../Form';

export const hasFormErrors = (formErrors: ErrorSchemaType): boolean =>
    Object.values(formErrors).some(errorValue => errorValue);

type FormErrorSummaryProps = {
    formErrors: ErrorSchemaType;
    errorSummaryRef: RefObject<HTMLDivElement>;
};

const FormErrorSummary = ({ formErrors, errorSummaryRef }: FormErrorSummaryProps) => {
    // TODO: sette opp custom type guard for å unngå "as"
    const feil: FeiloppsummeringFeil[] = Object.entries(formErrors)
        .filter(([_key, value]) => !!value)
        .map(([key, value]) => ({ skjemaelementId: key, feilmelding: value })) as FeiloppsummeringFeil[];

    return (
        <div role="region" aria-label="skjemafeilbeholder" className="form-error-summary" ref={errorSummaryRef}>
            {hasFormErrors(formErrors) && (
                <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={feil} />
            )}
        </div>
    );
};

export default FormErrorSummary;
