export class ReceivedManuellOppgave {
    journalpostId?: string;
    fnr?: string;
    aktorId?: string;
    dokumentInfoId?: string;
    datoOpprettet?: Date;
    sykmeldingId: string;
    oppgaveid: number;
    ferdigstilt: boolean;
    pdfPapirSmRegistrering?: string; // Base64 encoded string

    constructor(dataObject: any) {
        this.journalpostId = dataObject.journalpostId ? dataObject.journalpostId : undefined;
        this.fnr = dataObject.fnr ? dataObject.fnr : undefined;
        this.aktorId = dataObject.aktorId ? dataObject.aktorId : undefined;
        this.dokumentInfoId = dataObject.dokumentInfoId ? dataObject.dokumentInfoId : undefined;
        this.datoOpprettet = dataObject.datoOpprettet ? new Date(dataObject.datoOpprettet) : undefined;
        this.sykmeldingId = dataObject.sykmeldingId;
        this.oppgaveid = dataObject.oppgaveid;
        this.ferdigstilt = dataObject.ferdigstilt;
        this.pdfPapirSmRegistrering = dataObject.pdfPapirSmRegistrering
            ? dataObject.pdfPapirSmRegistrering
            : undefined;
    }
}