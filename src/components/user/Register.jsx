import React                         from 'react';
import { Form, FormControl, Button } from "react-bootstrap";
import validate                      from '../../utilities/form-validation';
import userActions                   from '../../utilities/user/user-actions';


export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            password: '',
            formErrors: {},
            formValid: false,
            formProcessing: false

        };
    }

    /** Dynamic fields and form validation not required in the task
    validateField = (name, value) => {
        const namePattern = /^[\w\-'\s]+$/;
        const usernamePattern = /^\S+$/;
        let fieldValidationErrors = this.state.formErrors;
        let isNameValid = this.state.isNameValid;
        let isUsernameValid = this.state.isUsernameValid;
        let isPasswordValid = this.state.isPasswordValid;

        switch (name) {
            case 'name':
                isNameValid = value.match(namePattern) && value.length > 0;
                fieldValidationErrors.name = isNameValid ? '' : 'Name is invalid';
                break;
            case 'username':
                isUsernameValid = value.match(usernamePattern) && value.length > 0;
                fieldValidationErrors.username = isUsernameValid ? '' : 'Username is invalid';
                break;
            case 'password':
                isPasswordValid = value.match(usernamePattern) && value.length > 0;
                fieldValidationErrors.password = isPasswordValid ? '' : 'Password is invalid';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            isNameValid: isNameValid,
            isUsernameValid: isUsernameValid,
            isPasswordValid: isPasswordValid
        }, this.validateForm)
    };

    validateForm = () => {
        this.setState({
            formValid: this.state.isNameValid && this.state.isUsernameValid && this.state.isPasswordValid,
        })
    };
    */

    handleOnChange = (e) => {
        const {name, value} = e.target;
        let clearErrors = this.state.formErrors;
        delete clearErrors[name];
        this.setState({
            [name]: value,
            formErrors: clearErrors
        })
    };

    handleOnSubmit(e) {
        e.preventDefault();

        this.setState({
            formProcessing: true,
        });

        let formData = (({name, username, password}) => ({name, username, password}))(this.state);
        let formDataErrors = validate(formData);

        if (Object.keys(formDataErrors).length) {
            let formErrors = {};
            for (let error in formDataErrors) {
                formErrors[error] = formDataErrors[error];
            }
            this.setState({
                formErrors: formErrors,
                formValid: false,
                formProcessing: false,
            })
        } else {
            this.setState({
                formValid: true
            });
            if (userActions.handleRegister(formData)) {
                this.props.history.push({
                    pathname: '/login',
                    state: 'Test'
                });

            } else {
                this.setState({
                    formErrors: {
                        username: 'This username already exists!'
                    },
                    formValid: false,
                    formProcessing: false,
                })
            }
        }
    }

    render() {
        return (
            <div className="col-sm-6 col-lg-4 m-auto">
                <h2 className="mt-5 mb-5 text-center">Register</h2>
                <Form validated={this.state.formValid} onSubmit={event => this.handleOnSubmit(event)}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control isInvalid={this.state.formErrors.name}
                                      type="text" placeholder="Name" name="name" value={this.state.name}
                                      onChange={(event) => this.handleOnChange(event)}/>
                        <FormControl.Feedback type='invalid'>{this.state.formErrors.name}</FormControl.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control isInvalid={this.state.formErrors.username}
                                      type="text" placeholder="Username" name="username" value={this.state.username}
                                      onChange={(event) => this.handleOnChange(event)}/>
                        <FormControl.Feedback type='invalid'>{this.state.formErrors.username}</FormControl.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control isInvalid={this.state.formErrors.password}
                                      type="password" placeholder="Password" name="password" value={this.state.password}
                                      onChange={(event) => this.handleOnChange(event)}/>
                        <FormControl.Feedback type='invalid'>{this.state.formErrors.password}</FormControl.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={this.state.formProcessing}>
                        Sign up
                    </Button>
                </Form>
            </div>
        )
    }
}
