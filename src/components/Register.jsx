import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import Button   from '@mui/material/Button'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Register = () => {
  const navigate = useNavigate()
  const initialFormValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  
  }

  const [formValues, setFormValues] = useState(initialFormValues)


  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
   
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

      await RegisterUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
       
      })
      setFormValues(initialFormValues)
      navigate('/sign-in')
    
  }
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline/>
        <Box sx={{marginTop:8,display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Join
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt:3}}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
 onChange={handleChange}
 name="firstName"
 type="text"
 value={formValues.firstName}
 required
 label="First Name"
                  autoFocus
                />
        </Grid>
        <Grid item xs={12} sm={6}>
                <TextField
                 onChange={handleChange}
                 name="lastName"
                 type="text"
                 value={formValues.lastName}
                 required
                  fullWidth
                  label="Last Name"
    
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 onChange={handleChange}
                 name="email"
                 type="email"
                 value={formValues.email}
                 required
                 fullWidth
                  label="Email Address"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  name="phoneNumber"
                  type="text"
                  placeholder="123-456-7891"
                  value={formValues.phoneNumber}
                  required
                  fullWidth
                  label="Phone Number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                   onChange={handleChange}
                   name="username"
                   type="text"
                   placeholder="pretzel89"
                   value={formValues.username}
                   required
                  fullWidth
                  label="Username"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 onChange={handleChange}
                 name="password"
                 type="password"
                 placeholder="create password"
                 value={formValues.password}
                  required
                  fullWidth
                  label="Password"
                 
                />
              </Grid>
           
      
      
  
    

        <Button type="submit" fullWidth sx={{mt:3,mb:2}} variant="contained" endIcon={<LoginIcon/>}>Sign Up</Button>
       
        </Grid>
        </Box>
        </Box>
      </Container>
  
    </ThemeProvider>
  )
}

export default Register
