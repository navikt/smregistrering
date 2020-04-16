import './FormSubmit.less';

import React, { useState } from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';

const FormSubmit = () => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="form-submit-container">
            <Checkbox
                className="form-submit-checkbox"
                checked={checked}
                label="Informasjonen stemmer overens med papirsykmelding"
                onChange={() => setChecked(state => !state)}
            />

            <Hovedknapp disabled={!checked} onClick={() => console.log('registrer')}>
                Registrer sykmelding
            </Hovedknapp>
            <Flatknapp onClick={() => console.log('avbryt')}>Avbryt</Flatknapp>
        </div>
    );
};

export default FormSubmit;
