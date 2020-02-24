import './App.less';

import React from 'react';

import Navbar from './components/Navbar/Navbar';

const App = () => {
    return (
        <>
            <Navbar />
            <div className="content-container">
                <div className="menu">menu</div>
                <div className="form">form</div>
                <div className="pdf-container">
                    <object
                        width="100%"
                        height="100%"
                        type="application/pdf"
                        data="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    >
                        Visning av sykmelding-pdf krever en plugin
                    </object>
                </div>
            </div>
        </>
    );
};

export default App;
