import React, {useEffect, useState} from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import validate from '../../utilities/form-validation';
import userActions from '../../utilities/user/user-actions';

export const Register2 = (props) => {
  const [formData, setFormData] = useState({
      name: '',
      username: '',
      password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
      formValid: false,
      formProcessing: false,
  });
  const updateFormData = event => {
      let clearErrors = formErrors;
      delete clearErrors[event.target.name];

      setFormErrors(clearErrors);
      setFormData({
      ...formData,
      [event.target.name]: event.target.value})
  };

  const submitFormData = event => {
      event.preventDefault();

      setFormStatus({
          ...formStatus,
          formProcessing: true
      });

      let errors = validate(formData);

      if (Object.keys(errors).length) {
          setFormStatus({
              formValid: false,
              formProcessing: false,
          });
          setFormErrors(errors);
      } else {
          setFormStatus({
              ...formStatus,
              formValid: true,
          });

          if (userActions.handleRegister(formData)) {
              props.history.push({
                  pathname: '/login',
                  state: 'Register successful'
              });
          } else {
              setFormErrors({
                  username: 'This username already exists!'
              });
              setFormStatus({
                  formValid: false,
                  formProcessing: false,
              })
          }
      }

  };


  return (
      <div className="col-sm-6 col-lg-4 m-auto">
          <h2 className="mt-5 mb-5 text-center">Register</h2>
          <Form validated={formStatus.formValid}
                onSubmit={e => submitFormData(e)}
          >
              <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                      isInvalid={formErrors.name}
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => updateFormData(e)}/>
                  <FormControl.Feedback type='invalid'>{formErrors.name}</FormControl.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                      isInvalid={formErrors.username}
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={(e) => updateFormData(e)}/>
                  <FormControl.Feedback type='invalid'>{formErrors.username}</FormControl.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      isInvalid={formErrors.password}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => updateFormData(e)}/>
                  <FormControl.Feedback type='invalid'>{formErrors.password}</FormControl.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={formStatus.formProcessing}>
                  Sign up
              </Button>
          </Form>
      </div>
  )


};