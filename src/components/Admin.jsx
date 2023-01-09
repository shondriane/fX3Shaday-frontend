import React from 'react'
import axios from 'axios'
import{useState} from 'react'
import { BASE_URL } from '../globals'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import Client from '../services/Api';
import { useNavigate,useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import Reviews from './Reviews'
import { RepeatOneSharp } from '@mui/icons-material';

const Admin = ({user}) => {

const [getClasses,setClasses]= useState([])
const [show,setShow]=useState(false)
const navigate = useNavigate()

const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
   
      setClasses(response.data)
  }
    
	
 useEffect(()=>{
  classes()
 


 },[])    



 const handleDeleteClick = async (e,id) => {

  await Client.delete(`${BASE_URL}/classes/${id}`,{
    classId:id
  });
navigate(`/classes`)

};

const handleClick=async(e,id)=>{
setShow(true)
}

const handleUpdateClick = () => {
  navigate(`/classes`);
};


   
  
  
		
  return (
    <>
 
     
    <CssBaseline />
    <main>



     
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
           
            
          >
           Current Classes
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Make today a great day!
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
     
            <Button variant="contained" component={Link} to="/students">Current Students</Button>
            
            <Button variant="outlined" component={Link} to="/addClass/:user_id">Add Class</Button>
          </Stack>
        </Container>
      </Box>
 
     

      <Container sx={{ py: 8 }} maxWidth="md">
<Grid container spacing={8}>



{getClasses?.map((session)=>(

  <Grid item  xs={12} sm={6}md={6}>
     
  <Card key={session.id}
  sx={{ height: '450px', display: 'flex', flexDirection: 'column' }}
>
  <CardMedia
    component="img"
    sx={{
       
      pt: '.25%',
     height:'300px'
    }}
    image={session.picture}
  />
  <CardContent sx={{ flexGrow: 1 }}>
    <Typography  variant="h5" component="h2">
      {session.class} 
    </Typography>
    <Typography  variant="h5" component="h2">
       start date {session.date.slice(0,10) }
    </Typography>
    <CardActions>
   
        
   
          <Button  component={Link} to={`/updateClass/${session.id}`} size="small"> Update</Button>
          <Button onClick={(e)=>handleClick(e,session.id)}size="small"> Delete </Button>
          <Button  component={Link} to={`/userclass/class/${session.id}`} size="small"> Students</Button>
         </CardActions>
    
         {show &&(
                   <div id ="id01" className="modal">
                  
                   <form className="modal-content">
                       <div className="container">
<h1>
Delete Class
</h1>
<p>
Are you sure you want to delete the Class?
</p>
                      
                       
                 <div class="clearfix">
                 <Button variant="contained" endIcon = {<ClearIcon/>} onClick={handleUpdateClick}>
                       cancel
                   </Button>
                   <Button variant="outlined"  startIcon={<DeleteIcon/>} onClick={(e)=>handleDeleteClick(e,session.id)}>
                       Delete 
                   </Button>
                  
                   </div>
               </div>
               </form>
               </div>
              )}
              
  </CardContent>
  
 
</Card>

</Grid>


))} 

   </Grid>
      </Container>
     
      
      





    </main>
   
  
  </>
  )
}

        export default Admin