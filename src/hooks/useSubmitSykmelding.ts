import { useState } from 'react'
import { logger } from '@navikt/next-logger'

import { FormType } from '../components/Form/Form'
import { RuleHitError, postRegistrertSykmelding } from '../utils/fetchUtils'
import { RuleHitErrors } from '../types/RuleHitErrors'
import { buildRegistrertSykmelding } from '../utils/registrertSykmeldingUtils'

function useSubmitSykmelding(
    oppgaveid: number,
    enhet: string | null | undefined,
    handleSubmit: (onSubmit: (state: FormType) => void) => void,
    isFerdigstilt: boolean,
    sykmeldingId: string | null,
) {
    // Chexbox for confirming rightful answers
    const [checked, setChecked] = useState<boolean>(false)

    // API state
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [ruleHitError, setRuleHitError] = useState<RuleHitErrors | null>(null)

    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

    async function submit() {
        setErrorMessage(null)
        setRuleHitError(null)
        setSubmitSuccess(false)

        if (!enhet) {
            setErrorMessage('Enhet mangler. Vennligst velg enhet fra nedtrekksmenyen øverst på siden')
            return
        }

        handleSubmit(async (formState) => {
            const maybeSykmelding = buildRegistrertSykmelding(formState)

            if (!maybeSykmelding.success) {
                logger.error(maybeSykmelding.error)
                setErrorMessage('Noe gikk galt med konstruksjon av sykmeldingsobjekt')
                return
            } else {
                setIsLoading(true)
                try {
                    await postRegistrertSykmelding(oppgaveid, enhet, maybeSykmelding.data, isFerdigstilt, sykmeldingId)
                    setSubmitSuccess(true)
                } catch (e) {
                    if (e instanceof RuleHitError) {
                        setRuleHitError(e.ruleHits)
                    } else if (e instanceof Error) {
                        setErrorMessage(e.message)
                    } else {
                        logger.error({ message: `Unknown error for oppgaveid: ${oppgaveid}`, e })
                        setErrorMessage(
                            'Det oppsto dessverre en ukjent feil i baksystemet. Vennligst prøv igjen om en liten stund, og ta kontakt dersom problemet vedvarer.',
                        )
                    }
                }
                setIsLoading(false)
            }
        })
    }

    return { checked, setChecked, isLoading, errorMessage, ruleHitError, submit, submitSuccess }
}

export default useSubmitSykmelding
