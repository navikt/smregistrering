import React from 'react'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import { Fareknapp } from 'nav-frontend-knapper'
import { Select } from 'nav-frontend-skjema'

import Garbage from '../../../../../svg/Garbage'
import Row from '../../formComponents/Row'
import SearchableInput from '../../formComponents/SearchableInput'
import { Diagnose } from '../../../../../types/sykmelding/MedisinskVurdering'
import { DiagnosekodeSystem, Diagnosekoder } from '../../../../../types/diagnosekoder/Diagnosekoder'

type BidiagnoseRowProps = {
    index: number
    updateDiagnosesystem: (index: number, system: string) => void
    updateDiagnosecode: (index: number, code: string, text: string) => void
    deleteRow: (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    biDiagnose: Partial<Diagnose>
    diagnosekoder: Diagnosekoder
}

const BidiagnoseRow = ({
    index,
    biDiagnose,
    diagnosekoder,
    updateDiagnosesystem,
    updateDiagnosecode,
    deleteRow,
}: BidiagnoseRowProps) => {
    return (
        <>
            <div className="bidiagnoserow">
                <div className="bidiagnoserow__deletebutton">
                    <Fareknapp htmlType="button" kompakt onClick={(event) => deleteRow(index, event)}>
                        <Garbage />
                        <span className="sr-only">Slett rad</span>
                    </Fareknapp>
                </div>
                <Row>
                    <Select
                        id={'bidiagnose-' + index + '-system'}
                        value={biDiagnose.system}
                        onChange={({ target: { value } }) => {
                            updateDiagnosesystem(index, value)
                        }}
                        label={<Element>3.2.1 Kodesystem</Element>}
                    >
                        <option value={DiagnosekodeSystem.ICD10}>ICD-10</option>
                        <option value={DiagnosekodeSystem.ICPC2}>ICPC-2</option>
                    </Select>
                    <SearchableInput
                        id={'bidiagnose-' + index + '-kode'}
                        system={biDiagnose.system}
                        diagnosekoder={diagnosekoder}
                        label={<Element>3.2.2 Kode</Element>}
                        onChange={(code: string, text: string) => updateDiagnosecode(index, code, text)}
                        value={biDiagnose}
                    />
                    <div>
                        <label htmlFor={'bidiagnose-' + index + '-tekst'}>3.2.3 Tekst</label>
                        <Normaltekst id={'bidiagnose-' + index + '-tekst'} style={{ marginTop: '8px' }}>
                            {biDiagnose.tekst || ''}
                        </Normaltekst>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default BidiagnoseRow
