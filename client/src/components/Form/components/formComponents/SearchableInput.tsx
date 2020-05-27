import './SearchableInput.less';

import React, { CSSProperties, useEffect, useState } from 'react';
import Select, { MenuListComponentProps, ValueType, createFilter } from 'react-select';
import { FixedSizeList } from 'react-window';

import { Diagnose } from '../../../../types/RegistrertSykmelding';
import { Diagnosekoder } from '../../../../types/Diagnosekode';

type OptionObject = { value: string; label: string; text: string };
type OptionValueType = ValueType<OptionObject>;

const HEIGHT = 35;

const MenuList = ({ options, children, maxHeight, getValue }: MenuListComponentProps<OptionObject>) => {
    // TODO: Re-write this so it doesn't require ts-ignore
    // @ts-ignore Works, but TypeScript doesn't like it
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * HEIGHT;
    const childrenOptions = React.Children.toArray(children);

    if (!children) {
        return null;
    }

    const listHeight = childrenOptions.length * HEIGHT;

    return (
        <FixedSizeList
            width={'100%'}
            height={listHeight < maxHeight ? listHeight : maxHeight}
            itemCount={childrenOptions.length}
            itemSize={HEIGHT}
            initialScrollOffset={initialOffset}
        >
            {({ index, style }) => <div style={style}>{childrenOptions[index]}</div>}
        </FixedSizeList>
    );
};

// Custom styles to mimic the NAV Input style
const customStyles = {
    control: (provided: CSSProperties) => ({
        ...provided,
        border: '1px solid #78706a',
        minHeight: '39px',
    }),
    indicatorSeparator: (provided: CSSProperties) => ({ ...provided, display: 'none' }),
    dropdownIndicator: (provided: CSSProperties) => ({ ...provided, color: '#3E3832' }),
    placeholder: (provided: CSSProperties) => ({
        ...provided,
        color: 'black',
        fontSize: '1rem',
        lineHeight: '1.375rem',
        fontFamily: `'Source Sans Pro', Arial, sans-serif`,
    }),
};

type SearchableInputProps = {
    system?: string;
    diagnosekoder: Diagnosekoder;
    label: JSX.Element;
    onChange: (code: string, text: string) => void;
    value?: Diagnose;
};

const SearchableInput = ({ system, diagnosekoder, label, onChange }: SearchableInputProps) => {
    // Internal value state, so we don't have to store a ValueState in the form data
    const [selectValue, setSelectValue] = useState<OptionValueType>(null);

    useEffect(() => {
        // Reset selected value on system change
        setSelectValue(null);
    }, [system]);

    const handleChange = (selectedOption: OptionValueType | OptionValueType[] | null | void) => {
        if (!selectedOption) {
            setSelectValue(null);
            onChange('', '');
            return;
        }

        if (selectedOption as OptionValueType) {
            const singleValue = selectedOption as OptionValueType;
            if ((singleValue as OptionObject).value) {
                const { value, text } = singleValue as OptionObject;
                setSelectValue(singleValue); // Update internal state
                onChange(value, text); // Update form
            }
        }
    };

    const diagnoses = system ? diagnosekoder[system as keyof Diagnosekoder] : [];
    const diagnoseOptions = diagnoses.map(diagnose => ({
        value: diagnose.code,
        label: diagnose.code,
        text: diagnose.text,
    }));

    return (
        <>
            <label className="skjemaelement__label">{label}</label>
            <Select
                value={selectValue}
                styles={customStyles}
                isDisabled={!system}
                onChange={handleChange}
                placeholder={!system ? '-' : 'Velg diagnosekode'}
                isClearable
                filterOption={createFilter({ ignoreAccents: false })} // Performance optimization
                components={{ MenuList }}
                options={diagnoseOptions}
            />
        </>
    );
};

export default SearchableInput;
