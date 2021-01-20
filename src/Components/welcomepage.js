import React from 'react'
import { Grid, Paper, Avatar, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Welcomepage=({handleChange})=>{
const paperStyle={padding :20, height:'68vh', width:300, margin:"0 auto"}
const avatarStyle={backgroundColor:'#1bbd7e'}


return(
  <Grid>
      <Paper  style={paperStyle}>
       <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Welcome To My React Application</h2> 
       </Grid>
       <Typography>
       <Link href="Welcomepage" onClick={()=>handleChange("event",2)}>
          </Link>
          </Typography>
      </Paper>
    </Grid>
  )
}
export default Welcomepage

