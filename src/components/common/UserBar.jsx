import React     from 'react';
import {NavLink} from "react-router-dom";

export const UserBar = ({ loggedIn, name }) => (
        loggedIn ? <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <span className="nav-link">Hello <i>{name}!</i></span>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
            </li>
        </ul> : <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
        </ul>
    )
;
