import React, { PropsWithChildren, useEffect, useRef } from 'react'

interface ExpandableFieldProps {
    show?: boolean
}

const ExpandableField = ({ show = false, children }: PropsWithChildren<ExpandableFieldProps>) => {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (show) {
            contentRef.current?.focus()
        }
    }, [show])

    if (show === false) {
        return null
    }

    return <div ref={contentRef}>{children}</div>
}

export default ExpandableField
