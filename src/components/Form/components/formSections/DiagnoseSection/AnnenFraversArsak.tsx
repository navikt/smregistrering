import React from 'react'
import { CheckboksPanelGruppe, CheckboksPanelProps, FeiloppsummeringFeil } from 'nav-frontend-skjema'

import { AnnenFraverGrunn, AnnenFraverGrunnValues } from '../../../../../types/sykmelding/MedisinskVurdering'
import { FormType } from '../../../Form'

interface AnnenFraversArsakProps {
    formState: FormType
    errors: Map<keyof FormType, FeiloppsummeringFeil>
    setFormState: React.Dispatch<React.SetStateAction<FormType>>
}

const AnnenFraversArsak = ({ formState, setFormState, errors }: AnnenFraversArsakProps) => {
    const { annenFraversArsakGrunn } = formState

    const checkboxes: CheckboksPanelProps[] = Object.entries(AnnenFraverGrunnValues).map(([key, value]) => {
        return {
            label: value,
            value: key,
            id: key,
            checked: annenFraversArsakGrunn?.includes(key as AnnenFraverGrunn),
        }
    })

    const updateCheckboxes = (value: AnnenFraverGrunn): void => {
        setFormState((formState) => {
            if (!formState.annenFraversArsakGrunn) {
                return {
                    ...formState,
                    annenFraversArsakGrunn: [value as AnnenFraverGrunn],
                }
            }
            const shouldAddArsak = !formState.annenFraversArsakGrunn.includes(value)
            const newAnnenFraversArsakGrunn: AnnenFraverGrunn[] = shouldAddArsak
                ? [...formState.annenFraversArsakGrunn, value]
                : formState.annenFraversArsakGrunn.filter((arsak) => arsak !== value)
            return {
                ...formState,
                annenFraversArsakGrunn: newAnnenFraversArsakGrunn,
            }
        })
    }

    return (
        <div id="annenFraversArsakGrunn" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="3.3.1 Lovfestet fraværsgrunn"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
                feil={errors.get('annenFraversArsakGrunn')?.feilmelding}
            />
        </div>
    )
}

export default AnnenFraversArsak
