export class ManuellOppgave {
    journalpostId?: string;
    fnr?: string;
    aktorId?: string;
    dokumentInfoId?: string;
    datoOpprettet?: Date;
    sykmeldingId: string;
    oppgaveid: number;
    ferdigstilt: boolean;
    pdfPapirSmRegistrering?: string; // Base64 encoded string

    constructor(manuellOppgaveData: any) {
        this.journalpostId = manuellOppgaveData.journalpostId ? manuellOppgaveData.journalpostId : undefined;
        this.fnr = manuellOppgaveData.fnr ? manuellOppgaveData.fnr : undefined;
        this.aktorId = manuellOppgaveData.aktorId ? manuellOppgaveData.aktorId : undefined;
        this.dokumentInfoId = manuellOppgaveData.dokumentInfoId ? manuellOppgaveData.dokumentInfoId : undefined;
        this.datoOpprettet = manuellOppgaveData.datoOpprettet ? new Date(manuellOppgaveData.datoOpprettet) : undefined;
        this.sykmeldingId = manuellOppgaveData.sykmeldingId;
        this.oppgaveid = manuellOppgaveData.oppgaveid;
        this.ferdigstilt = manuellOppgaveData.ferdigstilt;
        this.pdfPapirSmRegistrering = manuellOppgaveData.pdfPapirSmRegistrering
            ? manuellOppgaveData.pdfPapirSmRegistrering
            : undefined;
    }
}