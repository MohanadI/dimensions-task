import React, { Component } from 'react';
import './assets/App.css';

import {
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap';

import Sidebar from './Sidebar/Sidebar';
import Home from './components/Home';
import FormComponent from './components/Form';
class DashApp extends Component {
    render() {
        return (
            <div className="App">
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Demo App</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/form">Form</Link>
                        </NavItem>
                    </Nav>
                </Navbar>
                <div className="sidebar-area">
                    <Sidebar />
                </div>
                <div className="content-area">
                    <Switch>
                        <Route exact path="/"  component={Home} />
                        <Route path="/form" component={FormComponent} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default DashApp;