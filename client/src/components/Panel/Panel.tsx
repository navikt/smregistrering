import './Panel.less';

import React from 'react';

type PanelProps = {
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    ariaLabel?: string;
    className?: string;
};

const Panel = ({ children, ariaLabel, className }: PanelProps) => {
    return (
        <div role="region" aria-label={ariaLabel} className={`panel ${className ? className : ''}`}>
            {children}
        </div>
    );
};

export default Panel;
