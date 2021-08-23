import { useState } from 'react';

import logger from '../utils/logger';
import { FormType } from '../components/Form/Form';
import { RuleHitError, postRegistrertSykmelding } from '../utils/fetchUtils';
import { RuleHitErrors } from '../types/RuleHitErrors';
import { buildRegistrertSykmelding } from '../utils/registrertSykmeldingUtils';

function useSubmitSykmelding(
    oppgaveid: number,
    enhet: string | null | undefined,
    handleSubmit: (onSubmit: (state: FormType) => void) => void,
) {
    // Chexbox for confirming rightful answers
    const [checked, setChecked] = useState<boolean>(false);

    // API state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [ruleHitError, setRuleHitError] = useState<RuleHitErrors | null>(null);

    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    async function submit() {
        setError(null);
        setRuleHitError(null);
        setSubmitSuccess(false);

        if (!enhet) {
            setError('Enhet mangler. Vennligst velg enhet fra nedtrekksmenyen øverst på siden');
            return;
        }

        handleSubmit(async (formState) => {
            const sykmelding = buildRegistrertSykmelding(formState);

            if (!sykmelding) {
                const error = 'Noe gikk galt med konstruksjon av sykmeldingsobjekt';
                logger.error(error);
                setError(error);
                return;
            }

            setIsLoading(true);

            try {
                await postRegistrertSykmelding(oppgaveid, enhet, sykmelding);
                setSubmitSuccess(true);
            } catch (e) {
                if (e instanceof RuleHitError) {
                    setRuleHitError(e.ruleHits);
                } else if (e instanceof Error) {
                    setError(e.message);
                } else {
                    logger.error({ message: `Unknown error for oppgaveid: ${oppgaveid}`, e });
                    setError(
                        'Det oppsto dessverre en ukjent feil i baksystemet. Vennligst prøv igjen om en liten stund, og ta kontakt dersom problemet vedvarer.',
                    );
                }
            }

            setIsLoading(false);
        });
    }

    return { checked, setChecked, isLoading, error, ruleHitError, submit, submitSuccess };
}

export default useSubmitSykmelding;
