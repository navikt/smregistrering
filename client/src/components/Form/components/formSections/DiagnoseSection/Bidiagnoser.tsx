import React from 'react';
import { Knapp } from 'nav-frontend-knapper';

import BidiagnoseRow from './BidiagnoseRow';
import FormLabel from '../../formComponents/FormLabel';
import Plus from '../../../../../svg/Plus';
import { Diagnosekoder } from '../../../../../types/Diagnosekode';
import { SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type BidiagnoserProps = {
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

const Bidiagnoser = ({ setSchema, schema, validate, diagnosekoder, feil }: BidiagnoserProps) => {
    const addRow = () => {
        setSchema(state => {
            if (!state.biDiagnoser) {
                // Add two because the initial visible biDiagnose-row isn't in the form data yet
                return { ...state, biDiagnoser: [emptyBidiagnose, emptyBidiagnose] };
            }

            return {
                ...state,
                biDiagnoser: [...state.biDiagnoser, emptyBidiagnose],
            };
        });
    };

    const deleteRow = (index: number) => {
        setSchema(state => {
            if (!state.biDiagnoser) {
                validate('biDiagnoser', undefined);
                return state;
            }

            if (state.biDiagnoser.length === 1) {
                validate('biDiagnoser', []);
                return {
                    ...state,
                    biDiagnoser: [],
                };
            }

            const bidiagnoser = state.biDiagnoser;
            const withoutIndex = [...bidiagnoser.slice(0, index), ...bidiagnoser.slice(index + 1)];

            validate('biDiagnoser', withoutIndex);
            return {
                ...state,
                biDiagnoser: withoutIndex,
            };
        });
    };

    const updateDiagnosesystem = (index: number, system: string) => {
        setSchema(state => {
            const biDiagnoser = state.biDiagnoser;

            if (!biDiagnoser) {
                const biDiagnoser = [{ system, kode: '', tekst: '' }];
                validate('biDiagnoser', biDiagnoser);
                return { ...state, biDiagnoser };
            }

            const oldBidiagnose = biDiagnoser[index];
            if (!oldBidiagnose) {
                return state;
            }

            // Replace the old bidiagnose with the updated one
            const updatedBidiagnoser = [
                ...biDiagnoser.slice(0, index),
                { system, kode: '', tekst: '' },
                ...biDiagnoser.slice(index + 1),
            ];
            validate('biDiagnoser', updatedBidiagnoser);
            return { ...state, biDiagnoser: updatedBidiagnoser };
        });
    };

    const updateDiagnosecode = (index: number, code: string, text: string) => {
        setSchema(state => {
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
            const updatedBidiagnoser = [
                ...biDiagnoser.slice(0, index),
                updatedBidiagnose,
                ...biDiagnoser.slice(index + 1),
            ];
            validate('biDiagnoser', updatedBidiagnoser);
            return { ...state, biDiagnoser: updatedBidiagnoser };
        });
    };

    if (!schema.biDiagnoser) {
        return (
            <>
                <FormLabel label="3.2 Bidiagnose" />
                <BidiagnoseRow
                    index={0}
                    updateDiagnosesystem={updateDiagnosesystem}
                    updateDiagnosecode={updateDiagnosecode}
                    deleteRow={deleteRow}
                    biDiagnose={emptyBidiagnose}
                    diagnosekoder={diagnosekoder}
                />
                {feil ? (
                    <p
                        style={{ position: 'relative', top: '-0.5rem', marginBottom: '1rem' }}
                        className="typo-feilmelding"
                    >
                        {feil}
                    </p>
                ) : null}
                <Knapp form="kompakt" onClick={addRow}>
                    <Plus />
                    <span>Legg til bidiagnose</span>
                </Knapp>
            </>
        );
    }

    return (
        <>
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
                <span>Legg til bidignose</span>
            </Knapp>
        </>
    );
};

export default Bidiagnoser;
