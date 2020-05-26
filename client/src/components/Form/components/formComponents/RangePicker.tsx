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
    feil?: string;
};

const RangePicker = ({ labelFrom, labelTo, value, onChange, feil }: RangePickerProps) => {
    return (
        <div role="region" aria-label="periodevelgerbeholder" className="rangepicker-container">
            <label className="rangepicker-label">
                <Element>{labelFrom}</Element>
                <Element className="rangepicker-to">{labelTo}</Element>
            </label>
            <div role="region" aria-label="periodevelger" className="flatpickr-container">
                <Flatpickr
                    value={value}
                    className={`typo-normal flatpickr flatpickr-input ${feil ? 'flatpickr-input--feil' : ''}`}
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

export default RangePicker;
