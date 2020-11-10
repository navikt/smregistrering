import './FormErrorSummary.less';

import React, { RefObject } from 'react';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { SchemaType } from '../Form';

type FormErrorSummaryProps = {
    formErrors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    errorSummaryRef: RefObject<HTMLDivElement>;
};

const FormErrorSummary = ({ formErrors, errorSummaryRef }: FormErrorSummaryProps) => {
    return (
        <div
            role="region"
            aria-label="skjemafeilbeholder"
            className="form-error-summary"
            tabIndex={0}
            ref={errorSummaryRef}
        >
            {formErrors.size > 0 && (
                <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={Array.from(formErrors.values())} />
            )}
        </div>
    );
};

export default FormErrorSummary;
