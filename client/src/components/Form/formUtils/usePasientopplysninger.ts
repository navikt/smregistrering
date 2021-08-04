import { useEffect, useRef, useState } from 'react';

import { FormType } from '../Form';
import { PasientNavn } from '../../../types/Pasient';
import logger from '../../../utils/logger';

function usePasientOpplysninger(formState: FormType) {
    const [pasientNavn, setPasientNavn] = useState<PasientNavn | undefined | null>(undefined);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [fnrTouched, setFnrTouched] = useState<boolean>(false);
    const fnrRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Number must be in synch with validationFuncitons.pasientFnr in validation.ts
        (async () => {
            if (formState.pasientFnr?.length && formState.pasientFnr.length === 11) {
                setIsloading(true);
                setPasientNavn(null);
                setError(null);
                const res = await fetch(`/backend/api/v1/pasient`, {
                    credentials: 'include',
                    headers: { 'X-Pasient-Fnr': formState.pasientFnr },
                });
                if (res.ok) {
                    const json = await res.json();
                    const pasientNavn = PasientNavn.safeParse(json);
                    if (pasientNavn.success) {
                        setPasientNavn(pasientNavn.data);
                    } else {
                        setError(new Error('Det oppsto en valideringsfeil ved henting av pasientnavn'));
                    }
                } else {
                    const err = new Error(
                        `En nettverksfeil med feilkode: ${res.status} oppsto ved henting av pasientnavn`,
                    );
                    logger.error(err)
                    setError(err);
                }
                setIsloading(false);
                if (fnrTouched) {
                    fnrRef.current?.focus();
                }
            } else {
                setPasientNavn(null);
            }
        })();
    }, [formState.pasientFnr, fnrTouched]);

    return { pasientNavn, isLoading, error, fnrRef, fnrTouched, setFnrTouched };
}

export default usePasientOpplysninger;
