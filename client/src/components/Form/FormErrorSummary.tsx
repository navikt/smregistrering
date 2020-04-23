import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { ErrorSchemaType } from '../../App';

type FormErrorSummaryProps = {
    formErrors: ErrorSchemaType;
};

const FormErrorSummary = ({ formErrors }: FormErrorSummaryProps) => {
    if (Object.values(formErrors).length === 0) {
        return null;
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            <AlertStripeFeil>Det er en eller flere feil i skjemaet som må rettes opp.</AlertStripeFeil>
        </div>
    );
};

export default FormErrorSummary;
