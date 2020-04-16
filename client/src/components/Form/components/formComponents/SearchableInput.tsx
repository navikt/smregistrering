import './SearchableInput.less';

import React, { useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import { Diagnosekoder } from '../../../../types/Diagnosekode';

type SearchableInputProps = {
    system: keyof Diagnosekoder;
    diagnosekoder: Diagnosekoder;
    label: JSX.Element;
};

const SearchableInput = ({ system, diagnosekoder, label }: SearchableInputProps) => {
    const [input, setInput] = useState<string>('a');

    console.log(system);

    const diagnoses = diagnosekoder[system];

    const results = diagnoses.filter(diagnosis =>
        diagnosis.code.toLocaleLowerCase().startsWith(input.toLocaleLowerCase()),
    );

    const MAXIMUM_VISIBLE_CODES = 5;

    const visibleResults = results.length > MAXIMUM_VISIBLE_CODES ? results.slice(0, MAXIMUM_VISIBLE_CODES) : results;

    console.log(results);
    console.log(visibleResults);

    return (
        <div className="search-container">
            <Input value={input} onChange={e => setInput(e.target.value)} label={label} />
            {input !== '' && (
                <div className="search-result-container">
                    {visibleResults.map(result => (
                        <div className="search-result" onClick={() => console.log(result.code)} key={result.code}>
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
