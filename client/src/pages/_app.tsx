/* eslint-disable postcss-modules/no-unused-class */

import { AppProps } from 'next/app';
import Modal from 'nav-frontend-modal';
import { useEffect, useState } from 'react';

import '../style/index.css';
import '../style/App.css';
import '../components/Panel/Panel.css';
import '../components/Form/Form.css';
import '../components/Form/components/FormHeader.css';
import '../components/Form/components/FormErrorSummary.css';
import '../components/Form/components/SectionContainer.css';
import '../components/Form/components/FormSubmit.css';
import '../components/Form/components/FormReject.css';
import '../components/Form/components/formComponents/Subsection.css';
import '../components/Form/components/formComponents/datepicker-extended.css';
import '../components/Form/components/formComponents/SearchableInput.css';
import '../components/Form/components/formComponents/Divider.css';
import '../components/Form/components/formComponents/SykmelderInformation.css';
import '../components/Form/components/formComponents/Flatpickr.css';
import '../components/Form/components/formComponents/ClearButton.css';
import '../components/Form/components/formComponents/Rows.css';
import '../components/Form/components/formComponents/FormLabel.css';
import '../components/Form/components/SectionHeader.css';
import '../components/Form/components/formSections/DiagnoseSection/BidiagnoseRow.css';
import '../components/Form/components/formSections/MulighetForArbeidSection/MulighetForArbeidSection.css';
import '../components/Pdf/Pdf.css';
import ModiaHeader from '../components/ModiaHeader/ModiaHeader';
import { ModiaContext } from '../services/modiaService';

if (process.env.NEXT_PUBLIC_START_WITH_MOCK === 'true' && typeof window !== 'undefined') {
    require('../mock/setup');
}

export interface AppPageProps {
    aktivEnhet: string;
}

export interface PageSsrResult {
    modiaContext: ModiaContext;
}

function MyApp({ Component, pageProps }: AppProps<PageSsrResult>): JSX.Element {
    const [aktivEnhet, setAktivEnhet] = useState(pageProps.modiaContext.aktivEnhet);

    useEffect(() => {
        Modal.setAppElement('#__next');
    }, []);

    return (
        <div>
            <ModiaHeader
                modiaContext={pageProps.modiaContext}
                aktivEnhet={aktivEnhet}
                onAktivEnhetChange={(enhet) => setAktivEnhet(enhet)}
            />
            <Component {...pageProps} aktivEnhet={aktivEnhet} />
        </div>
    );
}

export default MyApp;
