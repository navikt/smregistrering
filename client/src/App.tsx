import './App.less';

import React from 'react';

import Form from './components/Form/Form';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';

const App = () => {
    return (
        <>
            <Navbar />
            <div className="content-container">
                <div className="menu-container">
                    <Menu />
                </div>
                <div className="form-container">
                    <Form />
                </div>
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
