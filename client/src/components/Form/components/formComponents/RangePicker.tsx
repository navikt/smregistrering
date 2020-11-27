import './Flatpickr.less';
import './datepicker-extended.less';

import Flatpickr from 'react-flatpickr';
import React from 'react';

import ClearButton from './ClearButton';
import calendar from '../../../../svg/calendar.svg';
import { flatpickrLocale } from './flatpickrUtils';

type RangePickerProps = {
    id?: string;
    labelFrom: string;
    labelTo: string;
    value: Date[];
    onChange: (newDates: Date[] | undefined) => void;
    feil?: string;
};

const RangePicker = ({ id, labelFrom, labelTo, value, onChange, feil }: RangePickerProps) => {
    return (
        <div role="region" aria-label="periodevelgerbeholder" className="rangepicker-container">
            <label className="rangepicker-label" htmlFor={id}>
                {labelFrom} - {labelTo}
            </label>
            <div role="region" aria-label="periodevelger" className="flatpickr-container">
                <Flatpickr
                    id={id}
                    value={value}
                    className={`typo-normal flatpickr flatpickr-input ${feil ? 'flatpickr-input--feil' : ''}`}
                    placeholder="DD.MM.ÅÅÅÅ - DD.MM.ÅÅÅÅ"
                    onClose={(selectedDates) => {
                        if (selectedDates.length === 0) {
                            onChange(undefined);
                        } else if (selectedDates.length === 1) {
                            onChange([selectedDates[0], selectedDates[0]]);
                        } else {
                            onChange(selectedDates);
                        }
                    }}
                    options={{
                        position: 'below',
                        static: true,
                        mode: 'range',
                        enableTime: false,
                        dateFormat: 'd.m.Y',
                        allowInput: true,
                        locale: flatpickrLocale,
                    }}
                />
                <img className="flatpickr-icon" aria-hidden="true" alt="Kalender" src={calendar} />

                <ClearButton
                    onChange={(event) => {
                        event.preventDefault();
                        onChange(undefined);
                    }}
                    buttonText="Fjern dato"
                />
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
