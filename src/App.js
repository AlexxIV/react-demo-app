import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";
import {Header} from "./components/common/Header";

import './components/helpers/Icons';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            loggedIn: false,
        }
    }

    render() {
        return (
            <div className="App container">
                <Header/>
                <Route exact path="/" render={(props) => <div>Home</div>} />
                <Route path="/register" render={(props) => <div>Register</div>} />
                <Route path="/login" render={(props) => <div>Login</div>} />
            </div>
        );
    }
}

export default App;
