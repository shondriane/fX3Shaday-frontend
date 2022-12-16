import axios from 'axios'
import { useState,useEffect } from 'react'
import { BASE_URL } from '../globals'
import { useNavigate,useParams } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import Button   from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Client from '../services/Api';

const AddReview=({user})=>{

    const navigate = useNavigate()
    const {class_id}=useParams()
    const classId=parseInt(class_id)

    const initialFormValues = {
        rating:'',
         classId:parseInt(classId),
         comment:'',
         userId: user.id,
   
        
    }   
    const [formValues, setFormValues] = useState(initialFormValues)

   
    
  
   
  
  
    useEffect(()=>{

    },[classId])

    const handleChange = (e) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
     
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const postReviews=  await Client.post(`${BASE_URL}/reviews/`,formValues)
        .then((response)=>{
            return response
        }).catch((error)=>{
            console.error(error)
        })
        setFormValues(initialFormValues)
        navigate(`/myClasses/${user.id}`)

    }

return(
    <div>
   <Container component="main" maxWidth="xs" >
        <CssBaseline/>
        <Box sx={{marginTop:8,display:'flex',flexDirection:'column',alignItems:'center'}}>
       
          <Typography component="h1" variant="h5">
            Add Review
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt:3}}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
 onChange={handleChange}
 name="rating"
 type="integer"
 value={formValues.rating}
 required
 fullWidth
 label="Level of Fun between 1 - 5"
                  autoFocus
                />
        </Grid>
        <Grid item xs={12} >
                <TextField
                 onChange={handleChange}
                 name="comment"
                 type="text"
                 value={formValues.comment}
                 required
                  fullWidth
                  label="Comment"
       
                />
              </Grid>
        <Button type="submit" fullWidth sx={{mt:3,mb:2}} variant="contained" endIcon={<LoginIcon/>}>Submit</Button>
       
        </Grid>
        </Box>
        </Box>
      </Container>
    </div>
)


}
export default AddReview