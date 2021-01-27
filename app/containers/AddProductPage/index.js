/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import './AddProductPage.css';
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
import { API_BASE_URL } from '../../constants/apiConstants';

const AddProductPage = props => {
  const paperStyle = { padding: 20, width: 300, margin: '0 auto' };
  const headerStyle = { margin: 0 };
  // const marginTop={marginTop:5}
  const [state, setState] = useState({
    name: '',
    product_id: '',
    brand: '',
    colors: '',
    term: false,
    successMessage: null,
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .label('name')
      .required(),
    product_id: Yup.string()
      .label('product_id')
      .required(),
    brand: Yup.string()
    .label('brand')
    .required(),
    colors: Yup.string()
    .label('colors')
    .required(),
    term: Yup.string().oneOf(['true'], 'Accept terms & conditions'),
  });

  // const handleChange = (e) => {
  //     const {id , value} = e.target
  //     setState(prevState => ({
  //         ...prevState,
  //         [id] : value
  //     }))
  // }
  const onSubmit = (values, actions)=> {
    setTimeout(() => {
      actions.resetForm();
      actions.setSubmitting(false);
    }, 2000);
    if (values.name.length && values.product_id.length) {
      // props.showError(null);
      const payload = {
        ...values,
      };
      axios
        .post(`${API_BASE_URL}/addproduct`, payload)
        .then(response => {
          if (response.status === 200) {
            setState(prevState => ({
              ...prevState,
              successMessage:
                'Add Product Success. Redirecting to product page..',
            }));
            redirectToList();
            // props.showError(null);
          } else {
            props.showError('Some error ocurred');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      props.showError('Please enter valid name and id');
    }
  };
  const redirectToList = () => {
    // props.updateTitle('Login');
    props.history.push('/home');
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
          <h2 style={headerStyle}>Add Product </h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to add a product !
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
                label="Product Name"
                name="name"
                placeholder="Product Name"
                helpertext={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Id"
                name="product_id"
                placeholder="ID"
                helpertext={<ErrorMessage name="product_id" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Brand"
                name="brand"
                placeholder="Brand"
                helpertext={<ErrorMessage name="brand" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Color"
                name="colors"
                placeholder="Enter Your colors"
                helpertext={<ErrorMessage name="colors" />}
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
                {props.isSubmitting ? 'Loading' : 'Add'}{' '}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          {' '}
          <Link href="" onClick={() => redirectToList()}>
            Product List
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
AddProductPage.propTypes = {
  isSubmitting: PropTypes.bool,
  resetForm: PropTypes.func,
  setSubmitting: PropTypes.func,
  showError: PropTypes.func,
  history: PropTypes.object.isRequired,
};
export default withRouter(AddProductPage);
