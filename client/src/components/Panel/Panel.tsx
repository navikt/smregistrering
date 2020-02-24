import './Panel.less';

import React from 'react';

type PanelProps = {
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    className?: string;
};

const Panel = ({ children, className }: PanelProps) => {
    return <div className={`panel ${className}`}>{children}</div>;
};

export default Panel;
