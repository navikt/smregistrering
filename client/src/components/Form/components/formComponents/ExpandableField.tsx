import React, { ReactChild, ReactChildren, ReactNode, useEffect, useRef } from 'react';

interface ExpandableFieldProps {
    show?: boolean;
    children: ReactNode | ReactChild | ReactChildren;
}

const ExpandableField = ({ show = false, children }: ExpandableFieldProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (show) {
            contentRef.current?.focus();
        }
    }, [show]);

    if (show === false) {
        return null;
    }

    return <div ref={contentRef}>{children}</div>;
};

export default ExpandableField;
