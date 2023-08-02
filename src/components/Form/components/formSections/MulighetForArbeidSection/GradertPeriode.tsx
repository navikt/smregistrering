import React from 'react'
import { Checkbox, FeiloppsummeringFeil, Input } from 'nav-frontend-skjema'

import RangePicker from '../../formComponents/RangePicker'
import { FormType } from '../../../Form'

import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection'

export type GradertPeriodeMFA = {
    type: MFAOptions
    // Perioder for gradert sykmelding
    gradertPeriode: string[] | null
    gradertGrad: number | null
    gradertReisetilskudd: boolean
}

type GradertPeriodeProps = {
    mfaPeriode: GradertPeriodeMFA
    updateMfa: (mfa: MulighetForArbeidTypes) => void
    errors: Map<keyof FormType, FeiloppsummeringFeil>
    index: number
}

const GradertPeriode = ({ updateMfa, mfaPeriode, index }: GradertPeriodeProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <div className="mulighetForArbeid__gradert-row">
                <Input
                    id={`gradertGrad-${index}`}
                    className="mulighetForArbeid__gradert-row__grad"
                    type="number"
                    value={mfaPeriode.gradertGrad ?? ''}
                    onChange={({ target: { value } }) => {
                        const updatedSchema = {
                            ...mfaPeriode,
                            gradertGrad: parseInt(value),
                        }

                        updateMfa(updatedSchema)
                    }}
                    label="Oppgi grad"
                />
                <RangePicker
                    id={`gradertPeriode-${index}`}
                    labelFrom="F.o.m"
                    labelTo="t.o.m"
                    value={mfaPeriode.gradertPeriode || []}
                    onChange={(newDates) => {
                        const updatedSchema = {
                            ...mfaPeriode,
                            gradertPeriode: newDates ?? null,
                        }

                        updateMfa(updatedSchema)
                    }}
                />
            </div>

            <Checkbox
                id={`gradertReisetilskudd-${index}`}
                checked={mfaPeriode.gradertReisetilskudd}
                label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                onChange={() => {
                    const updatedSchema = {
                        ...mfaPeriode,
                        gradertReisetilskudd: !mfaPeriode.gradertReisetilskudd,
                    }

                    updateMfa(updatedSchema)
                }}
            />
        </div>
    )
}

export default GradertPeriode
