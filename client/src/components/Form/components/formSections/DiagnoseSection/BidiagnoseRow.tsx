import './BidiagnoseRow.less';

import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Fareknapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';

import Garbage from '../../../../../svg/Garbage';
import Row from '../../formComponents/Row';
import SearchableInput from '../../formComponents/SearchableInput';
import { Diagnose } from '../../../../../types/RegistrertSykmelding';
import { DiagnosekodeSystem, Diagnosekoder } from '../../../../../types/Diagnosekode';

type BidiagnoseRowProps = {
    index: number;
    updateDiagnosesystem: (index: number, system: string) => void;
    updateDiagnosecode: (index: number, code: string, text: string) => void;
    deleteRow: (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    biDiagnose: Partial<Diagnose>;
    diagnosekoder: Diagnosekoder;
};

const BidiagnoseRow = ({
    index,
    biDiagnose,
    diagnosekoder,
    updateDiagnosesystem,
    updateDiagnosecode,
    deleteRow,
}: BidiagnoseRowProps) => {
    const isFirst = index === 0;

    console.log(biDiagnose);
    return (
        <>
            <div className={`bidiagnoserow`}>
                {!isFirst && (
                    <div className="bidiagnoserow__deletebutton">
                        <Fareknapp form="kompakt" onClick={event => deleteRow(index, event)}>
                            <Garbage />
                            <span className="sr-only">Slett rad</span>
                        </Fareknapp>
                    </div>
                )}
                <Row>
                    <Select
                        value={biDiagnose.system}
                        onChange={({ target: { value } }) => {
                            const system = value === 'undefined' ? '' : value;
                            updateDiagnosesystem(index, system);
                        }}
                        label={<Element>3.2.1 Kodesystem</Element>}
                    >
                        <option value="undefined">Velg kodesystem</option>
                        <option value={DiagnosekodeSystem.ICPC2}>ICPC-2</option>
                        <option value={DiagnosekodeSystem.ICD10}>ICD-10</option>
                    </Select>
                    <SearchableInput
                        system={biDiagnose.system}
                        diagnosekoder={diagnosekoder}
                        label={<Element>3.2.2 Kode</Element>}
                        onChange={(code: string, text: string) => updateDiagnosecode(index, code, text)}
                        value={biDiagnose}
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
