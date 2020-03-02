import './Flatpickr.less';
import './datepicker-extended.less';

import Flatpickr from 'react-flatpickr';
import React from 'react';
import { Element } from 'nav-frontend-typografi';

import calendar from '../../../../svg/calendar.svg';
import { flatpickrLocale } from './flatpickrUtils';

type RangePickerProps = {
    labelFrom: string;
    labelTo: string;
    value: Date[];
    onChange: (newDates: Date[]) => void;
};

const RangePicker = ({ labelFrom, labelTo, value, onChange }: RangePickerProps) => {
    return (
        <div className="rangepicker-container">
            <div className="rangepicker-label">
                <Element>{labelFrom}</Element>
                <Element className="rangepicker-to">{labelTo}</Element>
            </div>
            <div className="flatpickr-container">
                <Flatpickr
                    value={value}
                    className="typo-normal flatpickr"
                    placeholder="DD.MM.ÅÅÅÅ - DD.MM.ÅÅÅÅ"
                    onChange={nyeDatoer => onChange(nyeDatoer)}
                    options={{
                        position: 'below',
                        mode: 'range',
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

export default RangePicker;
