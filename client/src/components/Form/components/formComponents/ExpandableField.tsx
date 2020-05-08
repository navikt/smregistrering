import './ExpandableField.less';

import React, { ReactChild, ReactChildren, ReactNode } from 'react';

interface ExpandableFieldProps {
    show?: boolean;
    children: ReactNode | ReactChild | ReactChildren;
}

const ExpandableField = ({ show = false, children }: ExpandableFieldProps) => {
    return <div className={`expandable ${show ? 'expanded' : ''}`}>{children}</div>;
};

export default ExpandableField;
