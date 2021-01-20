import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const Signup=({handleChange})=>{
const paperStyle={padding: 20,width:300, margin:"0 auto"}
const headerStyle={margin:0}
const avatarStyle={backgroundColor:'#1bbd7e'}
// const marginTop={marginTop:5}
const initialValues={
    username:'',
    email:'',
    phonenumber:'',
    password:'',
    conformpassword:'',
    term:false,
} 


const validationSchema=Yup.object().shape({
    username:Yup
    .string()
    .label("Username")
    .min(3,"Its too short")
    // .username()
    .required(),
    email:Yup 
    .string()
    .label("Email")
    .email()
    .required(),
    phonenumber:Yup
    .number()
    .typeError("Enter valid Phone Number")
    .required("Required"),
    password:Yup
    .string()
    .min(8,"Password minimum length should be 8")
    .label("Password")
    .required()
    .min(2, "Seems a bit short...")
    .max(10,"We prefer insecure system, try a shorter password."),
    conformpassword:Yup
    .string()
    .oneOf([Yup.ref('password')],"Password not matching")
    .required("Required"),
    term:Yup.string()
    .oneOf(["true"],"Accept terms & conditions")
})

const onSubmit=(values,props)=>{
    console.log(values)
    setTimeout(()=>{
      props.resetForm()
      props.setSubmitting(false)
    },2000)
    console.log(props)
    axios({
        method: 'POST',
        url: 'http://localhost:5000/signup',
        headers: {
            'Content-Type': 'application/json',
                },
        data: values,
    })
        .then(response => {
            alert(response.data);
            console.log(response)
        })
        .catch(error => console.log(error))
        // alert('You have signup sucessfully.');
}
  
return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align= 'center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon/>
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up </h2>
                    <Typography variant='caption'gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
               <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props)=>(
                    <Form>
                    <Field as={TextField} fullWidth label ='Name' name='username' placeholder="Enter Your Name"
                    helperText={<ErrorMessage name="name"/>}/>
                    <Field as={TextField} fullWidth label ='Email' name='email' placeholder="Enter Your Email"
                    helperText={<ErrorMessage name="email"/>}/>
                    <Field as={TextField} fullWidth label ='Phone Number' name='phonenumber' placeholder="Enter Your Phone Number"
                    helperText={<ErrorMessage name="phonenumber"/>}/>
                    <Field as={TextField}  fullWidth label ='Password' name='password' placeholder="Enter Your Password" type='password'
                    helperText={<ErrorMessage name="password"/>}/>
                    <Field as={TextField}  fullWidth label ='Conform Password' name='conformpassword' placeholder="Re Enter Your Password" type='password'
                    helperText={<ErrorMessage name="conformpassword"/>}/>
                    <Field as={FormControlLabel} name='term'control={<Checkbox />} label="I accept the terms and conditions."
                    helperText={<ErrorMessage name="term"/>}/>
                    <Button type='Submit' variant='contained' color='primary' disable={props.isSubmitting}>
                        {props.isSubmitting?"Loading":"Sign up"} </Button>
                </Form>
                )}
            </Formik>
            <Typography> Do you have an account ?
            <Link href="" onClick={()=>handleChange("event",0)}>
            Sign In
          </Link>
        </Typography>
            </Paper>
        </Grid>

    )
}
export default Signup;