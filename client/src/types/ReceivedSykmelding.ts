import { Sykmelding } from './Sykmelding';

export class ReceivedSykmelding {
    sykmelding: Sykmelding;
    personNrPasient: string;
    tlfPasient?: string;
    personNrLege: string;
    navLogId: string;
    msgId: string;
    legekontorOrgNr?: string;
    legekontorHerId?: string;
    legekontorReshId?: string;
    legekontorOrgName: string;
    mottattDato: Date;
    rulesetVersion?: string;

    constructor(ReceivedSykmelding: any) {
        this.sykmelding = new Sykmelding(ReceivedSykmelding.sykmelding);
        this.personNrPasient = ReceivedSykmelding.personNrPasient;
        this.tlfPasient = ReceivedSykmelding.tlfPasient ? ReceivedSykmelding.tlfPasient : undefined;
        this.personNrLege = ReceivedSykmelding.personNrLege;
        this.navLogId = ReceivedSykmelding.navLogId;
        this.msgId = ReceivedSykmelding.msgId;
        this.legekontorOrgNr = ReceivedSykmelding.legekontorOrgNr ? ReceivedSykmelding.legekontorOrgNr : undefined;
        this.legekontorHerId = ReceivedSykmelding.legekontorHerId ? ReceivedSykmelding.legekontorHerId : undefined;
        this.legekontorReshId = ReceivedSykmelding.legekontorReshId ? ReceivedSykmelding.legekontorReshId : undefined;
        this.legekontorOrgName = ReceivedSykmelding.legekontorOrgName;
        this.mottattDato = new Date(ReceivedSykmelding.mottattDato);
        this.rulesetVersion = ReceivedSykmelding.rulesetVersion ? ReceivedSykmelding.rulesetVersion : undefined;
    }
}
