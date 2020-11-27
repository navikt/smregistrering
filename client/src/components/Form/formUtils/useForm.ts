import React, { useCallback, useEffect, useState } from 'react';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

// helper function for infering types with Object.entries
export const getEntries = <T extends {}>(object: T): Array<[string, T[keyof T]]> =>
    Object.entries(object) as Array<[string, T[keyof T]]>;

export type ValidationFunctions<T> = {
    [key in Required<keyof T>]: (
        value: Partial<T>,
    ) => string | { errorKey: string; errorMessage: string }[] | undefined;
};

interface FormConfig<T> {
    validationFunctions: ValidationFunctions<T>;
    defaultValues: T;
}

interface Form<T> {
    formState: T;
    errors: Map<string, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<T>>;
    handleSubmit: (onSubmit: (state: T) => void) => void;
}

const useForm = <T>({ validationFunctions, defaultValues }: FormConfig<T>): Form<T> => {
    const [state, setState] = useState<T>(defaultValues);
    const [errors, setErrors] = useState<Map<string, FeiloppsummeringFeil>>(new Map<string, FeiloppsummeringFeil>());
    const [isFirstSubmit, setIsFirstSubmit] = useState<boolean>(true);

    const getErrors = useCallback((): Map<string, FeiloppsummeringFeil> => {
        const errorMap = new Map<string, FeiloppsummeringFeil>();
        getEntries(validationFunctions).forEach(([key, validationFunction]) => {
            const maybeError = validationFunction(state);

            if (Array.isArray(maybeError)) {
                maybeError.forEach(({ errorKey, errorMessage }) => {
                    if (errorMessage) {
                        errorMap.set(errorKey, {
                            feilmelding: errorMessage,
                            skjemaelementId: errorKey,
                        });
                    } else {
                        errorMap.delete(errorKey);
                    }
                });
            } else {
                if (maybeError) {
                    errorMap.set(key, { feilmelding: maybeError, skjemaelementId: String(key) });
                } else {
                    errorMap.delete(key);
                }
            }
        });
        return errorMap;
    }, [state, validationFunctions]);

    useEffect(() => {
        if (isFirstSubmit === false) {
            setErrors(getErrors());
        }
    }, [isFirstSubmit, setErrors, getErrors, state]);

    // Type guard ensuring that state conforms to T if list of errors is empty
    const isValidForm = <T>(state: any): state is T => {
        if (getErrors().size) {
            return false;
        }
        return true;
    };

    const handleSubmit = (onSubmit: (state: T) => void) => {
        if (isFirstSubmit) {
            setIsFirstSubmit(false);
        }
        if (isValidForm<T>(state)) {
            onSubmit(state);
        }
    };

    return { formState: state, errors, setFormState: setState, handleSubmit };
};

export default useForm;
