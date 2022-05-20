import React from 'react';

import Divider from './Divider';
import FormLabel from './FormLabel';

interface SubsectionProps {
    sectionIdentifier: string;
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    underline?: boolean;
}

const Subsection = ({ sectionIdentifier, children, underline = true }: SubsectionProps) => {
    return (
        <section className="subsection">
            <>
                <FormLabel label={sectionIdentifier} />
                {children}
                {underline && <Divider />}
            </>
        </section>
    );
};

export default Subsection;
