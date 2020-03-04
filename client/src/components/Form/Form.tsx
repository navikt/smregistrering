import './Form.less';
import './components/formComponents/Flatpickr.less';

import React, { useState } from 'react';
import { Checkbox, FnrInput, Input, Select, Textarea } from 'nav-frontend-skjema';
import { Element, EtikettLiten } from 'nav-frontend-typografi';

import DatePicker from './components/formComponents/DatePicker';
import FormHeader from './components/FormHeader';
import FormLabel from './components/formComponents/FormLabel';
import Panel from '../Panel/Panel';
import RangePicker from './components/formComponents/RangePicker';
import Row from './components/formComponents/Row';
import SectionContainer from './components/SectionContainer';
import Subsection from './components/formComponents/Subsection';
import {
    ArbeidsgiverField,
    AvventendeSykmeldingField,
    FieldValues,
    HarArbeidsgiver,
    MedisinskVurderingField,
    MetadataField,
    MulighetForArbeidField,
    SchemaField,
} from '../../types/skjemaTypes';
import { SectionTitle, Sections } from '../../App';

const initialSchema: FieldValues = {
    [SchemaField.METADATA]: {
        [MetadataField.PERSONNUMMER]: undefined,
        [MetadataField.TELEFON]: undefined,
        [MetadataField.ETTERNAVN]: undefined,
        [MetadataField.FORNAVN]: undefined,
    },
    [SchemaField.SYKETILFELLESTARTDATO]: undefined,
    [SchemaField.LEGE_NAVN]: undefined,
    [SchemaField.ARBEIDSGIVER]: {
        [ArbeidsgiverField.HAR_ARBEIDSGIVER]: undefined,
        [ArbeidsgiverField.NAVN]: undefined,
        [ArbeidsgiverField.YRKESBETEGNELSE]: undefined,
        [ArbeidsgiverField.STILLINGSPROSENT]: undefined,
    },
    [SchemaField.MEDISINSKVURDERING]: {
        [MedisinskVurderingField.HOVEDDIAGNOSE]: {
            system: undefined,
            kode: undefined,
            tekst: undefined,
        },
        [MedisinskVurderingField.BIDIAGNOSER]: [],
        [MedisinskVurderingField.ANNEN_FRAVAERSARSAK]: false,
        [MedisinskVurderingField.LOVFESTET_FRAVAERSGRUNN]: undefined,
        [MedisinskVurderingField.BESKRIV_FRAVAER]: undefined,
        [MedisinskVurderingField.SVANGERSKAP]: false,
        [MedisinskVurderingField.YRKESSKADE]: false,
        [MedisinskVurderingField.YRKESSKADE_DATO]: undefined,
        [MedisinskVurderingField.SKJERMET_FRA_PASIENT]: false,
    },
    [SchemaField.MULIGHET_FOR_ARBEID]: {
        [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: {
            [AvventendeSykmeldingField.AVVENTENDE]: false,
            [AvventendeSykmeldingField.AVVENTENDE_PERIODE]: [],
            [AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER]: undefined,
        },
        [MulighetForArbeidField.GRADERT_SYKMELDING]: {
            gradert: false,
            gradertPeriode: [],
            grad: undefined,
            reisetilskudd: false,
        },
        [MulighetForArbeidField.FULL_SYKMELDING]: {
            sykmeldt: false,
            sykmeldtPeriode: [],
            medisinskeAarsaker: false,
            arbeidsforhold: false,
        },
        [MulighetForArbeidField.BEHANDLING]: {
            kanArbeide: false,
            behandlingsPeriode: [],
            antallDager: undefined,
        },
        [MulighetForArbeidField.REISETILSKUDD]: {
            fulltArbeid: false,
            arbeidsPeriode: [],
        },
    },
    friskmelding: {
        arbeidsfoerEtterPeriode: false,
        hensynPaArbeidsplassen: undefined,
    },
    arbeidsevne: {
        tilretteleggingArbeidsplass: {
            tilrettelegging: false,
            beskriv: undefined,
        },
        tiltakNav: {
            tiltakNav: false,
            beskriv: undefined,
        },
        innspillNav: {
            innspill: false,
            beskriv: undefined,
        },
    },
    meldingTilNav: {
        bistand: false,
        begrunn: undefined,
    },
    meldingTilArbeidsgiver: {
        innspill: false,
        beskriv: undefined,
    },
    tilbakedatering: {
        erTilbakedatert: false,
        datoTilbakedatering: undefined,
        kanIkkeIvaretaInteresser: false,
        begrunn: undefined,
    },
    bekreftelse: {
        legitimert: false,
        sykmeldersNavn: undefined,
        hpr: undefined,
        telefon: undefined,
        adresse: undefined,
    },
};

type FormProps = {
    sections: Sections;
};

type ExpandableSections =
    | SectionTitle.MULIGHET_FOR_ARBEID
    | SectionTitle.ARBEIDSEVNE
    | SectionTitle.TIL_NAV
    | SectionTitle.TIL_ARBEIDSGIVER;

const Form = ({ sections }: FormProps) => {
    const [metadata, setMetadata] = useState(initialSchema[SchemaField.METADATA]);
    const [syketilfelleStartDato, setSyketilfelleStartDato] = useState(
        initialSchema[SchemaField.SYKETILFELLESTARTDATO],
    );
    const [legenavn, setLegenavn] = useState(initialSchema[SchemaField.LEGE_NAVN]);
    const [arbeidsgiver, setArbeidsgiver] = useState(initialSchema[SchemaField.ARBEIDSGIVER]);
    const [medisinskvurdering, setMedisinskvurdering] = useState(initialSchema[SchemaField.MEDISINSKVURDERING]);
    const [mulighetForArbeid, setMulighetForArbeid] = useState(initialSchema[SchemaField.MULIGHET_FOR_ARBEID]);

    const [expanded, setExpanded] = useState<{ [key in ExpandableSections]: boolean }>({
        [SectionTitle.MULIGHET_FOR_ARBEID]: true,
        [SectionTitle.ARBEIDSEVNE]: true,
        [SectionTitle.TIL_NAV]: true,
        [SectionTitle.TIL_ARBEIDSGIVER]: true,
    });

    const expandSection = (name: ExpandableSections) => {
        setExpanded(state => ({
            ...state,
            [name]: !state[name],
        }));
    };

    console.group('STATE');
    console.log('metadata', metadata);
    console.log('syketilfelleStartDato', syketilfelleStartDato);
    console.log('legenavn', legenavn);
    console.log('arbeidsgiver', arbeidsgiver);
    console.log('medisinskvurdering', medisinskvurdering);
    console.log('mulighetForArbeid', mulighetForArbeid);
    console.groupEnd();

    return (
        <Panel>
            <FormHeader />

            <div className="form-margin-bottom section-content">
                <FnrInput
                    className="form-margin-bottom half"
                    onChange={({ target: { value } }) =>
                        setMetadata(state => ({
                            ...state,
                            [MetadataField.PERSONNUMMER]: value,
                        }))
                    }
                    onValidate={valid => console.log(valid)}
                    label={<EtikettLiten>Fødselsnummer (11 siffer)</EtikettLiten>}
                />

                <DatePicker
                    label="Startdato for legemeldt fravær"
                    value={syketilfelleStartDato}
                    onChange={newDates => setSyketilfelleStartDato(newDates)}
                />
            </div>
            <SectionContainer section={sections[SectionTitle.PASIENTOPPLYSNINGER]}>
                <Row>
                    <Input
                        onChange={({ target: { value } }) =>
                            setMetadata(state => ({
                                ...state,
                                [MetadataField.ETTERNAVN]: value,
                            }))
                        }
                        type="text"
                        label={<Element>1.1.1 Etternavn</Element>}
                    />
                    <Input
                        onChange={({ target: { value } }) =>
                            setMetadata(state => ({
                                ...state,
                                [MetadataField.FORNAVN]: value,
                            }))
                        }
                        type="text"
                        label={<Element>1.1.2 Fornavn</Element>}
                    />
                </Row>

                <Input
                    className="form-margin-bottom half"
                    type="tel"
                    onChange={({ target: { value } }) =>
                        setMetadata(state => ({
                            ...state,
                            [MetadataField.TELEFON]: value,
                        }))
                    }
                    label={<Element>1.3 Telefon</Element>}
                />

                <Input
                    className="form-margin-bottom"
                    type="text"
                    onChange={({ target: { value } }) => setLegenavn(value)}
                    label={<Element>1.4 Navn på pasientens fastlege</Element>}
                />
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.ARBEIDSGIVER]}>
                <Select
                    onChange={({ target: { value } }) => {
                        if (value === '0') {
                            setArbeidsgiver(state => ({
                                ...state,
                                [ArbeidsgiverField.HAR_ARBEIDSGIVER]: undefined,
                            }));
                        } else {
                            setArbeidsgiver(state => ({
                                ...state,
                                [ArbeidsgiverField.HAR_ARBEIDSGIVER]: value as HarArbeidsgiver,
                            }));
                        }
                    }}
                    className="form-margin-bottom"
                    label={<Element>2.1 Pasienten har</Element>}
                >
                    <option value="0">Velg</option>
                    {Object.entries(HarArbeidsgiver).map(([key, value]) => {
                        return (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        );
                    })}
                </Select>
                <Input
                    className="form-margin-bottom"
                    type="text"
                    onChange={({ target: { value } }) =>
                        setArbeidsgiver(state => ({
                            ...state,
                            [ArbeidsgiverField.NAVN]: value,
                        }))
                    }
                    label={<Element>2.2 Arbeidsgiver for denne sykmeldingen</Element>}
                />
                <Input
                    className="form-margin-bottom"
                    type="text"
                    onChange={({ target: { value } }) =>
                        setArbeidsgiver(state => ({
                            ...state,
                            [ArbeidsgiverField.YRKESBETEGNELSE]: value,
                        }))
                    }
                    label={<Element>2.3 Yrke/stilling for dette arbeidsforholdet</Element>}
                />
                <Input
                    className="form-margin-bottom half"
                    type="number"
                    onChange={({ target: { value } }) =>
                        setArbeidsgiver(state => ({
                            ...state,
                            [ArbeidsgiverField.STILLINGSPROSENT]: Number(value),
                        }))
                    }
                    label={<Element>2.4 Stillingsprosent</Element>}
                />
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.DIAGNOSE]}>
                <FormLabel label="3.1 Hoveddiagnose" />
                <Row>
                    <Select className="form-margin-bottom" label={<Element>3.1.1 Kodesystem</Element>}>
                        <option value="system1">ICPC-2</option>
                        <option value="system2">ICD-10</option>
                    </Select>
                    <Input className="form-margin-bottom" label={<Element>3.1.2 Kode</Element>} />
                    <Input className="form-margin-bottom" label={<Element>3.1.3 Kode</Element>} />
                </Row>
                <FormLabel label="3.2 Bidiagnose" />
                <Row>
                    <Select className="form-margin-bottom" label={<Element>3.2.1 Kodesystem</Element>}>
                        <option value="system1">ICPC-2</option>
                        <option value="system2">ICD-10</option>
                    </Select>
                    <Input className="form-margin-bottom" label={<Element>3.2.2 Kode</Element>} />
                    <Input className="form-margin-bottom" label={<Element>3.2.3 Kode</Element>} />
                </Row>
                <hr />
                <Subsection sectionIdentifier="3.3">
                    <Checkbox
                        checked={medisinskvurdering[MedisinskVurderingField.ANNEN_FRAVAERSARSAK]}
                        label="Annen lovfestet fraværsgrunn § 8-4, 3. ledd oppgis hvis relevant"
                        onChange={() =>
                            setMedisinskvurdering(state => ({
                                ...state,
                                [MedisinskVurderingField.ANNEN_FRAVAERSARSAK]: !state[
                                    MedisinskVurderingField.ANNEN_FRAVAERSARSAK
                                ],
                            }))
                        }
                    />
                    <br />
                    {medisinskvurdering[MedisinskVurderingField.ANNEN_FRAVAERSARSAK] && (
                        <>
                            <Input
                                className="form-margin-bottom half"
                                onChange={({ target: { value } }) =>
                                    setMedisinskvurdering(state => ({
                                        ...state,
                                        [MedisinskVurderingField.LOVFESTET_FRAVAERSGRUNN]: value,
                                    }))
                                }
                                label={<Element>3.3.1 Lovfestet fraværsgrunn</Element>}
                            />
                            <Textarea
                                maxLength={0}
                                value={medisinskvurdering[MedisinskVurderingField.BESKRIV_FRAVAER] || ''}
                                onChange={({ target: { value } }) =>
                                    setMedisinskvurdering(state => ({
                                        ...state,
                                        [MedisinskVurderingField.BESKRIV_FRAVAER]: value,
                                    }))
                                }
                                label={<Element>3.3.2 Beskriv fravær (valgfritt)</Element>}
                            />
                        </>
                    )}
                </Subsection>

                <Subsection sectionIdentifier="3.4">
                    <Checkbox
                        checked={medisinskvurdering[MedisinskVurderingField.SVANGERSKAP]}
                        label="Sykdommen er svangerskapsrelatert"
                        onChange={() =>
                            setMedisinskvurdering(state => ({
                                ...state,
                                [MedisinskVurderingField.SVANGERSKAP]: !state[MedisinskVurderingField.SVANGERSKAP],
                            }))
                        }
                    />
                </Subsection>

                <Subsection sectionIdentifier="3.5">
                    <Checkbox
                        checked={medisinskvurdering[MedisinskVurderingField.YRKESSKADE]}
                        label="Sykmeldingen kan skyldes en yrkesskade / yrkessykdom"
                        onChange={() =>
                            setMedisinskvurdering(state => ({
                                ...state,
                                [MedisinskVurderingField.YRKESSKADE]: !state[MedisinskVurderingField.YRKESSKADE],
                            }))
                        }
                    />
                    <br />
                    {medisinskvurdering[MedisinskVurderingField.YRKESSKADE] && (
                        <DatePicker
                            label="3.6 Eventuell skadedato"
                            value={medisinskvurdering[MedisinskVurderingField.YRKESSKADE_DATO]}
                            onChange={newDates =>
                                setMedisinskvurdering(state => ({
                                    ...state,
                                    [MedisinskVurderingField.YRKESSKADE_DATO]: newDates,
                                }))
                            }
                        />
                    )}
                </Subsection>

                <Subsection sectionIdentifier="3.7" underline={false}>
                    <Checkbox
                        checked={medisinskvurdering[MedisinskVurderingField.SKJERMET_FRA_PASIENT]}
                        label="Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og brukerrettighetsloven §§ 3-2 og 5-1"
                        onChange={() =>
                            setMedisinskvurdering(state => ({
                                ...state,
                                [MedisinskVurderingField.SKJERMET_FRA_PASIENT]: !state[
                                    MedisinskVurderingField.SKJERMET_FRA_PASIENT
                                ],
                            }))
                        }
                    />
                </Subsection>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.MULIGHET_FOR_ARBEID]}
                expanded={expanded[SectionTitle.MULIGHET_FOR_ARBEID]}
                setExpanded={() => expandSection(SectionTitle.MULIGHET_FOR_ARBEID)}
            >
                <Subsection sectionIdentifier="4.1">
                    <Checkbox
                        checked={
                            mulighetForArbeid[MulighetForArbeidField.AVVENTENDE_SYKMELDING][
                                AvventendeSykmeldingField.AVVENTENDE
                            ]
                        }
                        label="Pasienten kan benytte avventende sykmelding"
                        onChange={() =>
                            setMulighetForArbeid(state => ({
                                ...state,
                                [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: {
                                    ...state[MulighetForArbeidField.AVVENTENDE_SYKMELDING],
                                    [AvventendeSykmeldingField.AVVENTENDE]: !state[
                                        MulighetForArbeidField.AVVENTENDE_SYKMELDING
                                    ][AvventendeSykmeldingField.AVVENTENDE],
                                },
                            }))
                        }
                    />
                    <br />
                    {mulighetForArbeid[MulighetForArbeidField.AVVENTENDE_SYKMELDING][
                        AvventendeSykmeldingField.AVVENTENDE
                    ] && (
                        <>
                            <RangePicker
                                labelFrom="4.1.1 f.o.m."
                                labelTo="4.1.2 t.o.m."
                                value={
                                    mulighetForArbeid[MulighetForArbeidField.AVVENTENDE_SYKMELDING][
                                        AvventendeSykmeldingField.AVVENTENDE_PERIODE
                                    ]
                                }
                                onChange={newDates =>
                                    setMulighetForArbeid(state => ({
                                        ...state,
                                        [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: {
                                            ...state[MulighetForArbeidField.AVVENTENDE_SYKMELDING],
                                            [AvventendeSykmeldingField.AVVENTENDE_PERIODE]: newDates,
                                        },
                                    }))
                                }
                            />
                            <Textarea
                                maxLength={0}
                                value={
                                    mulighetForArbeid[MulighetForArbeidField.AVVENTENDE_SYKMELDING][
                                        AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER
                                    ] || ''
                                }
                                onChange={({ target: { value } }) =>
                                    setMulighetForArbeid(state => ({
                                        ...state,
                                        [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: {
                                            ...state[MulighetForArbeidField.AVVENTENDE_SYKMELDING],
                                            [AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER]: value,
                                        },
                                    }))
                                }
                                label={<Element>4.1.3 Innspill til arbeidsgiver om tilrettelegging</Element>}
                            />
                        </>
                    )}
                </Subsection>
                <Subsection sectionIdentifier="4.2">
                    <Checkbox
                        checked={true}
                        label="Pasienten kan være delvis i arbeid (gradert sykmelding)"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <>
                            <RangePicker
                                labelFrom="4.2.1 f.o.m."
                                labelTo="4.2.2 t.o.m."
                                value={[]}
                                onChange={newDates => console.log(newDates)}
                            />
                            <Input
                                className="form-margin-bottom half"
                                label={<Element>4.2.3 Oppgi grad for sykmelding</Element>}
                            />
                        </>
                    )}

                    <Element className="form-label">4.2.4</Element>
                    <Checkbox
                        checked={false}
                        label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                        onChange={() => console.log('checkbox')}
                    />
                </Subsection>

                <Subsection sectionIdentifier="4.3">
                    <Checkbox
                        checked={true}
                        label="Pasienten kan ikke være i arbeid (100 prosent sykmelding)"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <>
                            <RangePicker
                                labelFrom="4.3.1 f.o.m."
                                labelTo="4.3.2 t.o.m."
                                value={[]}
                                onChange={newDates => console.log(newDates)}
                            />
                            <Element className="form-label">4.3.3</Element>
                            <Checkbox
                                className="form-margin-bottom"
                                checked={false}
                                label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                                onChange={() => console.log('checkbox')}
                            />
                            <Element className="form-label">4.3.4</Element>
                            <Checkbox
                                className="form-margin-bottom"
                                checked={false}
                                label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                                onChange={() => console.log('checkbox')}
                            />
                        </>
                    )}
                </Subsection>

                <Subsection sectionIdentifier="4.4">
                    <Checkbox
                        checked={true}
                        label="Pasienten kan ikke være i arbeid på behandlingsdager"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <>
                            <RangePicker
                                labelFrom="4.4.1 f.o.m."
                                labelTo="4.4.2 t.o.m."
                                value={[]}
                                onChange={newDates => console.log(newDates)}
                            />

                            <Input
                                className="form-margin-bottom half"
                                label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
                            />
                        </>
                    )}
                </Subsection>

                <Subsection sectionIdentifier="4.5" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Pasienten kan være i fullt arbeid ved bruk av reisetilskudd"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <RangePicker
                            labelFrom="4.4.1 f.o.m."
                            labelTo="4.4.2 t.o.m."
                            value={[]}
                            onChange={newDates => console.log(newDates)}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.FRISKMELDING_PROGNOSE]}>
                <Subsection sectionIdentifier="5.1" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Pasienten er 100 prosent arbeidsfør etter denne perioden"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>5.1.1 Beskrive eventuelle hensyn som må tas på arbeidsplassen</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.ARBEIDSEVNE]}
                expanded={expanded[SectionTitle.ARBEIDSEVNE]}
                setExpanded={() => expandSection(SectionTitle.ARBEIDSEVNE)}
            >
                <Subsection sectionIdentifier="7.1">
                    <Checkbox
                        checked={true}
                        label="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Beskriv</Element>}
                        />
                    )}
                </Subsection>

                <Subsection sectionIdentifier="7.2">
                    <Checkbox checked={true} label="Tiltak i regi av NAV" onChange={() => console.log('checkbox')} />
                    <br />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Beskriv. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)</Element>}
                        />
                    )}
                </Subsection>

                <Subsection sectionIdentifier="7.3" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Eventuelle andre innspill til NAV"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Beskriv</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.TIL_NAV]}
                expanded={expanded[SectionTitle.TIL_NAV]}
                setExpanded={() => expandSection(SectionTitle.TIL_NAV)}
            >
                <Subsection sectionIdentifier="8.1" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Ønskes bistand fra NAV nå?"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Begrunn nærmere</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.TIL_ARBEIDSGIVER]}
                expanded={expanded[SectionTitle.TIL_ARBEIDSGIVER]}
                setExpanded={() => expandSection(SectionTitle.TIL_ARBEIDSGIVER)}
            >
                <Subsection sectionIdentifier="9.1" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Andre innspill til arbeidsgiver"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Andre innspill til arbeidsgiver</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.TILBAKEDATERING]}>
                <Subsection sectionIdentifier="11.1" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Er sykmelding tilbakedatert?"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <DatePicker
                            label="Oppgi dato for dokumenterbar kontakt med pasienten"
                            value={undefined}
                            onChange={newDates => console.log(newDates)}
                        />
                    )}
                </Subsection>

                <Subsection sectionIdentifier="11.2" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Pasienten har ikke kunnet ivareta egne interesser"
                        onChange={() => console.log('checkbox')}
                    />
                    <br />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Begrunn</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.BEKREFTELSE]}>
                <Subsection sectionIdentifier="12.1" underline={false}>
                    <Checkbox
                        className="form-margin-bottom"
                        checked={false}
                        label="Pasienten er kjent eller har vist legitimasjon"
                        onChange={() => console.log('checkbox')}
                    />
                </Subsection>

                <Input className="form-margin-bottom" label={<Element>12.2 Sykmelders navn</Element>} />

                <Row>
                    <Input className="form-margin-bottom" label={<Element>12.4 HPR-nummer</Element>} />
                    <Input className="form-margin-bottom" label={<Element>12.5 Telefon</Element>} />
                </Row>

                <Input className="form-margin-bottom" label={<Element>12.6 Adresse</Element>} />
            </SectionContainer>
        </Panel>
    );
};

export default Form;
