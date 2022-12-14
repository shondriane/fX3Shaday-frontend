import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'
import Button   from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const SignIn = ({ toggleAuthenticated, setUser }) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [auth, setAuth] = useState(true)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formValues.email === '' || formValues.password === '') {
      setAuth(false)
     
    } else {
      const payload = await SignInUser(formValues)
      setFormValues({ email: '', password: '' })
      setUser(payload)
      toggleAuthenticated(true)
      navigate('/')
      
    }
  }

  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("https://i.ibb.co/f4KdZx9/airb1028.jpg"  )',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
              
                fullWidth
                label="Email Address"
    
                onChange={handleChange}
                name="email"
                type="email"
               autoComplete="email"
                value={formValues.email}
                required
                
               
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                name="password"
                type="password"
                autoComplete="current-password"
                value={formValues.password}
               
              />
 

<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                 LogIn
              </Button>
              <Grid container>
                
     
      {!auth && (
        <div>
          <h3>Provide your email and password</h3>
        </div>
      )}
     
      </Grid>
      </Box>
</Box>
      </Grid>
      </Grid>
    </ThemeProvider>
  )
}
export default SignIn