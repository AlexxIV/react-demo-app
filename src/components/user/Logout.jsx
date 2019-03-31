import React      from 'react';
import {Redirect} from 'react-router-dom'

export const Logout = ({ logout }) => {
    logout();
    return (
        <Redirect to='/'/>
    )
};