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

	const getProfile = async () => {
		const response = await axios.get(`${BASE_URL}/users/${userId}`);
		setProfile(response.data);
	};
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

    const handleChange=(e)=>{
       console.log(e)
        let url = URL.createObjectURL(e.target.files[0])
        setPicture(url)
    }
	useEffect(() => {
		getProfile();
	}, [user]);

    console.log(userId)
	

	return (
        <div >
                    { authenticated && userId===36 &&(
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
    
            <Box width='400px' mt={4} alignItem="center" height='700px' >
                
            <Card sx={{ml:4}}>
                <CardHeader sx={{ bgcolor: "#f0e5f4" }}/>
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