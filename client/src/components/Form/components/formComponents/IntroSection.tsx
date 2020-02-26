import './IntroSection.less';

import React from 'react';

type IntroSectionProps = {
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
};

const IntroSection = ({ children }: IntroSectionProps) => {
    return <div className="intro-section">{children}</div>;
};

export default IntroSection;
