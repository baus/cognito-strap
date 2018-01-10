import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

registerServiceWorker();


ReactDOM.render(<App/>, document.getElementById('root'));
