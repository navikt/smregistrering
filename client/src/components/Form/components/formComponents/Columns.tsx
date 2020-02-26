import './Columns.less';

import React from 'react';

type ColumnsProps = {
    children: JSX.Element[];
};

const Columns = ({ children }: ColumnsProps) => {
    return <div className="columns">{children}</div>;
};

export default Columns;
