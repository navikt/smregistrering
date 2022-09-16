import { useEffect, useRef, useState } from 'react';
import { logger } from '@navikt/next-logger';

import { FormType } from '../Form';
import { Sykmelder } from '../../../types/Sykmelder';
import { apiFetch } from '../../../utils/fetchUtils';

function useBehandleropplysninger(formState: FormType) {
    const [sykmelder, setSykmelder] = useState<Sykmelder | undefined | null>(undefined);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [hprTouched, setHprTouched] = useState<boolean>(false);
    const hprRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        // Number must be in synch with validationFuncitons.hpr in validation.ts
        (async () => {
            if (formState.hpr?.length && formState.hpr.length >= 7 && formState.hpr.length <= 9) {
                setIsloading(true);
                setSykmelder(null);
                setErrorMessage(null);
                const res = await apiFetch(`/api/backend/api/v1/sykmelder/${formState.hpr}`, {
                    credentials: 'include',
                });
                if (res.ok) {
                    const json = await res.json();
                    const sykmelder = Sykmelder.safeParse(json);
                    if (sykmelder.success) {
                        setSykmelder(sykmelder.data);
                    } else {
                        logger.error(`Unable to parse sykmelder, parsing error: ${sykmelder.error.message}`);
                        setErrorMessage(`Vi mangler informasjon om behandler med hpr-nummer: ${formState.hpr}`);
                    }
                } else if (res.status === 404) {
                    setErrorMessage(`Fant ikke behandler med hpr-nummer: ${formState.hpr}`);
                } else {
                    const message = `En nettverksfeil med feilkode: ${res.status} oppsto ved henting av informasjon om behandleren`;
                    logger.info(message);
                    setErrorMessage(message);
                }
                setIsloading(false);
                if (hprTouched) {
                    hprRef.current?.focus();
                }
            } else {
                setSykmelder(null);
            }
        })();
    }, [formState.hpr, hprTouched]);

    return { sykmelder, isLoading, errorMessage, hprTouched, setHprTouched, hprRef };
}

export default useBehandleropplysninger;
