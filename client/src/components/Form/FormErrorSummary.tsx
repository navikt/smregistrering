import './FormErrorSummary.less';

import React, { RefObject } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

import { ErrorSchemaType } from './Form';

export const hasFormErrors = (formErrors: ErrorSchemaType): boolean =>
    Object.values(formErrors).some(errorValue => errorValue);

type FormErrorSummaryProps = {
    formErrors: ErrorSchemaType;
    errorSummaryRef: RefObject<HTMLDivElement>;
};

const FormErrorSummary = ({ formErrors, errorSummaryRef }: FormErrorSummaryProps) => {
    const errorItems = Object.entries(formErrors)
        .filter(([_key, value]) => !!value)
        .map(([key, value]) => <li key={key}>{value}</li>);

    return (
        <div className="form-error-summary" ref={errorSummaryRef}>
            {hasFormErrors(formErrors) && (
                <AlertStripeFeil>
                    <Normaltekst>Det finnes feil i skjemaet som må rettes opp.</Normaltekst>
                    <ul>{errorItems}</ul>
                </AlertStripeFeil>
            )}
        </div>
    );
};

export default FormErrorSummary;
