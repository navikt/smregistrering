import './FormLabel.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';

const FormLabel = ({ label }: { label: string }) => {
    return (
        <div className="form-label">
            <Element>{label}</Element>
        </div>
    );
};

export default FormLabel;
