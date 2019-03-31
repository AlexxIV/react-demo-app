import React             from 'react';
import {Redirect, Route} from 'react-router-dom';

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={props => (
        auth
            ? <Component {...props} {...rest} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);