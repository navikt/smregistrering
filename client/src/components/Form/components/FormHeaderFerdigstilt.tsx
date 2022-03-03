import './FormHeader.less';

import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';

const FormHeaderFerdigstilt = () => {
    return (
        <legend className="form-header">
            <Innholdstittel>Retting av allerede registrert papirsykmelding</Innholdstittel>
            <Undertittel>Du er nå i ferd med å endre en allerede registrert papirsykmelding.</Undertittel>
        </legend>
    );
};

export default FormHeaderFerdigstilt;
