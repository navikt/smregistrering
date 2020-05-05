import React from 'react';
import { Knapp } from 'nav-frontend-knapper';

import BidiagnoseRow from './BidiagnoseRow';
import FormLabel from '../../formComponents/FormLabel';
import Plus from '../../../../../svg/Plus';
import { Diagnosekoder } from '../../../../../types/Diagnosekode';
import { ErrorSchemaType, SchemaType } from '../../../Form';

type BidiagnoserProps = {
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    schema: SchemaType;
    diagnosekoder: Diagnosekoder;
};

const emptyBidiagnose = {
    system: undefined,
    kode: undefined,
    tekst: undefined,
};

const Bidiagnoser = ({ setSchema, schema, errors, diagnosekoder }: BidiagnoserProps) => {
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
                return state;
            }

            if (state.biDiagnoser.length === 1) {
                return {
                    ...state,
                    biDiagnoser: [],
                };
            }

            const bidiagnoser = state.biDiagnoser;
            const withoutIndex = [...bidiagnoser.slice(0, index), ...bidiagnoser.slice(index + 1)];

            return {
                ...state,
                biDiagnoser: withoutIndex,
            };
        });
    };

    const updateDiagnosesystem = (index: number, system: keyof Diagnosekoder | undefined) => {
        setSchema(state => {
            const biDiagnoser = state.biDiagnoser;

            if (!biDiagnoser) {
                return { ...state, biDiagnoser: [{ system, kode: undefined, tekst: undefined }] };
            }

            const oldBidiagnose = biDiagnoser[index];
            if (!oldBidiagnose) {
                return state;
            }

            // Replace the old bidiagnose with the updated one
            const updatedBidiagnoser = [
                ...biDiagnoser.slice(0, index),
                { system, kode: undefined, tekst: undefined },
                ...biDiagnoser.slice(index + 1),
            ];

            return { ...state, biDiagnoser: updatedBidiagnoser };
        });
    };

    const updateDiagnosecode = (index: number, code: string | undefined, text: string | undefined) => {
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
                    errors={errors}
                    biDiagnose={emptyBidiagnose}
                    diagnosekoder={diagnosekoder}
                />
                <Knapp form="kompakt" onClick={addRow}>
                    <Plus />
                    <span>Legg til rad</span>
                </Knapp>
            </>
        );
    }

    return (
        <>
            <FormLabel label="3.2 Bidiagnose" />
            {schema.biDiagnoser.map((biDiagnose, index) => (
                <BidiagnoseRow
                    index={index}
                    updateDiagnosesystem={updateDiagnosesystem}
                    updateDiagnosecode={updateDiagnosecode}
                    deleteRow={deleteRow}
                    errors={errors}
                    biDiagnose={biDiagnose}
                    diagnosekoder={diagnosekoder}
                />
            ))}

            <Knapp form="kompakt" onClick={addRow}>
                <Plus />
                <span>Legg til rad</span>
            </Knapp>
        </>
    );
};

export default Bidiagnoser;
