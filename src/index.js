import React from 'react';
import ReactDOM from 'react-dom';
import UserInfoSearch from './components/UserInfoSearch';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';

ReactDOM.render(
    <Router>
        <Route path="/" component={UserInfoSearch} />
    </Router>,
    document.getElementById('root')
);
