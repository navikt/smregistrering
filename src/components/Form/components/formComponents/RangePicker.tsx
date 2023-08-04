import Flatpickr from 'react-flatpickr'
import React from 'react'
import { Normaltekst } from 'nav-frontend-typografi'

import calendar from '../../../../svg/calendar.svg'
import { formatDate, toDateString } from '../../../../utils/dateUtils'

import ClearButton from './ClearButton'
import { flatpickrLocale } from './flatpickrUtils'

type RangePickerProps = {
    id?: string
    labelFrom: string
    labelTo: string
    value: string[]
    onChange: (newDates: string[] | undefined) => void
    feil?: string
}

const RangePicker = ({ id, labelFrom, labelTo, value, onChange, feil }: RangePickerProps) => {
    return (
        <div role="region" aria-label="periodevelgerbeholder" className="rangepicker-container">
            <label className="rangepicker-label" htmlFor={id}>
                {labelFrom} - {labelTo}
            </label>
            <div role="region" aria-label="periodevelger" className="flatpickr-container">
                <Flatpickr
                    id={id}
                    value={value.length === 2 ? [new Date(value[0]), new Date(value[1])] : value} // Does not like to receive dates as string[]
                    className={`typo-normal flatpickr flatpickr-input ${feil ? 'flatpickr-input--feil' : ''}`}
                    placeholder="DDMMÅÅ-DDMMÅÅ"
                    onClose={(selectedDates) => {
                        if (selectedDates.length === 0) {
                            onChange(undefined)
                        } else if (selectedDates.length === 1) {
                            onChange([toDateString(selectedDates[0]), toDateString(selectedDates[0])])
                        } else {
                            onChange([toDateString(selectedDates[0]), toDateString(selectedDates[1])])
                        }
                    }}
                    options={{
                        position: 'below',
                        static: true,
                        mode: 'range',
                        enableTime: false,
                        dateFormat: 'dmy',
                        allowInput: true,
                        locale: flatpickrLocale,
                    }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="flatpickr-icon" aria-hidden="true" alt="Kalender" src={calendar.src} />

                <ClearButton
                    leftSpacing
                    iconType="CircledCross"
                    onChange={(event) => {
                        event.preventDefault()
                        onChange(undefined)
                    }}
                    buttonText="Fjern dato"
                />
            </div>
            {!!value && value.length === 2 && (
                <Normaltekst style={{ marginTop: '-0.5rem', marginBottom: '1rem' }}>
                    {formatDate(value[0])} - {formatDate(value[1])}
                </Normaltekst>
            )}
            {feil && (
                <div className="skjemaelement__feilmelding">
                    <p className="typo-feilmelding">{feil}</p>
                </div>
            )}
        </div>
    )
}

export default RangePicker
