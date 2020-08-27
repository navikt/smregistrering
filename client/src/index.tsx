import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

if (process.env.REACT_APP_START_WITH_MOCK === 'true') {
    require('./mock/setup');
}

ReactDOM.render(<App />, document.getElementById('root'));
