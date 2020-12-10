import './FormReject.less';

import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Fareknapp, Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import BackArrow from '../../../svg/BackArrow';
import WarningCircle from '../../../svg/WarningCircle';

interface FormRejectProps {
    enhet: string | undefined | null;
    oppgaveid: number;
}

const FormReject = ({ enhet, oppgaveid }: FormRejectProps) => {
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

    const rejectSykmelding = () => {
        if (!enhet) {
            setRejectError(new Error('Enhet mangler. Vennligst velg enhet øverst på siden'));
        } else {
            setIsLoadingReject(true);
            setRejectError(null);
            fetch(`backend/api/v1/oppgave/${oppgaveid}/avvis`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Nav-Enhet': enhet,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setRejectModalOpen(false);
                        setSuccessModalContent('Oppgaven ble ferdigstilt.');
                    } else {
                        throw new Error(
                            `En feil oppsto ved avvisning av oppgave: ${oppgaveid}. Feilkode: ${response.status}`,
                        );
                    }
                })
                .catch((error) => {
                    setRejectError(error);
                })
                .finally(() => {
                    setIsLoadingReject(false);
                });
        }
    };

    const revertSykmelding = () => {
        if (!enhet) {
            setRevertError(new Error('Enhet mangler. Vennligst velg enhet øverst på siden'));
        } else {
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
                        setRevertModalOpen(false);
                        setSuccessModalContent('Oppgaven ble sendt tilbake til GOSYS.');
                    } else {
                        throw new Error(
                            `En feil oppsto ved sending av oppgave til GOSYS: ${oppgaveid}. Feilkode: ${response.status}`,
                        );
                    }
                })
                .catch((error) => {
                    setRevertError(error);
                })
                .finally(() => {
                    setIsLoadingRevert(false);
                });
        }
    };

    return (
        <>
            <div className="form-reject-container">
                <Element>Kan ikke sykmeldingen registreres?</Element>
                <div className="form-reject-container__action-buttons">
                    <Knapp
                        htmlType="button"
                        id="to-gosys-button"
                        className="menu-button"
                        onClick={() => setRevertModalOpen((prev) => !prev)}
                    >
                        <BackArrow />
                        <span>Send til GOSYS</span>
                    </Knapp>
                    <Knapp htmlType="button" id="avvis-button" onClick={() => setRejectModalOpen((prev) => !prev)}>
                        <WarningCircle />
                        <span>Avvis sykmeldingen</span>
                    </Knapp>
                </div>
            </div>

            <Modal
                isOpen={rejectModalOpen}
                onRequestClose={() => setRejectModalOpen(false)}
                closeButton
                contentLabel="Bekreft avvisning av sykmelding"
            >
                <div className="cancelmodal">
                    <Undertittel tag="h1" className="cancelmodal--title">
                        Er du sikker på at du vil avvise sykmeldingen?
                    </Undertittel>
                    <Normaltekst tag="p" className="cancelmodal--content">
                        Dette vil ferdigstille oppgaven. Sykmeldingen blir ikke registrert i infotrygd. Behandler og
                        pasient blir ikke varslet.
                    </Normaltekst>
                    <Fareknapp
                        htmlType="button"
                        id="avvis-modal-button"
                        className="cancelmodal--button"
                        spinner={isLoadingReject}
                        onClick={() => rejectSykmelding()}
                    >
                        AVVIS SYKMELDING
                    </Fareknapp>
                    {rejectError && <AlertStripeFeil>{rejectError.message}</AlertStripeFeil>}
                </div>
            </Modal>
            <Modal
                isOpen={revertModalOpen}
                onRequestClose={() => setRevertModalOpen(false)}
                closeButton
                contentLabel="Send sykmelding tilbake til GOSYS"
            >
                <div className="cancelmodal">
                    <Undertittel tag="h1" className="cancelmodal--title">
                        Er du sikker på at du vil sende oppgaven tilbake til GOSYS?
                    </Undertittel>
                    <Normaltekst tag="p" className="cancelmodal--content">
                        Dette vil ikke ferdigstille oppgaven, men gjør det mulig å behandle den i GOSYS.
                    </Normaltekst>
                    <Fareknapp
                        htmlType="button"
                        id="to-gosys-modal-button"
                        className="cancelmodal--button"
                        spinner={isLoadingRevert}
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
                        tabIndex={0}
                        className="knapp knapp--hoved"
                    >
                        Tilbake til GOSYS
                    </a>
                </div>
            </Modal>
        </>
    );
};

export default FormReject;
