import React         from 'react';
import {Link}        from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";
import {UserBar}     from "./UserBar";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Header = (props) => (
    <Navbar bg="light" expand="lg">
        <Link to="/">
            <Navbar.Brand>
                <FontAwesomeIcon icon="home"/>
            </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <UserBar loggedIn={props.loggedIn} name={props.user.name}/>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);
