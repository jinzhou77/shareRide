import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Driver from './components/Driver/Driver.jsx';
import Passenger from './components/Passenger/Passenger.jsx';
import About from './components/About/About.jsx'
import styles from './styles/main.scss';

ReactDom.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/Driver" component={Driver}/>
            <Route exact path="/Passenger" component={Passenger}/>
        </Switch>
    </Router>,
    document.getElementById('react-app')
);
