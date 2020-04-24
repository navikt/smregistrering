import './SearchableInput.less';

import React, { CSSProperties, ReactNode } from 'react';
import Select, { MenuListComponentProps, ValueType, createFilter } from 'react-select';
import { FixedSizeList } from 'react-window';

import { Diagnosekoder } from '../../../../types/Diagnosekode';

const HEIGHT = 35;

const MenuList = ({
    options,
    children,
    maxHeight,
    getValue,
}: MenuListComponentProps<{ value: string; label: string; text: string }>) => {
    // @ts-ignore Works, but TypeScript doesn't like it
    const [value]: ValueType<{ value: string; label: string; text: string }> = getValue();
    const initialOffset: number = options.indexOf(value) * HEIGHT;
    const childrenOptions: ReactNode[] = React.Children.toArray(children);

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

type SearchableInputProps = {
    system?: keyof Diagnosekoder;
    diagnosekoder: Diagnosekoder;
    label: JSX.Element;
    onChange: (code?: string, text?: string) => void;
    value: string | undefined;
};

const customStyles = {
    control: (provided: CSSProperties) => ({
        ...provided,
        border: '1px solid #78706a',
    }),
    indicatorSeparator: (provided: CSSProperties) => ({ ...provided, backgroundColor: '#78706a' }),
    dropdownIndicator: (provided: CSSProperties) => ({ ...provided, color: '#78706a' }),
};

const SearchableInput = ({ system, diagnosekoder, label, onChange, value }: SearchableInputProps) => {
    if (!system) {
        return <Select isDisabled options={[]} />;
    }

    const handleChange = (
        selectedOption:
            | ValueType<{ value: string; label: string; text: string }>
            | ValueType<{ value: string; label: string; text: string }>[]
            | null
            | void,
    ) => {
        if (!selectedOption) {
            console.log('undefined, clear value', selectedOption);
            return;
        }

        if (selectedOption as ValueType<{ value: string; label: string; text: string }>) {
            const singleValue = selectedOption as ValueType<{ value: string; label: string; text: string }>;
            if (singleValue as { value: string; label: string; text: string }) {
                const x = (singleValue as { value: string; label: string; text: string }).value;
                console.log(x, 'returnvalue');
            } else {
                console.log('option type generic');
            }

            console.log('single type', singleValue);
            return;
        }

        if (selectedOption as ValueType<{ value: string; label: string; text: string }>[]) {
            console.log('array type', selectedOption);
            return;
        }

        console.log('something went terribly wrong');
    };

    const diagnoses = diagnosekoder[system];
    const diagnoseOptions = diagnoses.map(diagnose => ({
        value: diagnose.code,
        label: diagnose.code,
        text: diagnose.text,
    }));

    return (
        <Select
            styles={customStyles}
            onChange={handleChange}
            placeholder="Velg diagnosekode"
            isClearable
            filterOption={createFilter({ ignoreAccents: false })} // Performance optimization
            components={{ MenuList }}
            options={diagnoseOptions}
        />
    );
};

export default SearchableInput;
