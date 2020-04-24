import React, { useState } from 'react';
import { Element } from 'nav-frontend-typografi';

import SearchableInput from './components/Form/components/formComponents/SearchableInput';
import { Diagnosekoder } from './types/Diagnosekode';

type SearchableProps = {
    diagnosekoder: Diagnosekoder;
};

const Searchable = ({ diagnosekoder }: SearchableProps) => {
    const [code, setCode] = useState<string | undefined>(undefined);
    const system = 'icd10';

    console.log(code);

    return (
        <div style={{ marginTop: '5rem', marginBottom: '5rem', padding: '5rem' }}>
            {code}
            <SearchableInput
                value={code}
                system={system}
                diagnosekoder={diagnosekoder}
                label={<Element>3.1.2 Kode</Element>}
                onChange={(kode?: string, tekst?: string) => setCode(kode)}
            />
        </div>
    );
};

export default Searchable;
