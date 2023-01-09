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
import motivationArray from '../motivation'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  CardHeader } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';



const Profile = ({ user,handleLogOut,authenticated }) => {
	let navigate = useNavigate();
	const { user_id } = useParams();
	const userId = parseInt(user_id);
	const [profile, setProfile] = useState([]);
    const [show,setShow]=useState(false)
    const [motivationQuote,setMotivationQuote]=useState("")


	const getProfile = async () => {
		const response = await axios.get(`${BASE_URL}/users/${userId}`);
		setProfile(response.data);
    let index = Math.floor(Math.random()*motivationArray.length)
    console.log(index)
    setMotivationQuote(motivationArray[index])
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

  
        

   
	useEffect(() => {
		getProfile();
   
       
	}, [user,motivationQuote]);

   
	

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
       spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{minHeight:'100vh'}}
 >
    <CssBaseline/>
    
  
    <Grid item xs={5}
    sm={7}
    md={9}>
      
    
            <Box width='350px'alignItem="center" height='800px' flexDirection="column" flexGrow="1">
            <Container sx={{ py: 8 }} maxWidth="md">

   </Container>
        
              
            <Card sx={{maxWidth:550}} justify="center" alignItem="center">
                <CardHeader sx={{ bgcolor: "pink" }}/>
                <CardMedia component="img" height="20%" width='20%' image={motivationQuote}/>
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
             
              </Grid>

		</div> 
	);
};

export default Profile;