import './InputError.less';

import React from 'react';

const InputError = ({ feil }: { feil?: string }) => {
    if (!feil) {
        return null;
    }

    return <div className="inputerror">{feil}</div>;
};

export default InputError;
