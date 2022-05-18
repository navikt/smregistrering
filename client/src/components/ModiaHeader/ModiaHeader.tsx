import React from 'react';
import { Select } from 'nav-frontend-skjema';
import Image from 'next/image';
import { Element, Undertittel } from 'nav-frontend-typografi';

import { ModiaContext } from '../../services/modiaService';

import styles from './ModiaHeader.module.css';
import navLogo from './nav-logo.svg';

interface Props {
    modiaContext: ModiaContext;
    aktivEnhet: string;
    onAktivEnhetChange: (enhet: string) => void;
}

function ModiaHeader({ modiaContext, aktivEnhet, onAktivEnhetChange }: Props): JSX.Element {
    return (
        <header className={styles.root}>
            <div className={styles.titleWrapper}>
                <Image src={navLogo} alt="NAV logo" />
                <Undertittel>syfosmmanuell</Undertittel>
            </div>
            {modiaContext && (
                <div className={styles.enhetPicker}>
                    {aktivEnhet && modiaContext.enheter.length ? (
                        <Select
                            value={aktivEnhet}
                            onChange={(event) => {
                                onAktivEnhetChange(event.target.value);
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
            {modiaContext && 'errorType' in modiaContext && <Undertittel>⚠ Feil ved lasting av enheter</Undertittel>}
        </header>
    );
}

export default ModiaHeader;
