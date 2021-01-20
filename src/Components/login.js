import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const Login=({handleChange})=>{
const paperStyle={padding :20, height:'68vh', width:300, margin:"0 auto"}
const avatarStyle={backgroundColor:'#1bbd7e'}
const btnstyle={margin:'8px 0'}

const initialValues={
  email:'',
  password:'',
  remember:false
}
const validationSchema=Yup.object().shape({
  email: Yup
  .string()
  .label("Email")
  .email()
  .required(),
  password: Yup
  .string()
  .label("Password")
  .required()
  .min(2, "Seems a bit short...")
  . max(10,"We prefer insecure system, try a shorter password.")
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
    url: 'http://localhost:5000/login',
    headers: {
        'Content-Type': 'application/json',
            },
    data: values,
})
    .then(response => {
        console.log(response)
           alert(response.data);
        })      
    .catch(error => console.log(error))
}

return(
  <Grid>
      <Paper  style={paperStyle}>
       <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign In</h2> 
       </Grid>
         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
           {(props)=>(
             <Form>
                <Field as={TextField} label='Email' name="email" 
                placeholder='Enter email' fullWidth required
                helperText={<ErrorMessage name="email"/>}/>
                  <Field as={TextField} label='Password'name="password"
                   placeholder='Enter password' type='password' fullWidth required
                   helperText={<ErrorMessage name="password"/>}/>
                  
                  <Field as={FormControlLabel}
                  name='remember'
                    control={
                      <Checkbox
                          color="primary"
                      />
                    }
                    label="Remember me"
                    />
          <Button type='Submit' li  variant="contained" color="primary" disable={props.isSubmitting}
          style={btnstyle} fullWidth>{props.isSubmitting?"Loading":"Sign in"}</Button>
                   
             </Form>
           )}
         </Formik>
                 <Typography>
         <Link href="#">
            Forgot password ?
          </Link>
        </Typography>
        <Typography> Do you have an account ?
         <Link href="#" onClick={()=>handleChange("event",1)}>
            Sign UP
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}
export default Login

