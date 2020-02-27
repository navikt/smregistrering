import './Rows.less';

import React from 'react';

type RowElementProps = {
    children: JSX.Element;
};

const RowElement = ({ children }: RowElementProps) => {
    return <div className="row-element">{children}</div>;
};

type RowProps = {
    children: JSX.Element[];
};

const Row = ({ children }: RowProps) => {
    return (
        <div className="row">
            {children.map(child => (
                <RowElement>{child}</RowElement>
            ))}
        </div>
    );
};

export default Row;
