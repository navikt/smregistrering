import { useEffect, useRef, useState } from 'react';

import logger from '../../../utils/logger';
import { FormType } from '../Form';
import { Sykmelder } from '../../../types/Sykmelder';

function useBehandleropplysninger(formState: FormType) {
    const [sykmelder, setSykmelder] = useState<Sykmelder | undefined | null>(undefined);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [hprTouched, setHprTouched] = useState<boolean>(false);
    const hprRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Number must be in synch with validationFuncitons.hpr in validation.ts
        (async () => {
            if (formState.hpr?.length && formState.hpr.length >= 7 && formState.hpr.length <= 9) {
                setIsloading(true);
                setSykmelder(null);
                setError(null);
                const res = await fetch(`/backend/api/v1/sykmelder/${formState.hpr}`, { credentials: 'include' });
                if (res.ok) {
                    const json = await res.json();
                    const sykmelder = Sykmelder.safeParse(json);
                    if (sykmelder.success) {
                        setSykmelder(sykmelder.data);
                    } else {
                        setError(new Error(`Fant ikke behandler med hpr-nummer: ${formState.hpr}`));
                    }
                } else {
                    const err = new Error(
                        `En nettverksfeil med feilkode: ${res.status} oppsto ved hending av informasjon om behandleren`,
                    );
                    logger.error(err);
                    setError(err);
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

    return { sykmelder, isLoading, error, hprTouched, setHprTouched, hprRef };
}

export default useBehandleropplysninger;
