import './Flatpickr.less';
import './datepicker-extended.less';

import Flatpickr from 'react-flatpickr';
import React from 'react';
import { Element } from 'nav-frontend-typografi';

import InputError from './InputError';
import calendar from '../../../../svg/calendar.svg';
import { flatpickrLocale } from './flatpickrUtils';

type DatePickerProps = {
    label: string;
    value: Date | undefined;
    onChange: (newDate?: Date) => void;
    feil?: string;
};

const DatePicker = ({ label, value, onChange, feil }: DatePickerProps) => {
    console.log(value);
    return (
        <>
            <div className="datepicker-container">
                <div className="datepicker-label">
                    <Element>{label}</Element>
                </div>
                <div className="flatpickr-container">
                    <Flatpickr
                        value={value}
                        className={`typo-normal flatpickr${feil ? '-error' : ''}`}
                        placeholder="DD.MM.ÅÅÅÅ"
                        onChange={newDate => onChange(newDate[0])}
                        options={{
                            position: 'below',
                            mode: 'single',
                            enableTime: false,
                            dateFormat: 'd.m.Y',
                            allowInput: true,
                            locale: flatpickrLocale,
                            // Updates the date when the user closes the date picker. This is useful if the user
                            // attempts to use keyboard input to change or clear the input.
                            onClose(_dates, _currentdatestring, picker) {
                                if (picker.input.value === '') {
                                    onChange(undefined);
                                } else {
                                    onChange(new Date(picker.input.value));
                                }
                            },
                        }}
                    />
                    <span className="flatpickr-icon">
                        <img aria-hidden="true" alt="Kalender" src={calendar} />
                    </span>
                </div>
            </div>
            <InputError feil={feil} />
        </>
    );
};

export default DatePicker;
