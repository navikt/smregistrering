import React, { PropsWithChildren } from 'react'

type PanelProps = {
    ariaLabel?: string
    className?: string
}

const Panel = ({ children, ariaLabel, className }: PropsWithChildren<PanelProps>) => {
    return (
        <div role="region" aria-label={ariaLabel} className={`panel ${className ? className : ''}`}>
            {children}
        </div>
    )
}

export default Panel
