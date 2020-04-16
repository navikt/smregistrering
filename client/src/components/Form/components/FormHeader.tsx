import './FormHeader.less';

import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';

const FormHeader = () => {
    return (
        <div className="form-header">
            <Innholdstittel>Digital sykmeldingsskjema</Innholdstittel>
            <Undertittel>Vennligst fyll inn feltene fra papirsykmeldingen</Undertittel>
        </div>
    );
};

export default FormHeader;
