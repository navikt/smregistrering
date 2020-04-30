import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

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
            <AlertStripeFeil>Det er en eller flere feil i skjemaet som må rettes opp.</AlertStripeFeil>
        </div>
    );
};

export default FormErrorSummary;
