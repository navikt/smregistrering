import './FormHeader.less';

import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';

const FormHeader = () => {
    return (
        <legend className="form-header">
            <Innholdstittel>Digitalisering av papirsykmeldingen</Innholdstittel>
            <Undertittel>Vennligst legg inn opplysningene fra papirsykmeldingen</Undertittel>
        </legend>
    );
};

export default FormHeader;
