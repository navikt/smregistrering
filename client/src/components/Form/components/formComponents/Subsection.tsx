import './Subsection.less';

import React from 'react';

import FormLabel from './FormLabel';

type Subsection = {
    sectionIdentifier: string;
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    underline?: boolean;
};

const Subsection = ({ sectionIdentifier, children, underline = true }: Subsection) => {
    return (
        <section className="subsection">
            <FormLabel label={sectionIdentifier} />
            {children}
            {underline && <hr className="subsection-hr" />}
        </section>
    );
};

export default Subsection;
