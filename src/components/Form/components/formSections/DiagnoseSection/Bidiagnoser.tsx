import React from 'react';
import { Knapp } from 'nav-frontend-knapper';

import FormLabel from '../../formComponents/FormLabel';
import Plus from '../../../../../svg/Plus';
import { DiagnosekodeSystem, Diagnosekoder } from '../../../../../types/diagnosekoder/Diagnosekoder';
import { FormType } from '../../../Form';

import BidiagnoseRow from './BidiagnoseRow';

type BidiagnoserProps = {
    id?: string;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
    formState: FormType;
    diagnosekoder: Diagnosekoder;
    feil?: string;
};

const emptyBidiagnose = {
    system: DiagnosekodeSystem.ICD10,
    kode: '',
    tekst: '',
};

const Bidiagnoser = ({ id, setFormState, formState, diagnosekoder, feil }: BidiagnoserProps) => {
    const addRow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setFormState((formState) => {
            if (!formState.biDiagnoser) {
                // Add two because the initial visible biDiagnose-row isn't in the form data yet
                return {
                    ...formState,
                    biDiagnoser: [emptyBidiagnose, emptyBidiagnose],
                };
            }
            return {
                ...formState,
                biDiagnoser: [...formState.biDiagnoser, emptyBidiagnose],
            };
        });
    };

    const deleteRow = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setFormState((formState) => {
            if (!formState.biDiagnoser) {
                return formState;
            }
            if (formState.biDiagnoser.length === 1) {
                return {
                    ...formState,
                    biDiagnoser: [],
                };
            }
            const bidiagnoser = formState.biDiagnoser;
            const withoutIndex = [...bidiagnoser.slice(0, index), ...bidiagnoser.slice(index + 1)];
            return {
                ...formState,
                biDiagnoser: withoutIndex,
            };
        });
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
        });
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
        });
    };

    return (
        <div id={id}>
            <FormLabel label="3.2 Bidiagnose" />
            {formState.biDiagnoser.map((biDiagnose, index) => (
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
            <Knapp htmlType="button" form="kompakt" onClick={addRow}>
                <Plus />
                <span>Legg til bidiagnose</span>
            </Knapp>
        </div>
    );
};

export default Bidiagnoser;
