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
    return (
        <div style={{ marginTop: '2rem' }} ref={errorSummaryRef}>
            {hasFormErrors(formErrors) && (
                <AlertStripeFeil>
                    <Normaltekst>Det finnes feil i skjemaet som må rettes opp.</Normaltekst>
                    <ul>
                        {Object.entries(formErrors)
                            .filter(([_key, value]) => !!value)
                            .map(([key, value]) => (
                                <li key={key}>{value}</li>
                            ))}
                    </ul>
                </AlertStripeFeil>
            )}
        </div>
    );
};

export default FormErrorSummary;
