import axios from 'axios'
import { useState,useEffect } from 'react'
import { BASE_URL } from '../globals'
import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import Button   from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Client from '../services/Api';

const AddClass= ({user,}) => {
    const navigate = useNavigate()
    const initialFormValues = {
   
      class:'',
      description:'',
      picture:'',
      time:'',
      date:'',
      capacity:'',
      cost:'',
  
     
      
    }
  
    const [formValues, setFormValues] = useState(initialFormValues)
    const [classes,setClasses]=useState([])
  
    const getClasses=async()=>{
        const response=await axios.get(`${BASE_URL}/classes`)
        setClasses(response.data)
    }
  
    useEffect(()=>{
getClasses()
    },[user])

    const handleChange = (e) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
     
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
        await Client.post(`${BASE_URL}/classes/`,formValues)
        .then((response)=>{
            return response
        }).catch((error)=>{
            console.error(error)
        })
        setFormValues(initialFormValues)
        navigate('/schedule')
      
    }

    return (
        <Container component="main" maxWidth="xs" >
        <CssBaseline/>
        <Box sx={{marginTop:8,display:'flex',flexDirection:'column',alignItems:'center'}}>
       
          <Typography component="h1" variant="h5">
            Add New Class
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt:3}}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
 onChange={handleChange}
 name="class"
 type="text"
 value={formValues.class}
 required
 fullWidth
 label="Class"
                  
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
    )
  }
  
  export default AddClass