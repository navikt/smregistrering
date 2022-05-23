import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';

const FormHeaderFerdigstilt = () => {
    return (
        <legend className="form-header">
            <Innholdstittel>Korrigering av registrert papirsykmelding</Innholdstittel>
            <Undertittel>Under kan du korrigere opplysningene i en allerede registrert papirsykmelding.</Undertittel>
        </legend>
    );
};

export default FormHeaderFerdigstilt;
