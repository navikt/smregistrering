import React, { useEffect, useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';

import BidiagnoseRow from './BidiagnoseRow';
import FormLabel from '../../formComponents/FormLabel';
import Plus from '../../../../../svg/Plus';
import { Diagnosekoder } from '../../../../../types/Diagnosekode';
import { SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type BidiagnoserProps = {
    id?: string;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    validate: Validate;
    diagnosekoder: Diagnosekoder;
    feil?: string;
};

const emptyBidiagnose = {
    system: '',
    kode: '',
    tekst: '',
};

const Bidiagnoser = ({ id, setSchema, schema, validate, diagnosekoder, feil }: BidiagnoserProps) => {
    const addRow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setNewRow(true);
        setSchema(
            (state): SchemaType => {
                if (!state.biDiagnoser) {
                    // Add two because the initial visible biDiagnose-row isn't in the form data yet
                    return { ...state, biDiagnoser: [emptyBidiagnose, emptyBidiagnose] };
                }

                return {
                    ...state,
                    biDiagnoser: [...state.biDiagnoser, emptyBidiagnose],
                };
            },
        );
    };

    const deleteRow = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setSchema(
            (state): SchemaType => {
                if (!state.biDiagnoser) {
                    validate('biDiagnoser', state);
                    return state;
                }

                if (state.biDiagnoser.length === 1) {
                    const updatedSchema = {
                        ...state,
                        biDiagnoser: [],
                    };
                    validate('biDiagnoser', updatedSchema);
                    return updatedSchema;
                }

                const bidiagnoser = state.biDiagnoser;
                const withoutIndex = [...bidiagnoser.slice(0, index), ...bidiagnoser.slice(index + 1)];

                const updatedSchema = {
                    ...state,
                    biDiagnoser: withoutIndex,
                };
                validate('biDiagnoser', updatedSchema);
                return updatedSchema;
            },
        );
    };

    const updateDiagnosesystem = (index: number, system: string) => {
        setSchema(
            (state): SchemaType => {
                const biDiagnoser = state.biDiagnoser;

                if (!biDiagnoser) {
                    const updatedSchema = { ...state, biDiagnoser: [{ system, kode: '', tekst: '' }] };
                    validate('biDiagnoser', updatedSchema);
                    return updatedSchema;
                }

                const oldBidiagnose = biDiagnoser[index];
                if (!oldBidiagnose) {
                    return state;
                }

                // Replace the old bidiagnose with the updated one
                const updatedSchema = {
                    ...state,
                    biDiagnoser: [
                        ...biDiagnoser.slice(0, index),
                        { system, kode: '', tekst: '' },
                        ...biDiagnoser.slice(index + 1),
                    ],
                };
                validate('biDiagnoser', updatedSchema);
                return updatedSchema;
            },
        );
    };

    const updateDiagnosecode = (index: number, code: string, text: string) => {
        setSchema(
            (state): SchemaType => {
                const biDiagnoser = state.biDiagnoser;

                if (!biDiagnoser) {
                    return state;
                }

                const oldBidiagnose = biDiagnoser[index];
                if (!oldBidiagnose) {
                    return state;
                }

                const updatedBidiagnose = { ...oldBidiagnose, kode: code, tekst: text };

                // Replace the old bidiagnose with the updated one
                const updatedSchema = {
                    ...state,
                    biDiagnoser: [...biDiagnoser.slice(0, index), updatedBidiagnose, ...biDiagnoser.slice(index + 1)],
                };
                validate('biDiagnoser', updatedSchema);
                return updatedSchema;
            },
        );
    };

    const [newRow, setNewRow] = useState(false);

    // Moves the users focus to the newly created biDiagnose row
    useEffect(() => {
        if (newRow) {
            document.getElementById(`bidiagnose-${schema.biDiagnoser.length - 1}-system`)?.focus();
            setNewRow(false);
        }
    }, [newRow, schema.biDiagnoser]);

    return (
        <div id={id}>
            <FormLabel label="3.2 Bidiagnose" />
            {schema.biDiagnoser.map((biDiagnose, index) => (
                <BidiagnoseRow
                    key={index}
                    index={index}
                    updateDiagnosesystem={updateDiagnosesystem}
                    updateDiagnosecode={updateDiagnosecode}
                    deleteRow={deleteRow}
                    biDiagnose={biDiagnose}
                    diagnosekoder={diagnosekoder}
                />
            ))}
            {feil ? (
                <p style={{ position: 'relative', top: '-0.5rem', marginBottom: '1rem' }} className="typo-feilmelding">
                    {feil}
                </p>
            ) : null}
            <Knapp form="kompakt" onClick={addRow}>
                <Plus />
                <span>Legg til bidiagnose</span>
            </Knapp>
        </div>
    );
};

export default Bidiagnoser;
