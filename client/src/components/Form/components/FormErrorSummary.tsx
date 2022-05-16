import './FormErrorSummary.css';

import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { RefObject } from 'react';

import { FormType } from '../Form';

type FormErrorSummaryProps = {
    formErrors: Map<keyof FormType, FeiloppsummeringFeil>;
    errorSummaryRef: RefObject<HTMLDivElement>;
};

const FormErrorSummary = ({ formErrors, errorSummaryRef }: FormErrorSummaryProps) => {
    if (formErrors.size > 0) {
        return (
            <div role="region" aria-label="skjemafeilbeholder" className="form-error-summary" tabIndex={0}>
                <Feiloppsummering
                    tittel="For å gå videre må du rette opp følgende:"
                    feil={Array.from(formErrors.values())}
                    innerRef={errorSummaryRef}
                />
            </div>
        );
    }

    return null;
};

export default FormErrorSummary;
