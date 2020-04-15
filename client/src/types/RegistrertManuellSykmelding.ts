import { Periode, MedisinskVurdering, Arbeidsgiver } from "./Sykmelding";

interface IRegistrertManuellSykmelding {
    pasientFnr: string;
    sykmelderFnr: string;
    perioder: Periode[];
    medisinskVurdering: MedisinskVurdering;
    syketilfelleStartDato: Date;
    arbeidsgiver: Arbeidsgiver;
    behandletDato: Date;
    skjermesForPasient: boolean;
}

export class RegistrertManuellSykmelding {
    pasientFnr: string;
    sykmelderFnr: string;
    perioder: Periode[];
    medisinskVurdering: MedisinskVurdering;
    syketilfelleStartDato: Date;
    arbeidsgiver: Arbeidsgiver;
    behandletDato: Date;
    skjermesForPasient: boolean;

    constructor(dataObject: IRegistrertManuellSykmelding) {
        this.pasientFnr = dataObject.pasientFnr;
        this.sykmelderFnr = dataObject.sykmelderFnr;
        this.perioder = new Array<Periode>();
        dataObject.perioder.forEach((periode: any) => {
            this.perioder.push(new Periode(periode));
        });
        this.medisinskVurdering = dataObject.medisinskVurdering;
        this.syketilfelleStartDato = dataObject.syketilfelleStartDato;
        this.arbeidsgiver = dataObject.arbeidsgiver;
        this.behandletDato = dataObject.behandletDato;
        this.skjermesForPasient = dataObject.skjermesForPasient;
    }
}