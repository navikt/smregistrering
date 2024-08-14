import React from 'react'
import { Innholdstittel, Undertittel, Normaltekst } from 'nav-frontend-typografi'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'

const FormHeader = ({ oppgaveId }: { oppgaveId: number }) => {
    return (
        <legend className="form-header">
            <Innholdstittel>Digitalisering av papirsykmeldingen</Innholdstittel>
            <Undertittel>Vennligst legg inn opplysningene fra papirsykmeldingen</Undertittel>
            <AlertStripeAdvarsel className="form-header-deprecated-warning">
                <Normaltekst>
                    Denne applikasjonen er utdatert og har blitt erstattet av en ny løsning. Prøv først å løse denne
                    oppgaven i ny løsning,{' '}
                    <a href={`https://syk-dig.intern.nav.no/nasjonal/${oppgaveId}`}>
                        klikk her for å åpne denne oppgaven i ny løsning
                    </a>
                </Normaltekst>
                <Normaltekst>
                    Dersom du ikke er i stand til å løse oppgaven i ny løsning, ønsker vi at du sender en epost til Team
                    Sykmelding på <a href="mailto:nav.sykmelding@nav.no">nav.sykmelding@nav.no</a> og sier i fra om
                    hvorfor det ikke går.
                </Normaltekst>
                <Normaltekst>Denne gamle løsningen vil bli skrudd av 1. september 2024.</Normaltekst>
            </AlertStripeAdvarsel>
        </legend>
    )
}

export default FormHeader
