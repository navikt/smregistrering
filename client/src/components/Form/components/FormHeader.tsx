import './FormHeader.less';

import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';

const FormHeader = () => {
    return (
        <header className="form-header">
            <Innholdstittel>Digital sykmeldingsskjema</Innholdstittel>
            <Undertittel>Vennligst fyll inn feltene fra papirsykmeldingen</Undertittel>
        </header>
    );
};

export default FormHeader;
