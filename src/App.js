import React, {Component}           from 'react';
import {Redirect, Route, Switch}    from "react-router-dom";

import {Login}                       from "./components/user/Login";
import {Register2}                     from "./components/user/Register2";

import {Header}                     from "./components/common/Header";
import {Footer}                     from "./components/common/Footer";
import {Dashboard}                  from "./components/Dashboard";
import {Logout}                     from "./components/user/Logout";

import {PublicRoute}                from "./components/helpers/PublicRoute";
import {PrivateRoute}               from "./components/helpers/PrivateRoute";

import userActions                  from "./utilities/user/user-actions";
import './components/helpers/Icons';


import './assets/styles/App.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            loggedIn: false,
        }
    }

    componentDidMount() {
        let token = userActions.getUserToken();

        if (token) {
            this.setState({
                user: token,
                loggedIn: true,
            })
        }
    }

    updateUserState = (user) => {
        if (user) {
            this.setState({
                user: user,
                loggedIn: true
            })
        } else {
            this.setState({
                user: {},
                loggedIn: false
            })
        }
    };

    logout = () => {
        userActions.clearUserToken();
        this.updateUserState();
    };

    render() {
        return (
            <div className="App container main-content">
                <Header {...this.state} />
                <div className="row">
                    <Switch>
                        <PublicRoute path='/register' auth={this.state.loggedIn} component={Register2}/>
                        <PublicRoute path='/login' auth={this.state.loggedIn} component={Login}
                                     updateUserState={this.updateUserState}/>

                        <PrivateRoute path="/dashboard" auth={this.state.loggedIn} component={Dashboard} {...this.state}/>
                        <PrivateRoute path='/logout' auth={this.state.loggedIn} component={Logout} logout={this.logout}/>
                        <Route path='/'>
                            <Redirect to='/dashboard'/>
                        </Route>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;



