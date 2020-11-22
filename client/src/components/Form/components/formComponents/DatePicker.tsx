import './Flatpickr.less';
import './datepicker-extended.less';

import Flatpickr from 'react-flatpickr';
import React from 'react';

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

                <button
                    type="button"
                    className="flatpickr-clear"
                    onClick={(event) => {
                        event.preventDefault();
                        onChange(undefined);
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.58252 0C4.30835 0 0.0100188 4.29 1.88156e-05 9.56417C-0.00498118 12.1242 0.986686 14.5325 2.79335 16.3467C4.60002 18.16 7.00502 19.1617 9.56502 19.1667H9.58335C14.8567 19.1667 19.1559 14.8758 19.1667 9.60083C19.1767 4.3175 14.8859 0.01 9.58252 0ZM13.4067 12.8317C13.5684 12.9942 13.5675 13.2583 13.405 13.4208C13.3234 13.5025 13.2175 13.5425 13.1109 13.5425C13.005 13.5425 12.8975 13.5017 12.8159 13.4208L9.58085 10.1725L6.33419 13.4075C6.25252 13.4892 6.14586 13.5292 6.03919 13.5292C5.93252 13.5292 5.82669 13.4883 5.74502 13.4075C5.58252 13.2442 5.58252 12.98 5.74586 12.8183L8.99335 9.58333L5.75836 6.335C5.59586 6.17167 5.59669 5.90833 5.76002 5.74667C5.92252 5.5825 6.18669 5.58333 6.34919 5.7475L9.58335 8.995L12.83 5.76083C12.9925 5.59833 13.2575 5.59833 13.4192 5.76167C13.5817 5.92417 13.5817 6.18833 13.4184 6.35083L10.1717 9.58583L13.4067 12.8317Z"
                            fill="#0067C5"
                        />
                    </svg>
                    <span className="flatpickr-clear__text">Fjern dato</span>
                </button>
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
