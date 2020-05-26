import './Flatpickr.less';
import './datepicker-extended.less';

import Flatpickr from 'react-flatpickr';
import React from 'react';
import { Element } from 'nav-frontend-typografi';

import calendar from '../../../../svg/calendar.svg';
import { flatpickrLocale } from './flatpickrUtils';

type DatePickerProps = {
    label: string;
    value: Date | undefined;
    onChange: (newDate: Date) => void;
    feil?: string;
};

const DatePicker = ({ label, value, onChange, feil }: DatePickerProps) => {
    return (
        <div role="region" aria-label="datovelgerbeholder" className="datepicker-container">
            <label className="datepicker-label">
                <Element>{label}</Element>
            </label>
            <div role="region" aria-label="datovelger" className={`flatpickr-container`}>
                <Flatpickr
                    value={value}
                    className={`typo-normal flatpickr flatpickr-input ${feil ? 'flatpickr-input--feil' : ''}`}
                    placeholder="DD.MM.ÅÅÅÅ"
                    onChange={newDate => onChange(newDate[0])}
                    options={{
                        position: 'below',
                        mode: 'single',
                        enableTime: false,
                        dateFormat: 'd.m.Y',
                        allowInput: true,
                        locale: flatpickrLocale,
                    }}
                />
                <img className="flatpickr-icon" aria-hidden="true" alt="Kalender" src={calendar} />
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
