import { PropsWithChildren, useEffect } from 'react'
import { AppProps as NextAppProps } from 'next/app'
import Modal from 'nav-frontend-modal'

import ModiaHeader from '../components/ModiaHeader/ModiaHeader'
import { ModiaContext, ModiaContextError } from '../services/modiaService'
import StoreProvider from '../store'
import { isLocalOrDemo } from '../utils/env'

import '../style/index.css'
import '../style/App.css'
import '../components/Panel/Panel.css'
import '../components/Form/Form.css'
import '../components/Form/components/FormHeader.css'
import '../components/Form/components/FormErrorSummary.css'
import '../components/Form/components/SectionContainer.css'
import '../components/Form/components/FormSubmit.css'
import '../components/Form/components/FormReject.css'
import '../components/Form/components/formComponents/Subsection.css'
import '../components/Form/components/formComponents/datepicker-extended.css'
import '../components/Form/components/formComponents/SearchableInput.css'
import '../components/Form/components/formComponents/Divider.css'
import '../components/Form/components/formComponents/SykmelderInformation.css'
import '../components/Form/components/formComponents/Flatpickr.css'
import '../components/Form/components/formComponents/ClearButton.css'
import '../components/Form/components/formComponents/Rows.css'
import '../components/Form/components/formComponents/FormLabel.css'
import '../components/Form/components/SectionHeader.css'
import '../components/Form/components/formSections/DiagnoseSection/BidiagnoseRow.css'
import '../components/Form/components/formSections/MulighetForArbeidSection/MulighetForArbeidSection.css'
import '../components/Pdf/Pdf.css'

if (isLocalOrDemo) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../mocks')
}

export interface PageSsrResult {
    modiaContext?: ModiaContext | ModiaContextError
}

export interface AppProps<T> extends Omit<NextAppProps<T>, 'pageProps'> {
    pageProps: PropsWithChildren<unknown> & Partial<PageSsrResult>
}

function MyApp({ Component, pageProps }: AppProps<PageSsrResult>): JSX.Element {
    useEffect(() => {
        Modal.setAppElement('#__next')
    }, [])

    return (
        <StoreProvider modiaContext={pageProps.modiaContext}>
            <ModiaHeader modiaContext={pageProps.modiaContext} />
            <Component {...pageProps} />
        </StoreProvider>
    )
}

export default MyApp
