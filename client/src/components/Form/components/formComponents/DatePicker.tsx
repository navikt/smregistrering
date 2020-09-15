import './Flatpickr.less';
import './datepicker-extended.less';

import Flatpickr from 'react-flatpickr';
import React from 'react';
import { Fareknapp } from 'nav-frontend-knapper';

import Cross from '../../../../svg/Cross';
import calendar from '../../../../svg/calendar.svg';
import { flatpickrLocale } from './flatpickrUtils';

type DatePickerProps = {
    id: string;
    label: string;
    value: Date | undefined;
    onChange: (newDate: Date | undefined) => void;
    feil?: string;
};

const DatePicker = ({ id, label, value, onChange, feil }: DatePickerProps) => {
    return (
        <div role="region" aria-label="datovelgerbeholder" className="datepicker-container">
            <label className="datepicker-label" htmlFor={id}>
                {label}
            </label>
            <div role="region" aria-label="datovelger" className={`flatpickr-container`}>
                <Flatpickr
                    id={id}
                    value={value}
                    className={`typo-normal flatpickr flatpickr-input ${feil ? 'flatpickr-input--feil' : ''}`}
                    placeholder="DD.MM.ÅÅÅÅ"
                    onChange={(newDate) => onChange(newDate[0])}
                    options={{
                        position: 'below',
                        static: true,
                        mode: 'single',
                        enableTime: false,
                        dateFormat: 'd.m.Y',
                        allowInput: true,
                        locale: flatpickrLocale,
                    }}
                />
                <img className="flatpickr-icon" aria-hidden="true" alt="Kalender" src={calendar} />

                <div className="flatpickr-clear">
                    <Fareknapp
                        kompakt
                        onClick={(event) => {
                            event.preventDefault();
                            onChange(undefined);
                        }}
                    >
                        <Cross />
                        <span className="sr-only">Slett valgt dato</span>
                    </Fareknapp>
                </div>
            </div>
            {feil && (
                <div className="skjemaelement__feilmelding">
                    <p className="typo-feilmelding">{feil}</p>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
