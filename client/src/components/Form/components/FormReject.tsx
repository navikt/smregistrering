import './FormReject.less';

import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import {AlertStripeInfo, AlertStripeFeil, AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Fareknapp, Knapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';

import BackArrow from '../../../svg/BackArrow';
import WarningCircle from '../../../svg/WarningCircle';
import logger from '../../../utils/logger';
import Lenke from "nav-frontend-lenker";

interface FormRejectProps {
    enhet: string | undefined | null;
    oppgaveid: number;
    setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormReject = ({ enhet, oppgaveid, setIsComplete }: FormRejectProps) => {
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

    Modal.setAppElement('#root');

    const revertSykmelding = () => {
        if (!enhet) {
            setRevertError(new Error('Enhet mangler. Vennligst velg enhet øverst på siden'));
        } else {
            logger.info(`Sender oppgave til gosys. oppgaveid: ${oppgaveid}`);
            setIsLoadingRevert(true);
            setRevertError(null);
            fetch(`backend/api/v1/oppgave/${oppgaveid}/tilgosys`, {
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

    function hanndleReopen(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!enhet) {
            setRejectError(new Error('Enhet mangler. Vennligst velg enhet øverst på siden'));
        } else {
            logger.info(`Gjenåpner oppgave. oppgaveid: ${oppgaveid}`);
            setIsLoadingReject(true);
            setRejectError(null);
            const reason = (e.target as any)[0]?.value as string;
            fetch(`backend/api/v1/oppgave/${oppgaveid}/reopen`, {
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
                        logger.info(`Oppgaven ble gjenåpnet. oppgaveid: ${oppgaveid}`);
                        setRejectModalOpen(false);
                        setIsLoadingReject(false);
                        setSuccessModalContent('Oppgaven ble gjenåpnet.');
                        setIsComplete(true);
                    } else {
                        throw new Error(
                            `En feil oppsto ved gjenåpning av oppgave: ${oppgaveid}. Feilkode: ${response.status}`,
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

    function handleReject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!enhet) {
            setRejectError(new Error('Enhet mangler. Vennligst velg enhet øverst på siden'));
        } else {
            logger.info(`Avviser oppgave. oppgaveid: ${oppgaveid}`);
            setIsLoadingReject(true);
            setRejectError(null);
            const reason = (e.target as any)[0]?.value as string;
            fetch(`backend/api/v1/oppgave/${oppgaveid}/avvis`, {
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

    return (
        <>
            <div className="form-reject-container">
                <Element>Er det noe galt med sykmeldingen?</Element>
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
                <div style={{marginTop: '2rem'}}>
                    <Lenke href={process.env.REACT_APP_GOSYS_URL!!}>
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M24 13H3.705L11 20.546 9.625 22 0 12 9.625 2 11 3.455 3.705 11H24v2z" fill="currentColor"></path></svg>
                        <span>Tilbake til GOSYS</span>
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
                        <option value="Feil avventende periode">Feil avventende periode</option>
                        <option value="Manglende utfylling av periode">Manglende utfylling av periode</option>
                        <option value="Manglende utfylling av grad">Manglende utfylling av grad</option>
                        <option value="Manglende utfylling av diagnosekode">Manglende utfylling av diagnosekode</option>
                        <option value="Behandler mangler autorisasjon til å sykmelde">
                            Behandler mangler autorisasjon til å sykmelde
                        </option>
                        <option value="Sykefraværet overstiger 12 uker og sykmelder er kiropraktor/fysioterapeut">
                            Sykefraværet overstiger 12 uker og sykmelder er kiropraktor/fysioterapeut
                        </option>
                        <option value="Skjema er ikke mulig å tolke/lese">Skjema er ikke mulig å tolke/lese</option>
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

                {/*test av reopen*/}
                <form className="cancelmodal" onSubmit={hanndleReopen}>
                    <div>
                        <Undertittel tag="h1" className="cancelmodal__title">
                            Reopen
                        </Undertittel>
                        <Normaltekst tag="p" className="cancelmodal__content">
                            Test av reopen
                        </Normaltekst>
                    </div>
                    <Fareknapp
                        htmlType="submit"
                        id="reopen-modal-button"
                        className="cancelmodal__button"
                        disabled={isLoadingReject}
                        spinner={isLoadingReject}
                    >
                        Gjenåpne sykmelding
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
                        Send til GOSYS bruker du hvis pdf-en er noe annet enn en norsk sykmelding. Av og til sniker det seg inn et annet dokument i bunken av sykmeldinger hos skannerleverandøren. Det kan være en utenlandsk sykmelding, en søknad om yrkesskadeerstatning eller noen annet.
                    </AlertStripeInfo>

                    <AlertStripeAdvarsel className="cancelmodal__content">
                        <strong>Obs!</strong> Hvis en sykmelding feilaktig sendes til GOSYS kan den aldri bli tilgjengelig for brukeren digitalt.
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
                    <a
                        id="tilbake-til-gosys-lenke"
                        href={process.env.REACT_APP_GOSYS_URL}
                        className="knapp knapp__hoved"
                    >
                        Tilbake til GOSYS
                    </a>
                </div>
            </Modal>
        </>
    );
};

export default FormReject;
