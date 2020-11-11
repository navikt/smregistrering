import React from 'react';
import { Knapp } from 'nav-frontend-knapper';

import BidiagnoseRow from './BidiagnoseRow';
import FormLabel from '../../formComponents/FormLabel';
import Plus from '../../../../../svg/Plus';
import { Diagnosekoder } from '../../../../../types/Diagnosekode';
import { SchemaType } from '../../../Form';

type BidiagnoserProps = {
    id?: string;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
    schema: SchemaType;
    diagnosekoder: Diagnosekoder;
    feil?: string;
};

const emptyBidiagnose = {
    system: '',
    kode: '',
    tekst: '',
};

const Bidiagnoser = ({ id, setFormState, schema, diagnosekoder, feil }: BidiagnoserProps) => {
    const addRow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setFormState((formState) => {
            if (!formState.biDiagnoser) {
                return ({
                    ...formState,
                    biDiagnoser: [emptyBidiagnose, emptyBidiagnose]
                })
            }
            return ({
                ...formState,
                biDiagnoser: [...formState.biDiagnoser, emptyBidiagnose]
            })
        })
    };

    const deleteRow = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setFormState((formState) => {
            if (!formState.biDiagnoser) {
                return formState;
            }
            if (formState.biDiagnoser.length === 1) {
                return ({
                    ...formState,
                    biDiagnoser: [],
                });
            }
            const bidiagnoser = formState.biDiagnoser;
            const withoutIndex = [...bidiagnoser.slice(0, index), ...bidiagnoser.slice(index + 1)];
            return ({
                ...formState,
                biDiagnoser: withoutIndex,
            });
        })
    };

    const updateDiagnosesystem = (index: number, system: string) => {
        setFormState((formState) => {
            const biDiagnoser = formState.biDiagnoser;
            if (!biDiagnoser) {
                return { ...formState, biDiagnoser: [{ system, kode: '', tekst: '' }] };
            }
            const oldBidiagnose = biDiagnoser[index];
            if (!oldBidiagnose) {
                return formState;
            }
            // Replace the old bidiagnose with the updated one
            return {
                ...formState,
                biDiagnoser: [
                    ...biDiagnoser.slice(0, index),
                    { system, kode: '', tekst: '' },
                    ...biDiagnoser.slice(index + 1),
                ],
            };
        })
    };

    const updateDiagnosecode = (index: number, code: string, text: string) => {
        setFormState((formState) => {
            const biDiagnoser = formState.biDiagnoser;
            if (!biDiagnoser) {
                return formState;
            }
            const oldBidiagnose = biDiagnoser[index];
            if (!oldBidiagnose) {
                return formState;
            }
            const updatedBidiagnose = { ...oldBidiagnose, kode: code, tekst: text };
            // Replace the old bidiagnose with the updated one
            return {
                ...formState,
                biDiagnoser: [...biDiagnoser.slice(0, index), updatedBidiagnose, ...biDiagnoser.slice(index + 1)],
            };
        })
    };

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
