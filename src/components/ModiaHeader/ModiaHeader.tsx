import React, { useContext } from 'react'
import { Select } from 'nav-frontend-skjema'
import Image from 'next/image'
import { Element, Undertittel } from 'nav-frontend-typografi'

import { ModiaContext, ModiaContextError } from '../../services/modiaService'
import { StoreContext } from '../../store'

import styles from './ModiaHeader.module.css'
import navLogo from './nav-logo.svg'

interface Props {
    modiaContext: ModiaContext | ModiaContextError | undefined
}

function ModiaHeader({ modiaContext }: Props): JSX.Element {
    const { aktivEnhet, setAktivEnhet } = useContext(StoreContext)

    return (
        <header className={styles.root}>
            <div className={styles.titleWrapper}>
                <Image src={navLogo} alt="NAV logo" />
                <Undertittel>Digitalisering av papirsykmeldinger</Undertittel>
            </div>
            {modiaContext && !('errorType' in modiaContext) && (
                <div className={styles.enhetPicker}>
                    {aktivEnhet && modiaContext.enheter.length ? (
                        <Select
                            value={aktivEnhet}
                            onChange={(event) => {
                                setAktivEnhet(event.target.value)
                            }}
                        >
                            {modiaContext.enheter.map((it) => (
                                <option key={it.enhetId} value={it.enhetId}>
                                    {it.enhetId} {it.navn}
                                </option>
                            ))}
                        </Select>
                    ) : (
                        <Element>Fant ingen enheter</Element>
                    )}
                    <Undertittel>|</Undertittel>
                    <div>{modiaContext.navn}</div>
                </div>
            )}
            {(!modiaContext || 'errorType' in modiaContext) && (
                <>
                    <Undertittel>⚠ Feil ved lasting av enheter</Undertittel>
                    {modiaContext && 'errorType' in modiaContext && <Element>{modiaContext.message}</Element>}
                </>
            )}
        </header>
    )
}

export default ModiaHeader
