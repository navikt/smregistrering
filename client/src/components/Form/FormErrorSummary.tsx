import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { ErrorSchemaType } from './Form';

type FormErrorSummaryProps = {
    formErrors: ErrorSchemaType;
    hasErrors: boolean;
};

const FormErrorSummary = ({ formErrors, hasErrors }: FormErrorSummaryProps) => {
    if (!hasErrors) {
        return null;
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            <AlertStripeFeil>Det er en eller flere feil i skjemaet som må rettes opp.</AlertStripeFeil>
        </div>
    );
};

export default FormErrorSummary;
