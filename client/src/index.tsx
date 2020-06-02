import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test' ||
    process.env.REACT_APP_GCP_LABS === 'true'
) {
    require('./mock/mockSetup');
}

ReactDOM.render(<App />, document.getElementById('root'));
