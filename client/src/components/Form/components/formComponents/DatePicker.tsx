import './Flatpickr.less';
import './Flatpickr-extended.less';

import Flatpickr from 'react-flatpickr';
import React from 'react';

import calendar from '../../../../svg/calendar.svg';
import { flatpickrLocale } from './flatpickrUtils';

const DatePicker = () => {
    return (
        <div className="flatpickr-container">
            <Flatpickr
                value={new Date()}
                className="typo-normal flatpickr"
                placeholder="placeholder tekst"
                onChange={nyeDatoer => console.log(nyeDatoer)}
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
    );
};

export default DatePicker;
