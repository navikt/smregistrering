import './FormHeader.less';

import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';

const FormHeader = () => {
    return (
        <legend className="form-header">
            <Innholdstittel>Digital sykmeldingsskjema</Innholdstittel>
            <Undertittel>Vennligst fyll inn feltene fra papirsykmeldingen</Undertittel>
        </legend>
    );
};

export default FormHeader;
