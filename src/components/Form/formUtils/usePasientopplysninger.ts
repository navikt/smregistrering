import { useEffect, useRef, useState } from 'react';

import logger from '../../../utils/logger';
import { FormType } from '../Form';
import { PasientNavn } from '../../../types/Pasient';
import { apiFetch } from '../../../utils/fetchUtils';

function usePasientOpplysninger(formState: FormType) {
    const [pasientNavn, setPasientNavn] = useState<PasientNavn | undefined | null>(undefined);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fnrTouched, setFnrTouched] = useState<boolean>(false);
    const fnrRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Number must be in synch with validationFuncitons.pasientFnr in validation.ts
        (async () => {
            if (formState.pasientFnr?.length && formState.pasientFnr.length === 11) {
                setIsloading(true);
                setPasientNavn(null);
                setErrorMessage(null);
                const res = await apiFetch(`/backend/api/v1/pasient`, {
                    credentials: 'include',
                    headers: { 'X-Pasient-Fnr': formState.pasientFnr },
                });
                if (res.ok) {
                    const json = await res.json();
                    const pasientNavn = PasientNavn.safeParse(json);
                    if (pasientNavn.success) {
                        setPasientNavn(pasientNavn.data);
                    } else {
                        setErrorMessage('Det oppsto en valideringsfeil ved henting av pasientnavn');
                    }
                } else {
                    logger.error(`En nettverksfeil med feilkode: ${res.status} oppsto ved henting av pasientnavn`);
                    setErrorMessage('En feil oppsto ved henting av pasientinfo. Ta kontakt dersom feilen vedvarer.');
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

    return { pasientNavn, isLoading, errorMessage, fnrRef, fnrTouched, setFnrTouched };
}

export default usePasientOpplysninger;
