import './Flatpickr.less';
import './datepicker-extended.less';

import Flatpickr from 'react-flatpickr';
import React from 'react';
import { Element } from 'nav-frontend-typografi';

import calendar from '../../../../svg/calendar.svg';
import { flatpickrLocale } from './flatpickrUtils';

type DatePickerProps = {
    id?: string;
    label: string;
    value: Date | undefined;
    onChange: (newDate: Date) => void;
    feil?: string;
};

const DatePicker = ({ id, label, value, onChange, feil }: DatePickerProps) => {
    return (
        <div className="datepicker-container">
            <div className="datepicker-label">
                <Element>{label}</Element>
            </div>
            <div className={`flatpickr-container`}>
                <Flatpickr
                    id={id}
                    value={value}
                    className={`typo-normal flatpickr flatpickr-input ${feil ? 'flatpickr-input--feil' : ''}`}
                    placeholder="DD.MM.ÅÅÅÅ"
                    onChange={newDate => onChange(newDate[0])}
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
                <span className="flatpickr-icon">
                    <img aria-hidden="true" alt="Kalender" src={calendar} />
                </span>
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
