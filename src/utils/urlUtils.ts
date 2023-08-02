export const getIdFromSearchParams = (): { oppgaveId: string } | { sykmeldingId: string } => {
    if (process.env.NEXT_PUBLIC_START_WITH_MOCK === 'true') {
        return { oppgaveId: 'test' }
    }

    const urlParams = new URLSearchParams(window.location.search)
    const oppgaveId = urlParams.get('oppgaveid')
    const sykmeldingId = urlParams.get('sykmeldingid')

    if (oppgaveId) {
        return { oppgaveId }
    } else if (sykmeldingId) {
        return { sykmeldingId }
    } else {
        throw new URIError('Kunne ikke hente oppgave siden lenken mangler oppgaveId og sykmeldingId')
    }
}

export function getReturnToURL(sykmeldingId: string | null): { text: string; url: string } {
    if (sykmeldingId != null) {
        return { text: 'Tilbake til Modia', url: process.env.NEXT_PUBLIC_MODIA_URL! }
    } else {
        return { text: 'Tilbake til GOSYS', url: process.env.NEXT_PUBLIC_GOSYS_URL! }
    }
}
