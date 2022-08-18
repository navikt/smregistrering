import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import { AlertStripeInfo, AlertStripeFeil, AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Fareknapp, Knapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';

import BackArrow from '../../../svg/BackArrow';
import WarningCircle from '../../../svg/WarningCircle';
import logger from '../../../utils/logger';
import { apiFetch } from '../../../utils/fetchUtils';
import { getReturnToURL } from '../../../utils/urlUtils';

interface FormRejectProps {
    enhet: string | undefined | null;
    oppgaveid: number;
    sykmeldingId: string | null;
    setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
    isFerdigstilt: boolean;
}

const FormReject = ({ enhet, oppgaveid, sykmeldingId, setIsComplete, isFerdigstilt }: FormRejectProps) => {
    // Avvis sykmelding
    const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);
    const [isLoadingReject, setIsLoadingReject] = useState<boolean>(false);
    const [rejectError, setRejectError] = useState<Error | null>(null);

    // Reverter til GOSYS
    const [revertModalOpen, setRevertModalOpen] = useState<boolean>(false);
    const [isLoadingRevert, setIsLoadingRevert] = useState<boolean>(false);
    const [revertError, setRevertError] = useState<Error | null>(null);

    // Successmodal
    const [successModalContent, setSuccessModalContent] = useState<string | undefined>(undefined);

    const revertSykmelding = () => {
        if (!enhet) {
            setRevertError(new Error('Enhet mangler. Vennligst velg enhet øverst på siden'));
        } else {
            logger.info(`Sender oppgave til gosys. oppgaveid: ${oppgaveid}`);
            setIsLoadingRevert(true);
            setRevertError(null);
            apiFetch(`/api/backend/api/v1/oppgave/${oppgaveid}/tilgosys`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Nav-Enhet': enhet,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        logger.info(`Oppgaven ble sendt til gosys. oppgaveid: ${oppgaveid}`);
                        setRevertModalOpen(false);
                        setIsLoadingRevert(false);
                        setSuccessModalContent('Oppgaven ble sendt tilbake til GOSYS.');
                        setIsComplete(true);
                    } else {
                        throw new Error(
                            `En feil oppsto ved sending av oppgave til GOSYS: ${oppgaveid}. Feilkode: ${response.status}`,
                        );
                    }
                })
                .catch((error) => {
                    logger.error(error);
                    setRevertError(error);
                    setIsLoadingRevert(false);
                });
        }
    };

    function handleReject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!enhet) {
            setRejectError(new Error('Enhet mangler. Vennligst velg enhet øverst på siden'));
        } else {
            logger.info(`Avviser oppgave. oppgaveid: ${oppgaveid}`);
            setIsLoadingReject(true);
            setRejectError(null);
            const reason = (e.target as any)[0]?.value as string;
            apiFetch(`/api/backend/api/v1/oppgave/${oppgaveid}/avvis`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Nav-Enhet': enhet,
                },
                body: JSON.stringify({ reason: !!reason ? reason : null }),
            })
                .then((response) => {
                    if (response.ok) {
                        logger.info(`Oppgaven ble avvist. oppgaveid: ${oppgaveid}`);
                        setRejectModalOpen(false);
                        setIsLoadingReject(false);
                        setSuccessModalContent('Oppgaven ble ferdigstilt.');
                        setIsComplete(true);
                    } else {
                        throw new Error(
                            `En feil oppsto ved avvisning av oppgave: ${oppgaveid}. Feilkode: ${response.status}`,
                        );
                    }
                })
                .catch((error) => {
                    logger.error(error);
                    setRejectError(error);
                    setIsLoadingReject(false);
                });
        }
    }

    const returnLink = getReturnToURL(sykmeldingId);

    return (
        <>
            <div className="form-reject-container">
                <Element>Er det noe galt med sykmeldingen?</Element>
                {!isFerdigstilt && (
                    <div className="form-reject-container__action-buttons">
                        <Knapp
                            htmlType="button"
                            id="to-gosys-button"
                            className="menu-button"
                            onClick={() => setRevertModalOpen((prev) => !prev)}
                        >
                            <BackArrow />
                            <span>Dette er ikke en sykmelding</span>
                        </Knapp>
                        <Knapp htmlType="button" id="avvis-button" onClick={() => setRejectModalOpen((prev) => !prev)}>
                            <WarningCircle />
                            <span>Avvis sykmeldingen</span>
                        </Knapp>
                    </div>
                )}
                <div style={{ marginTop: '2rem' }}>
                    <Lenke href={returnLink.url}>
                        <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"
                            role="img"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24 13H3.705L11 20.546 9.625 22 0 12 9.625 2 11 3.455 3.705 11H24v2z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <span>{returnLink.text}</span>
                    </Lenke>
                </div>
            </div>

            <Modal
                isOpen={rejectModalOpen}
                onRequestClose={() => setRejectModalOpen(false)}
                closeButton
                contentLabel="Bekreft avvisning av sykmelding"
            >
                <form className="cancelmodal" onSubmit={handleReject}>
                    <div>
                        <Undertittel tag="h1" className="cancelmodal__title">
                            Er du sikker på at du vil avvise sykmeldingen?
                        </Undertittel>
                        <Normaltekst tag="p" className="cancelmodal__content">
                            Dette vil ferdigstille oppgaven. Sykmeldingen blir ikke registrert i infotrygd. Behandler og
                            pasient blir ikke varslet.
                        </Normaltekst>
                    </div>
                    <Select
                        className="cancelmodal__avvisningsgrunn"
                        name="avvisningsgrunn"
                        label="Hvorfor avvises sykmeldingen?"
                    >
                        <option value="">Velg avvisningsgrunn (valgfritt)</option>
                        <option value="Avventende periode mangler tekst">Avventende periode mangler tekst</option>
                        <option value="Avventende periode over 16 dager">Avventende periode over 16 dager</option>
                        <option value="Manglende utfylling av periode">Manglende utfylling av periode</option>
                        <option value="Manglende utfylling av grad">Manglende utfylling av grad</option>
                        <option value="Manglende utfylling av diagnosekode">Manglende utfylling av diagnosekode</option>
                        <option value="Antall behandlingsdager mangler">Antall behandlingsdager mangler</option>
                        <option value="Behandler mangler autorisasjon til å sykmelde">
                            Behandler mangler autorisasjon til å sykmelde
                        </option>
                        <option value="HPR-nummer er ikke angitt">HPR-nummer er ikke angitt</option>
                        <option value="Behandler mangler fødselsnummer i HPR-registeret">
                            Behandler mangler fødselsnummer i HPR-registeret
                        </option>
                        <option value="Sykefraværet overstiger 12 uker og sykmelder er kiropraktor/fysioterapeut">
                            Sykefraværet overstiger 12 uker og sykmelder er kiropraktor/fysioterapeut
                        </option>
                        <option value="Pasienten er over 70 år">Pasienten er over 70 år</option>
                        <option value="Sykmeldingen mangler sider">Sykmeldingen mangler sider</option>
                        <option value="Skjema er ikke mulig å tolke/lese">Skjema er ikke mulig å tolke/lese</option>
                        <option value="Dato for behandling mangler">Dato for behandling mangler</option>
                    </Select>
                    <Fareknapp
                        htmlType="submit"
                        id="avvis-modal-button"
                        className="cancelmodal__button"
                        disabled={isLoadingReject}
                        spinner={isLoadingReject}
                    >
                        AVVIS SYKMELDING
                    </Fareknapp>
                    {rejectError && <AlertStripeFeil>{rejectError.message}</AlertStripeFeil>}
                </form>
            </Modal>
            <Modal
                isOpen={revertModalOpen}
                onRequestClose={() => setRevertModalOpen(false)}
                closeButton
                contentLabel="Send sykmelding tilbake til GOSYS"
            >
                <div className="cancelmodal">
                    <Undertittel tag="h1" className="cancelmodal__title">
                        Send til GOSYS?
                    </Undertittel>
                    <Normaltekst tag="p" className="cancelmodal__content">
                        Dette vil ikke ferdigstille oppgaven, men gjør det mulig å journalføre dokumentet i GOSYS.
                    </Normaltekst>

                    <AlertStripeInfo className="cancelmodal__content_addition">
                        Send til GOSYS bruker du hvis pdf-en er noe annet enn en norsk sykmelding. Av og til sniker det
                        seg inn et annet dokument i bunken av sykmeldinger hos skannerleverandøren. Det kan være en
                        utenlandsk sykmelding, en søknad om yrkesskadeerstatning eller noe annet.
                    </AlertStripeInfo>

                    <AlertStripeAdvarsel className="cancelmodal__content">
                        <strong>Obs!</strong> Hvis en sykmelding feilaktig sendes til GOSYS kan den aldri bli
                        tilgjengelig for brukeren digitalt.
                    </AlertStripeAdvarsel>

                    <Fareknapp
                        htmlType="button"
                        id="to-gosys-modal-button"
                        className="cancelmodal__button"
                        spinner={isLoadingRevert}
                        disabled={isLoadingRevert}
                        onClick={() => revertSykmelding()}
                    >
                        Send til GOSYS
                    </Fareknapp>
                    {revertError && <AlertStripeFeil>{revertError.message}</AlertStripeFeil>}
                </div>
            </Modal>
            <Modal
                isOpen={!!successModalContent}
                onRequestClose={() => setSuccessModalContent(undefined)}
                closeButton
                contentLabel={successModalContent || ''}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 2.5rem' }}>
                    <Normaltekst style={{ marginBottom: '2rem' }}>{successModalContent}</Normaltekst>
                    <a id="tilbake-til-gosys-lenke" href={returnLink.url} className="knapp knapp__hoved">
                        {returnLink.text}
                    </a>
                </div>
            </Modal>
        </>
    );
};

export default FormReject;
