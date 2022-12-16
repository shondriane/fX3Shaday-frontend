import React from 'react'
import '../index.css'
import {useRef} from 'react'
import emailjs from '@emailjs/browser';
import CssBaseline from '@mui/material/CssBaseline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import Button   from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

const KEY = process.env.REACT_APP_PUBLIC_KEY
const TEMPLATE= process.env.REACT_APP_TEMPLATE_ID
const SERVICE= process.env.REACT_APP_SERVICE_ID

 const Contact=()=>{
let navigate=useNavigate()
    const siteProps={
        phone:"555-123-4567",
        email: "FX3Shaday@mail.com",
        background:"https://i.ibb.co/0F7hT92/airb0676.jpg"
    }


    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm(SERVICE, TEMPLATE, form.current, KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        goBack()
    };

    let goBack=()=>{
        navigate('/')
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
            
            <Typography  component="h4"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom>
             I want to hear your fitness goals
             <a href={`tel:{siteProps.phone}`}>
            <LocalPhoneIcon/>
            </a>
            </Typography>
           
            
            
          
            <Box ref={form} onSubmit={sendEmail}component="form" sx={{ mt: 1 }}>

            <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                
                type="text"
               
              />
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
           
           <Button type="submit" fullWidth sx={{mt:3,mb:2}} variant="contained" endIcon={<LoginIcon/>}>Submit</Button>
         
            
             
      </Box>
           
              </Box>
            
              </Grid>
              </Grid>
           
       
      )
}

export default Contact