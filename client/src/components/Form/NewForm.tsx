import React, { useState } from 'react';

import { RegistrertSykmelding } from '../../types/RegistrertSykmelding';
import { Sections } from '../../types/Section';
import { Oppgave } from '../../types/Oppgave';
import { Diagnosekoder } from '../../types/Diagnosekode';
import { validation } from './newValidation';

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface Schema extends RecursivePartial<RegistrertSykmelding> {
    avventende?: boolean;
    reisetilskudd?: boolean;
}

export type ErrorSchemaType = { [key in keyof Schema]: string | undefined };
export type Validate = (name: keyof Schema, value: Schema[keyof Schema]) => void;

const initialSchema: Schema = {
    avventende: true,
};

type FormProps = {
    sections: Sections;
    oppgave: Oppgave;
    diagnosekoder: Diagnosekoder;
    formErrors: ErrorSchemaType;
    setFormErrors: React.Dispatch<React.SetStateAction<ErrorSchemaType>>;
};

const NewForm = ({ sections, oppgave, diagnosekoder, formErrors, setFormErrors }: FormProps) => {
    const [schema, setSchema] = useState<Schema>(initialSchema);

    const validate: Validate = (name, value) => {
        const validationFunction = validation[name];
        let error: string | undefined = undefined;
        error = validationFunction(value as any, schema);
        setFormErrors(state => ({ ...state, [name]: error }));
    };

    const validateAll = () => {
        const keys = Object.keys(validation);
        keys.forEach(key => {
            // TODO: Can this casting be avoided?
            // https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
            const value = schema[key as keyof Schema];
            validate(key as keyof Schema, value);
        });
    };
};

export default NewForm;
