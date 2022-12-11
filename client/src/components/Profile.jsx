import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../globals';
import Client from '../services/Api';
import '../index.css';

const Profile = ({ user }) => {
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
                <button onClick={handleUpdateClick}>
							Update Profile
						</button>
                        <button onClick={handleClick}>
							Delete Profile
						</button>
	
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
                     <button onClick={handleDeleteClick}>
                         Delete 
                     </button>
                     <button onClick={handleUpdateClick}>
                         cancel
                     </button>
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