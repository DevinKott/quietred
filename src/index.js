import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QuietRed from './QuietRed';
import * as serviceWorker from './serviceWorker';

// Render the QuietRed application in place of the root div.
ReactDOM.render(<QuietRed />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
