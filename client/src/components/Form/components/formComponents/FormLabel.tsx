import './FormLabel.less';

import Hjelpetekst from 'nav-frontend-hjelpetekst';
import React from 'react';
import { Element } from 'nav-frontend-typografi';

interface FormLabelProps {
    label: string;
    helpText?: string;
}
const FormLabel = ({ label, helpText }: FormLabelProps) => {
    return (
        <div className="form-label">
            <Element>{label}</Element>
            {helpText && (
                <Hjelpetekst className="form-label__help-text">
                    <div style={{ maxWidth: '20rem' }}>{helpText}</div>
                </Hjelpetekst>
            )}
        </div>
    );
};

export default FormLabel;
