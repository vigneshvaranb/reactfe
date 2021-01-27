/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

const RegistrationPage = props => {
  const paperStyle = { padding: 20, width: 300, margin: '0 auto' };
  const headerStyle = { margin: 0 };
  // const marginTop={marginTop:5}
  const [state, setState] = useState({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
    conformpassword: '',
    term: false,
    successMessage: null,
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .label('Username')
      .min(3, 'Its too short')
      // .username()
      .required(),
    email: Yup.string()
      .label('Email')
      .email()
      .required(),
    phonenumber: Yup.number()
      .typeError('Enter valid Phone Number')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password minimum length should be 8')
      .label('Password')
      .required()
      .min(2, 'Seems a bit short...')
      .max(10, 'We prefer insecure system, try a shorter password.'),
    conformpassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password not matching')
      .required('Required'),
    term: Yup.string().oneOf(['true'], 'Accept terms & conditions'),
  });

  // const handleChange = (e) => {
  //     const {id , value} = e.target
  //     setState(prevState => ({
  //         ...prevState,
  //         [id] : value
  //     }))
  // }
  const onSubmit = values => {
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    if (values.email.length && values.password.length) {
      props.showError(null);
      const payload = {
        ...values,
      };
      axios
        .post(`${API_BASE_URL}/signup`, payload)
        .then(response => {
          if (response.status === 200) {
            setState(prevState => ({
              ...prevState,
              successMessage:
                'Registration successful. Redirecting to home page..',
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToHome();
            props.showError(null);
          } else {
            props.showError('Some error ocurred');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      props.showError('Please enter valid username and password');
    }
  };
  const redirectToHome = () => {
    // props.updateTitle('Home');
    props.history.push('/home');
  };
  const redirectToLogin = () => {
    // props.updateTitle('Login');
    props.history.push('/login');
  };
  // const handleSubmitClick = (e) => {
  //     e.preventDefault();
  //     if(state.password === state.confirmPassword) {
  //         sendDetailsToServer()
  //     } else {
  //         props.showError('Passwords do not match');
  //     }
  // }
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Sign Up </h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={state}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Name"
                name="username"
                placeholder="Enter Your Name"
                helpertext={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                name="email"
                placeholder="Enter Your Email"
                helpertext={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Phone Number"
                name="phonenumber"
                placeholder="Enter Your Phone Number"
                helpertext={<ErrorMessage name="phonenumber" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Password"
                name="password"
                placeholder="Enter Your Password"
                type="password"
                helpertext={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Conform Password"
                name="conformpassword"
                placeholder="Re Enter Your Password"
                type="password"
                helpertext={<ErrorMessage name="conformpassword" />}
              />
              <Field
                as={FormControlLabel}
                name="term"
                control={<Checkbox />}
                label="I accept the terms and conditions."
                helpertext={<ErrorMessage name="term" />}
              />
              <Button
                type="Submit"
                variant="contained"
                color="primary"
                disable={props.isSubmitting}
              >
                {props.isSubmitting ? 'Loading' : 'Sign up'}{' '}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          {' '}
          Do you have an account ?
          <Link href="" onClick={() => redirectToLogin()}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
RegistrationPage.propTypes = {
  isSubmitting: PropTypes.bool,
  resetForm: PropTypes.func,
  setSubmitting: PropTypes.func,
  showError: PropTypes.func,
  history: PropTypes.object.isRequired,
};
export default withRouter(RegistrationPage);
