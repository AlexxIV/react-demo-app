import React                       from 'react';
import {Form, FormControl, Button} from "react-bootstrap";
import userActions                 from "../../utilities/user/user-actions";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitDisabled: true,
            globalError: false,
            globalErrorContent: ''
        };
    }

    availableForSubmit = () => {
         if (this.state.username.length > 0 && this.state.password.length > 0) {
             this.setState({
                 submitDisabled: false
             })
         }
    };

    handleOnChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
            globalError: false,
            globalErrorContent: ''
        });

        this.availableForSubmit();
    };

    handleOnSubmit = (e) => {
        e.preventDefault();
        let formData = (({username, password}) => ({username, password}))(this.state);
        let loggedUser = userActions.handleLogin(formData);

        if (loggedUser) {
            this.props.updateUserState(loggedUser);
            this.props.history.push({
                pathname: '/dashboard',
                state: 'Login successful!'
            });

        } else {
            this.setState({
                globalError: true,
                globalErrorContent: 'Invalid credentials',
                username: '',
                password: '',
            })
        }
    };

    render() {
        return (
            <div className="col-sm-6 col-lg-4 m-auto">
                <h2 className="mt-5 mb-5 text-center">Login</h2>
                <Form onSubmit={e => this.handleOnSubmit(e)}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control isInvalid={this.state.globalError}
                                      type="username"
                                      placeholder="Enter username"
                                      name="username"
                                      value={this.state.username}
                                      onChange={e => this.handleOnChange(e)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control isInvalid={this.state.globalError}
                                      type="password"
                                      placeholder="Password"
                                      name="password"
                                      value={this.state.password}
                                      onChange={e => this.handleOnChange(e)}/>
                        <FormControl.Feedback type='invalid'>{this.state.globalErrorContent}</FormControl.Feedback>
                    </Form.Group>
                    <Button disabled={this.state.submitDisabled} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        )
    }
}
