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
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions, CardHeader } from '@mui/material';



const Profile = ({ user,handleLogOut }) => {
	let navigate = useNavigate();
	const { user_id } = useParams();
	const userId = parseInt(user_id);
	const [profile, setProfile] = useState([]);
    const [show,setShow]=useState(false)

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

	useEffect(() => {
		getProfile();
	}, [user]);

	useEffect(() => {
		getProfile();
	}, [user]);

	return (
        <div >
       <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
 >
    
            <Box width='400px' mt={4}>
                
            <Card>
                <CardHeader sx={{ bgcolor: "#f0e5f4" }}/>
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
                <Button variant="contained" startIcon={<AddCircleIcon/>}onClick={handleUpdateClick}>
 							Update Profile
 						</Button>
                         <Button variant="outlined" endIcon={<DeleteIcon/>} onClick={handleClick}>
 							Delete Profile
 						</Button>
                </CardActions>
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
		</div> 
	);
};

export default Profile;