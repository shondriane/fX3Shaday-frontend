import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';
import Client from '../services/Api';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const UpdateClass = ({ user }) => {
	const { class_id } = useParams();
    const classId = parseInt(class_id)
	let navigate = useNavigate();
	const initialFormValues = {
		id:'class?.id',
		class:'',
		description:'',
		picture:'',
		time:'',
		date:'',
		capacity:'',
		cost:''
		
	};

	const [formValues, setFormValues] = useState(initialFormValues);
	const [classes,setClasses]=useState([])
	

	const getClassesById=async()=>{
        const response=await axios.get(`${BASE_URL}/classes/${classId}`)
        setClasses(response.data)
		setFormValues({...response.data})
    }
  

    const handleChange = (e) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
     
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      await Client.put(`${BASE_URL}/classes/${classId}`,formValues)
        .then((response)=>{
            return response
        }).catch((error)=>{
            console.error(error)
        })
        setFormValues(initialFormValues)
        navigate('/')
      
    }
	useEffect(()=>{
		getClassesById()
			},[])

	return (
		<Container component="main" 
		maxWidth="xs" >
        <CssBaseline/>
        <Box sx={{marginTop:8,display:'flex',flexDirection:'column',alignItems:'center'}}>
       
          <Typography component="h1" variant="h5">
            Update Class Details
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt:3}}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
 onChange={handleChange}
 name="class"
 type="text"
 value={formValues.class}
 fullWidth
 required
 label="class"
                  autoFocus
                />
        </Grid>
        <Grid item xs={12} >
                <TextField
                 onChange={handleChange}
                 name="description"
                 type="text"
                 value={formValues.description}
                 required
                  fullWidth
                  label="Description"
    
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 onChange={handleChange}
                 name="picture"
                 type="text"
                 value={formValues.picture}
                 required
                 fullWidth
                  label="Image URL"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  name="time"
                  type="time"
                  placeholder="123-456-7891"
                  value={formValues.time}
                  required
                  fullWidth
                
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                   onChange={handleChange}
                   name="date"
                   type="date"
                   value={formValues.date}
                   required
                  fullWidth
               
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 onChange={handleChange}
                 name="capacity"
                 type="integer"
                 value={formValues.capacity}
                  required
                  fullWidth
                  label="Capacity"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 onChange={handleChange}
                 name="cost"
                 type="integer"
                 value={formValues.cost}
                  required
                  fullWidth
                  label="Cost"
                 
                />
              </Grid>
           
      
      
  
    

        <Button type="submit" fullWidth sx={{mt:3,mb:2}} variant="contained" endIcon={<LoginIcon/>}>Submit</Button>
       
        </Grid>
        </Box>
        </Box>
      </Container>
    
	);
};

export default UpdateClass;