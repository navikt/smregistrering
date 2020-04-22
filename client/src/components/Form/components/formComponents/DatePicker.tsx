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
};

const DatePicker = ({ label, value, onChange }: DatePickerProps) => {
    return (
        <div className="datepicker-container">
            <div className="datepicker-label">
                <Element>{label}</Element>
            </div>
            <div className="flatpickr-container">
                <Flatpickr
                    value={value}
                    className="typo-normal flatpickr"
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
                <span className="flatpickr-icon">
                    <img aria-hidden="true" alt="Kalender" src={calendar} />
                </span>
            </div>
        </div>
    );
};

export default DatePicker;