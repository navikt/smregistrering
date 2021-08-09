import './SearchableInput.less';

import React from 'react';
import Select, { MenuListComponentProps, StylesConfig, ValueType, createFilter } from 'react-select';
import { FixedSizeList } from 'react-window';

import { Diagnose } from '../../../../types/sykmelding/MedisinskVurdering';
import { Diagnosekoder } from '../../../../types/diagnosekoder/Diagnosekoder';

type OptionObject = { value: string; label: string; text: string };
type OptionValueType = ValueType<OptionObject, false>;

const HEIGHT = 35;

const MenuList = ({ options, children, maxHeight, getValue }: MenuListComponentProps<OptionObject, false>) => {
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
const customStyles: StylesConfig<OptionObject, false> = {
    control: (base) => ({
        ...base,
        border: '1px solid #78706a',
        minHeight: '39px',
    }),
    indicatorSeparator: (base) => ({ ...base, display: 'none' }),
    dropdownIndicator: (base) => ({ ...base, color: '#3E3832' }),
    placeholder: (base) => ({
        ...base,
        color: 'black',
        fontSize: '1rem',
        lineHeight: '1.375rem',
        fontFamily: `'Source Sans Pro', Arial, sans-serif`,
    }),
};

type SearchableInputProps = {
    id: string;
    system?: string;
    diagnosekoder: Diagnosekoder;
    label: JSX.Element;
    onChange: (code: string, text: string) => void;
    value?: Partial<Diagnose>;
};

const SearchableInput = ({ id, system, diagnosekoder, label, onChange, value }: SearchableInputProps) => {
    const handleChange = (selectedOption: OptionValueType | OptionValueType[] | null | void) => {
        if (!selectedOption) {
            onChange('', '');
            return;
        }

        if (selectedOption as OptionValueType) {
            const singleValue = selectedOption as OptionValueType;
            if ((singleValue as OptionObject).value) {
                const { value, text } = singleValue as OptionObject;
                onChange(value, text); // Update form
            }
        }
    };

    const diagnoses = system ? diagnosekoder[system as keyof Diagnosekoder] : [];
    const diagnoseOptions = diagnoses.map((diagnose) => ({
        value: diagnose.code,
        label: diagnose.code,
        text: diagnose.text,
    }));

    const selectValue = value?.kode && value.tekst ? { value: value.kode, label: value.kode, text: value.tekst } : null;

    return (
        <>
            <label className="skjemaelement__label" htmlFor={id}>
                {label}
            </label>
            <Select
                inputId={id}
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
