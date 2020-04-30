import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

import { ErrorSchemaType } from './Form';

export const hasFormErrors = (formErrors: ErrorSchemaType): boolean =>
    Object.values(formErrors).some(errorValue => errorValue);

type FormErrorSummaryProps = {
    formErrors: ErrorSchemaType;
};

const FormErrorSummary = ({ formErrors }: FormErrorSummaryProps) => {
    if (!hasFormErrors(formErrors)) {
        return null;
    }

    return (
        <div style={{ marginTop: '2rem' }}>
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
        </div>
    );
};

export default FormErrorSummary;
