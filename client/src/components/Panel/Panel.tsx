import './Panel.less';

import React from 'react';

type PanelProps = {
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    role?: string;
    ariaLabel?: string;
    className?: string;
};

const Panel = ({ children, role, ariaLabel, className }: PanelProps) => {
    return (
        <div role={role} aria-label={ariaLabel} className={`panel ${className ? className : ''}`}>
            {children}
        </div>
    );
};

export default Panel;
