import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UserBar} from "./UserBar";
import {Link} from "react-router-dom";

export const Header = props => (
    <Navbar bg="light" expand="lg">
        <Link to="/">
            <Navbar.Brand>
                <FontAwesomeIcon icon="home"/>
            </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <UserBar loggedIn={false}/>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);
