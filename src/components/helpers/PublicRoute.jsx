import React             from 'react';
import {Redirect, Route} from 'react-router-dom'

export const PublicRoute = ({component: Component, auth, ...rest}) => (
    <Route {...rest} render={props => (
        auth
            ? <Redirect to={{pathname: '/dashboard', state: {from: props.location}}}/>
            : <Component {...props} {...rest} />

    )}/>
);