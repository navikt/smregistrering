import React from 'react';
import { Select } from 'nav-frontend-skjema';
import Image from 'next/image';
import { Element, Undertittel } from 'nav-frontend-typografi';

// import { ModiaContext, ModiaContextError } from '../../services/modiaService';
// import { StoreContext } from '../../data/store';

import { ModiaContext } from '../../services/modiaService';

import styles from './ModiaHeader.module.css';
import navLogo from './nav-logo.svg';

// TODO ta i koden
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
    // modiaContext: ModiaContext;
}

function ModiaHeader({}: Props): JSX.Element {
    // TODO: contextify
    const modiaContext: ModiaContext = {
        aktivEnhet: 'enhet-1',
        navn: 'test navn',
        ident: 'test ident',
        enheter: [
            { navn: 'test', enhetId: 'enhet-1' },
            { navn: 'test2', enhetId: 'enhet-2' },
        ],
    };
    const { aktivEnhet, setAktivEnhet } = {
        aktivEnhet: modiaContext.aktivEnhet,
        // TODO
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setAktivEnhet: (enhet: string) => void 0,
    };

    return (
        <header className={styles.root}>
            <div className={styles.titleWrapper}>
                <Image src={navLogo} alt="NAV logo" />
                <Undertittel>syfosmmanuell</Undertittel>
            </div>
            {modiaContext && !('errorType' in modiaContext) && (
                <div className={styles.enhetPicker}>
                    {aktivEnhet && modiaContext.enheter.length ? (
                        <Select
                            value={aktivEnhet}
                            onChange={(event) => {
                                setAktivEnhet(event.target.value);
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
