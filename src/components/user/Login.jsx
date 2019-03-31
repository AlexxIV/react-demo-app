import React, { useState }           from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import userActions                   from '../../utilities/user/user-actions';

export const Login = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState({
        globalError: false,
        globalErrorContent: '',
    });

    const { username, password } = formData;

    const formPopulated = () => {
        return formData.username.length > 0 && formData.password.length > 0;
    };

    const updateFormData = event => setFormData({
        ...formData,
        [event.target.name]: event.target.value
    });

    const submitFormData = event => {
        event.preventDefault();
        console.log(props);
        let loggedUser = userActions.handleLogin(formData);

        if (loggedUser) {
            props.updateUserState(loggedUser);
            props.history.push({
                pathname: '/dashboard',
                state: 'Login Successful!',
            });
        } else {
            setError({
                globalError: true,
                globalErrorContent: 'Invalid credentials!',
            });
            setFormData({
                username: '',
                password: '',
            });
        }

    };

    return (
        <div className="col-sm-6 col-lg-4 m-auto">
            <h2 className="mt-5 mb-5 text-center">Login</h2>
            <Form onSubmit={e => submitFormData(e)}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        isInvalid={error.globalError}
                        type="text"
                        value={username}
                        onChange={e => updateFormData(e)}
                        placeholder="Enter username"
                        name="username"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        isInvalid={error.globalError}
                        type="password"
                        value={password}
                        onChange={e => updateFormData(e)}
                        placeholder="Password"
                        name="password"
                    />
                    <FormControl.Feedback type='invalid'>
                        {error.globalErrorContent}
                    </FormControl.Feedback>
                </Form.Group>
                <Button disabled={!formPopulated()} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}