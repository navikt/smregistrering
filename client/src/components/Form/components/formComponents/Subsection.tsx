import React from 'react';
import { Element } from 'nav-frontend-typografi';

type Subsection = {
    sectionIdentifier: string;
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    underline?: boolean;
};

const Subsection = ({ sectionIdentifier, children, underline = true }: Subsection) => {
    return (
        <div className="subsection">
            <Element className="form-margin-bottom">{sectionIdentifier}</Element>
            {children}
            {underline && <hr />}
        </div>
    );
};

export default Subsection;
