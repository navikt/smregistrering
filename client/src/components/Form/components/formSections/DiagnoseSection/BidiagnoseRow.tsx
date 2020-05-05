import './BidiagnoseRow.less';

import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Fareknapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';

import Garbage from '../../../../../svg/Garbage';
import Row from '../../formComponents/Row';
import SearchableInput from '../../formComponents/SearchableInput';
import { Diagnose } from './DiagnoseSection';
import { Diagnosekoder } from '../../../../../types/Diagnosekode';
import { ErrorSchemaType } from '../../../Form';

type BidiagnoseRowProps = {
    index: number;
    updateDiagnosesystem: (index: number, system: keyof Diagnosekoder | undefined) => void;
    updateDiagnosecode: (index: number, code: string | undefined, text: string | undefined) => void;
    deleteRow: (index: number) => void;
    errors: ErrorSchemaType;
    biDiagnose: Diagnose;
    diagnosekoder: Diagnosekoder;
};

const BidiagnoseRow = ({
    index,
    biDiagnose,
    diagnosekoder,
    errors,
    updateDiagnosesystem,
    updateDiagnosecode,
    deleteRow,
}: BidiagnoseRowProps) => {
    const isFirst = index === 0;
    return (
        <>
            {!isFirst && (
                <div className="bidiagnoserow-deletebutton">
                    <Fareknapp form="kompakt" onClick={() => deleteRow(index)}>
                        <Garbage />
                        <span className="sr-only">Slett rad</span>
                    </Fareknapp>
                </div>
            )}
            <div className={!isFirst ? 'bidiagnoserow-additional' : undefined}>
                <Row>
                    <Select
                        value={biDiagnose.system}
                        onChange={({ target: { value } }) => {
                            const system = value === 'undefined' ? undefined : (value as keyof Diagnosekoder);
                            updateDiagnosesystem(index, system);
                        }}
                        feil={errors.biDiagnoser}
                        label={<Element>3.2.1 Kodesystem</Element>}
                    >
                        <option value="undefined">Velg kodesystem</option>
                        <option value="icpc2">ICPC-2</option>
                        <option value="icd10">ICD-10</option>
                    </Select>
                    <SearchableInput
                        system={biDiagnose.system}
                        diagnosekoder={diagnosekoder}
                        label={<Element>3.2.2 Kode</Element>}
                        onChange={(code?: string, text?: string) => updateDiagnosecode(index, code, text)}
                    />
                    <div>
                        <Element>3.2.3 Tekst</Element>
                        <Normaltekst style={{ marginTop: '8px' }}>{biDiagnose.tekst || ''}</Normaltekst>
                    </div>
                </Row>
            </div>
        </>
    );
};

export default BidiagnoseRow;
