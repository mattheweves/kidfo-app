import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';



ReactDOM.render(<Welcome />, document.getElementById('root'));

registerServiceWorker();
