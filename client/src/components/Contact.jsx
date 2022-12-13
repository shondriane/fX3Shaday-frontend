import React from 'react'
import '../index.css'

import CssBaseline from '@mui/material/CssBaseline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import Button   from '@mui/material/Button'

 const Contact=()=>{

    const siteProps={
        phone:"555-123-4567",
        email: "FX3Shaday@mail.com",
        background:"https://i.ibb.co/0F7hT92/airb0676.jpg"
    }

   const handleSubmit=(e)=>{
        e.preventDefault()
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url( "https://i.ibb.co/0F7hT92/airb0676.jpg" )',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5}  elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography  component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom>
             Contact Me
            </Typography>
            <a href={`mailto:${siteProps.email}`}>
            <EmailIcon/>
            </a>
            <a href={`tel:{siteProps.phone}`}>
            <LocalPhoneIcon/>
            </a>
          
            <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>

            <TextField
                margin="normal"
                required
                fullWidth
                name="subject"
                label="Subject"
                
                type="text"
               
              />
              <TextField
                margin="normal"
              
                fullWidth
                label="Email Address"
                type="email"
                required
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="message"
                type="text"
                label='Message'
                paragraph
              />
           
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Message
              </Button>
         
            
             
      </Box>
           
              </Box>
            
              </Grid>
              </Grid>
           
       
      )
}

export default Contact