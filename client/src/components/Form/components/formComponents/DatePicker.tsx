import './Flatpickr.less';
import './datepicker-extended.less';

import Flatpickr from 'react-flatpickr';
import React from 'react';
import dayjs from 'dayjs';
import { Normaltekst } from 'nav-frontend-typografi';

import ClearButton from './ClearButton';
import calendar from '../../../../svg/calendar.svg';
import { flatpickrLocale } from './flatpickrUtils';

type DatePickerProps = {
    id: string;
    label: string;
    value: string | undefined;
    onChange: (newDate: string | undefined) => void;
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
                    value={value ? new Date(value) : undefined} // Does not like to receive date as string
                    className={`typo-normal flatpickr flatpickr-input ${feil ? 'flatpickr-input--feil' : ''}`}
                    placeholder="DDMMÅÅ"
                    onChange={(newDate) => onChange(dayjs(newDate[0]).format('YYYY-MM-DD'))}
                    options={{
                        position: 'below',
                        static: true,
                        mode: 'single',
                        enableTime: false,
                        dateFormat: 'dmy',
                        allowInput: true,
                        locale: flatpickrLocale,
                    }}
                />
                <img className="flatpickr-icon" aria-hidden="true" alt="Kalender" src={calendar} />

                <ClearButton
                    leftSpacing
                    iconType="CircledCross"
                    onChange={(event) => {
                        event.preventDefault();
                        onChange(undefined);
                    }}
                    buttonText="Fjern dato"
                />
            </div>
            {!!value && (
                <Normaltekst style={{ marginTop: '-0.5rem', marginBottom: '1rem' }}>
                    {dayjs(value).format('D. MMMM YYYY')}
                </Normaltekst>
            )}
            {feil && (
                <div className="skjemaelement__feilmelding">
                    <p className="typo-feilmelding">{feil}</p>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
