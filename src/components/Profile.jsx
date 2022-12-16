import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../globals';
import Client from '../services/Api';
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ClearIcon from '@mui/icons-material/Clear';
import '../index.css';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions, CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';



const Profile = ({ user,handleLogOut,authenticated }) => {
	let navigate = useNavigate();
	const { user_id } = useParams();
	const userId = parseInt(user_id);
	const [profile, setProfile] = useState([]);
    const [show,setShow]=useState(false)
    const [picture,setPicture]=useState("initialState")
    const [getClasses,setClasses]= useState([])

	const getProfile = async () => {
		const response = await axios.get(`${BASE_URL}/users/${userId}`);
		setProfile(response.data);
	};
    const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
        setClasses(response.data)
      
        
    }
	const handleUpdateClick = () => {
		navigate(`/update-profile/${userId}`);
	};

	const handleDeleteClick = async () => {
            await Client.delete(`${BASE_URL}/users/${userId}`);
            localStorage.clear()
            handleLogOut()
		    navigate(`/`)
	};

    const handleClick=async()=>{
        setShow(true)
    }

    const handleClickClass=async(e,id)=>{
        setShow(true)
        }
        

    const handleChange=(e)=>{
      
        let url = URL.createObjectURL(e.target.files[0])
        setPicture(url)
    }
	useEffect(() => {
		getProfile();
        classes()
	}, [user]);

   
	 const handleDeleteClickClass = async (e,id) => {

  await Client.delete(`${BASE_URL}/classes/${id}`,{
    classId:id
  });
navigate(`/classes`)

};



const handleUpdateClickClass = () => {
  navigate(`/classes`);
};


	return (
        <div >
                    { userId===36 &&(
      <a  target="_blank" href="https://calendar.google.com/calendar/u/1?cid=Zngzc2hhZGF5QGdtYWlsLmNvbQ">
<button>
    see schedule
</button>
</a>
)}
       <Grid
  container

  component="main"
  style={{ height: '100vh' }}
 >
    <CssBaseline/>
    <Grid item xs={false}
    sm={4}
    md={7}>
    
            <Box width='600px' mt={4} alignItem="center" height='700px' >
            <Container sx={{ py: 8 }} maxWidth="md">
{/* <Grid container spacing={8}>
     {getClasses?.map((session)=>(
      
      <Grid item key={session.id} xs={12} sm={6}md={6}>
         
      <Card
      sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}
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
        <Typography gutterBottom variant="h5" component="h2">
          {session.class}
        </Typography>
        <Typography>
          {session.description}
        </Typography>
       
      
        <CardActions>
       
            
      
              <Button  component={Link} to={`/updateClass/${session.id}`} size="small"> Update</Button>
              <Button onClick={(e)=>handleClickClass(e,session.id)}size="small"> Delete </Button>
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
                     <Button variant="contained" endIcon = {<ClearIcon/>} onClick={handleUpdateClickClass}>
                           cancel
                       </Button>
                       <Button variant="outlined"  startIcon={<DeleteIcon/>} onClick={(e)=>handleDeleteClickClass(e,session.id)}>
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
   */}
   </Container>
        
              
            <Card sx={{ml:4}}>
                <CardHeader sx={{ bgcolor: "pink" }}/>
                <CardMedia sx={{borderRadius:'7%', margin:'28px',height:'200px'}}image={picture}/>
                <CardContent>
<Typography gutterButtom variant="h5" component="div">
Name: {profile.firstName} {profile.lastName}
</Typography>
<Typography gutterButtom variant="h5" >
Email: {profile.email}
</Typography>
<Typography gutterButtom variant="h5" >
Phone: {profile.phoneNumber}
</Typography>

                </CardContent>
               
                <CardActions>
                    <TextField
                    
                    name="picture"
                    type="file"
                    fullWidth
                    onChange={handleChange}
                    />
                    </CardActions>
                <Button variant="contained" startIcon={<AddCircleIcon/>}onClick={handleUpdateClick}>
 							Update Profile
 						</Button>
                         <Button variant="outlined" endIcon={<DeleteIcon/>} onClick={handleClick}>
 							Delete Profile
 						</Button>

                
            </Card>
           
 		
	
 				{ show &&(
 					 <div id ="id01" className="modal">
                    
                      <form className="modal-content">
                          <div className="container">
 <h1>
 Delete Account
 </h1>
 <p>
 Are you sure you want to delete your account
 </p>
                        
                         
                 <div class="clearfix">
                 <Button variant="contained" endIcon = {<ClearIcon/>}onClick={handleUpdateClick}>
                        cancel
                      </Button>
                      <Button variant="outlined" startIcon={<DeleteIcon/>} onClick={handleDeleteClick}>
                          Delete 
                      </Button>
                    
                      </div>
                  </div>
                  </form>
                  </div>
                 )}
                    	
                 
 		
           
             </Box>
             </Grid>
             <Grid item xs={12} sm={8} md={5}  elevation={6} square bgcolor="pink">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            
              
            }}
          >
         
      
     
     
            
               {<Avatar sx= {{bgcolor:"blue"}} aria-label="company" >FX3</Avatar>}
            <Typography component="h1" variant="h5"   >
              Track Your Fitness and Nutrition
            </Typography>
            <Typography component="h6" variant="h7">
              Where do you want to be?
              It's important to track specific and meaurable goals.
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                label="Goal 1"
                type="text"
               
               
              />
                <TextField
                margin="normal"
                required
                fullWidth
                label="Deadline" 
               
              />
                  <TextField
                margin="normal"
                required
                fullWidth
                label="Plan" 
               
              />
         
                    <TextField
                margin="normal"
                
                fullWidth
                label="Weight" 
               
              />
                    <TextField
                margin="normal"
                required
                fullWidth
                label="Body Fat%" 
               
              />
                  <TextField
                margin="normal"
                required
                fullWidth
                label="Wait Size" 
               />
              </Box>
              </Box>
              </Grid>
              </Grid>

		</div> 
	);
};

export default Profile;