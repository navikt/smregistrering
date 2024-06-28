import React, { createContext, PropsWithChildren, useCallback, useState } from 'react'

import { ModiaContext, ModiaContextError } from './services/modiaService'

interface Store {
    aktivEnhet: string | null
    setAktivEnhet: (aktivEnhet: string) => void
}

export const StoreContext = createContext<Store>({
    aktivEnhet: null,
    setAktivEnhet: () => void 0,
})

type StoreProviderProps = {
    modiaContext?: ModiaContext | ModiaContextError
}

const StoreProvider = ({ children, modiaContext }: PropsWithChildren<StoreProviderProps>): JSX.Element => {
    const defaultAktivSelectValue = getDefaultSelectValue(modiaContext)
    const [aktivEnhet, setAktivEnhet] = useState<string | null>(defaultAktivSelectValue)
    const handleAktivEnhetChange = useCallback((aktivEnhet: string) => {
        setAktivEnhet(aktivEnhet)
    }, [])

    return (
        <StoreContext.Provider value={{ aktivEnhet, setAktivEnhet: handleAktivEnhetChange }}>
            {children}
        </StoreContext.Provider>
    )
}

function getDefaultSelectValue(modiaContext: ModiaContext | ModiaContextError | undefined): string | null {
    if (!modiaContext || 'errorType' in modiaContext) {
        return null
    }

    const { aktivEnhet, enheter } = modiaContext

    // Users without aktiv enhet but still has a valid list needs to default to the first enhet, this doesn't happen very often
    if (aktivEnhet == null && enheter.length > 0) {
        return enheter[0].enhetId
    }

    if (aktivEnhet == null || enheter == null || enheter.length === 0) {
        return null
    }

    return enheter.some((it) => it.enhetId === aktivEnhet) ? aktivEnhet : enheter[0].enhetId
}

export default StoreProvider
