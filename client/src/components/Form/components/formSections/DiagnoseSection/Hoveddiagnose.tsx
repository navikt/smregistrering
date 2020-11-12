import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';

import FormLabel from '../../formComponents/FormLabel';
import Row from '../../formComponents/Row';
import SearchableInput from '../../formComponents/SearchableInput';
import { DiagnosekodeSystem, Diagnosekoder } from '../../../../../types/Diagnosekode';
import { FormType } from '../../../Form';

type HoveddiagnoseProps = {
    id: string;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
    formState: FormType;
    diagnosekoder: Diagnosekoder;
    feil?: string;
};

const Hoveddiagnose = ({ id, setFormState, formState, diagnosekoder, feil }: HoveddiagnoseProps) => {
    const hoveddiagnose = formState.hovedDiagnose;
    const hoveddiagnoseSystem: keyof Diagnosekoder | undefined =
        hoveddiagnose && (hoveddiagnose.system as keyof Diagnosekoder);

    return (
        <div id={id}>
            <FormLabel label="3.1 Hoveddiagnose" />
            <Row>
                <Select
                    id={id + '-system'}
                    className="form-margin-bottom"
                    value={hoveddiagnoseSystem}
                    onChange={({ target: { value } }) => {
                        const system = value === 'undefined' ? undefined : (value as keyof Diagnosekoder);
                        const updatedDiagnose = {
                            system,
                            kode: '',
                            tekst: '',
                        };
                        setFormState((formState) => ({
                            ...formState,
                            hovedDiagnose: system ? updatedDiagnose : undefined,
                        }));
                    }}
                    label={<Element>3.1.1 Kodesystem</Element>}
                >
                    <option value="undefined">Velg kodesystem</option>
                    <option value={DiagnosekodeSystem.ICD10}>ICD-10</option>
                    <option value={DiagnosekodeSystem.ICPC2}>ICPC-2</option>
                </Select>
                <SearchableInput
                    id={id + '-kode'}
                    system={hoveddiagnoseSystem}
                    diagnosekoder={diagnosekoder}
                    label={<Element>3.1.2 Kode</Element>}
                    onChange={(kode?: string, tekst?: string) => {
                        setFormState((formState) => ({
                            ...formState,
                            hovedDiagnose: { ...formState.hovedDiagnose, kode, tekst },
                        }));
                    }}
                    value={hoveddiagnose}
                />
                <div>
                    <label htmlFor={id + '-tekst'}>3.1.3 Tekst</label>
                    <Normaltekst id={id + '-tekst'} style={{ marginTop: '8px' }}>
                        {hoveddiagnose && hoveddiagnose.tekst ? hoveddiagnose.tekst : '-'}
                    </Normaltekst>
                </div>
            </Row>
            {feil ? (
                <p style={{ position: 'relative', top: '-1.5rem' }} className="typo-feilmelding">
                    {feil}
                </p>
            ) : null}
        </div>
    );
};

export default Hoveddiagnose;
