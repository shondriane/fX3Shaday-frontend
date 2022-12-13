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
		<div className="profile">
			<section className="profileSection">
				<h1>
					{profile.firstName} {profile.lastName}
				</h1>
				<h2>Email</h2>
				<h3>{profile.email}</h3>
				<h2>Contact Number</h2>
				<h3>{profile.phoneNumber}</h3>
                <Button variant="contained" startIcon={<AddCircleIcon/>}onClick={handleUpdateClick}>
							Update Profile
						</Button>
                        <Button variant="outlined" endIcon={<DeleteIcon/>} onClick={handleClick}>
							Delete Profile
						</Button>
	
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
                    	
				
			</section>
		</div>
	);
};

export default Profile;