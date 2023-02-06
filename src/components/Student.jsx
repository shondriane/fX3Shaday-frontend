
import {BASE_URL} from '../globals'
import {useState} from 'react'
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import Button   from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const Students =(user)=>{
    const navigate = useNavigate()
    const {classes_id}=useParams()
    const classId=parseInt(classes_id)
    const initialFormValues = {
   
        classId:classId,
        userId:0,
        
      }
    
      const [formValues, setFormValues] = useState(initialFormValues)


const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${BASE_URL}/userclasses/user/${formValues.userId}/class/${formValues.classId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: formValues.userId,
                classId: formValues.classId
            })
        });

        if (response.ok) {
            navigate(`/admin/${user.id}`);
        }
    } catch (error) {
        console.error(error);
    }
}

    return (
        <Container component="main" maxWidth="xs" >
        <CssBaseline/>
        <Box sx={{marginTop:8,display:'flex',flexDirection:'column',alignItems:'center'}}>
       
          <Typography component="h1" variant="h5">
            Add New Student
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt:3}}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
 onChange={handleChange}
 name="classId"
 type="number"
 value={formValues.classId}
 required
 fullWidth
 label="ClassId"
                  
                />
        </Grid>
        <Grid item xs={12} >
                <TextField
                 onChange={handleChange}
                 name="userId"
                 type="number"
                 value={formValues.userId}
                 required
                  fullWidth
                  label="UserId"
    
                />
              </Grid>

        <Button type="submit" fullWidth sx={{mt:3,mb:2}} variant="contained" endIcon={<LoginIcon/>}>Submit</Button>
       
        </Grid>
        </Box>
        </Box>
      </Container>
    )
}

export default Students