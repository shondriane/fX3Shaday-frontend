import React from 'react'
import '../index.css'
import {useRef,useState} from 'react'
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
const PHONE = process.env.REACT_APP_PHONE 

 const Contact=()=>{
let navigate=useNavigate()
    


    const form = useRef();

    const initialFormValues={
      name:"",
      email:"",
      subject:"",
      message:""
        }

        const [formValues,setFormValues]= useState(initialFormValues)

        const handleChange=(e)=>{
          setFormValues({...formValues,[e.target.name]: e.target.value})
        }

    const sendEmail = (e) => {
      e.preventDefault();
      emailjs.sendForm(SERVICE, TEMPLATE, form.current, KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        handleSubmit()
    };

    let handleSubmit=()=>{
      setFormValues(initialFormValues)
        navigate('/')
    }
    return (
        <Grid container component="main" >
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
        <Grid item xs={12} sm={8} md={5}  elevation={6} square="true">
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
             >
             Contact Me
            </Typography>
            
            <Typography  component="h4"
              variant="h5"
              align="center"
              color="text.primary"
             >
             I want to hear your fitness goals
             <a href={`tel:${PHONE}`}>
             
            <LocalPhoneIcon/>
            </a>
            </Typography>
           
            
            
          
            <Box ref={form} onSubmit={sendEmail}component="form" sx={{ mt: 1 }}>

            <TextField
            onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                value={formValues.name}
                type="text"
               
              />
            <TextField
            onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="subject"
                label="Subject"
                value={formValues.subject}
                type="text"
               
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                onChange={handleChange} 
                value={formValues.email}
                 type="email"
                name="email"
                required
              />
               <TextField
               onChange={handleChange}
               value={formValues.message}
                margin="normal"
                required
                fullWidth
                name="message"
                type="text"
                label='Message'
                multiline
                rows={8}
                variant="outlined"
              />
           
           <Button type="submit" fullWidth sx={{mt:3,mb:2}} variant="contained" endIcon={<LoginIcon/>}>Submit</Button>
         
            
             
      </Box>
           
              </Box>
            
              </Grid>
              </Grid>
           
       
      )
}

export default Contact