import './Columns.less';

import React from 'react';

type ColumnProps = {
    children?: React.ReactNode | React.ReactChild | React.ReactChildren;
};

const Column = ({ children }: ColumnProps) => {
    return <div className="column">{children}</div>;
};

export default Column;
