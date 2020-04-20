import './SearchableInput.less';

import React, { useEffect, useState } from 'react';
import { Input } from 'nav-frontend-skjema';

import { DiagnoseField, MedisinskVurderingField } from '../formSections/DiagnoseSection';
import { Diagnosekoder } from '../../../../types/Diagnosekode';
import { SchemaType } from '../../Form';

type SearchableInputProps = {
    system?: keyof Diagnosekoder;
    diagnosekoder: Diagnosekoder;
    label: JSX.Element;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    value: string | undefined;
};

const MAXIMUM_VISIBLE_CODES = 5;

const SearchableInput = ({ system, diagnosekoder, label, setSchema, value }: SearchableInputProps) => {
    const [input, setInput] = useState<string | undefined>(undefined);

    useEffect(() => {
        setInput(undefined);
    }, [system]);

    useEffect(() => {
        setInput(undefined);
    }, [value]);

    if (!system) {
        return <Input value="" disabled label={label} />;
    }

    const diagnoses = diagnosekoder[system];

    const results = input
        ? diagnoses.filter(diagnosis => diagnosis.code.toLocaleLowerCase().startsWith(input.toLocaleLowerCase()))
        : [];

    const visibleResults = results.length > MAXIMUM_VISIBLE_CODES ? results.slice(0, MAXIMUM_VISIBLE_CODES) : results;

    // If "input" is undefined, user has either selected a value or the value is undefined. When the user types,
    // we switch the displayed value to show the search input.
    return (
        <div className="search-container">
            <Input value={input || value} onChange={e => setInput(e.target.value)} label={label} />
            {input !== undefined && (
                <div className="search-result-container">
                    {visibleResults.map(result => (
                        <div
                            className="search-result"
                            onClick={() =>
                                setSchema(state => ({
                                    ...state,
                                    [MedisinskVurderingField.HOVEDDIAGNOSE]: {
                                        ...state[MedisinskVurderingField.HOVEDDIAGNOSE],
                                        [DiagnoseField.KODE]: result.code,
                                        [DiagnoseField.TEKST]: result.text,
                                    },
                                }))
                            }
                            key={result.code}
                        >
                            {result.code}
                        </div>
                    ))}
                    {visibleResults.length < results.length && (
                        <div className="search-result-more">...og {results.length - MAXIMUM_VISIBLE_CODES} fler.</div>
                    )}
                    {visibleResults.length === 0 && <div className="search-result-more">Ingen resultat.</div>}
                </div>
            )}
        </div>
    );
};

export default SearchableInput;
