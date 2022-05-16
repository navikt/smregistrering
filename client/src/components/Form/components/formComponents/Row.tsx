import './Rows.css';

import React from 'react';

type RowElementProps = {
    children: React.ReactNode;
};

const RowElement = ({ children }: RowElementProps) => {
    return <span className="row-element">{children}</span>;
};

type RowProps = {
    children: React.ReactNode[];
};

const Row = ({ children }: RowProps) => {
    return (
        <div className="row">
            {children.map((child, index) => (
                <RowElement key={index.toString()}>{child}</RowElement>
            ))}
        </div>
    );
};

export default Row;
