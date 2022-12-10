import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../globals';
import Client from '../services/Api';

const Profile = ({ user }) => {
	let navigate = useNavigate();
	const { user_id } = useParams();
	const userId = parseInt(user_id);
	const [profile, setProfile] = useState([]);

	const getProfile = async () => {
		const response = await axios.get(`${BASE_URL}/users/${userId}`);
		setProfile(response.data);
	};
	const handleUpdateClick = () => {
		navigate(`/update-profile/${userId}`);
	};

	const handleDeleteClick = async () => {
        const response = confirm("Are you sure you want to delete your account?")
        if (response){
            alert ("Please keep me in mind for your next goal")
            await Client.delete(`${BASE_URL}/users/${userId}`);
        }
        else{
            alert("woah, that was scary. I am looking forward to helping you reach your fitness goals.")
        }
		
	};

	useEffect(() => {
		getProfile();
	}, [user]);

	useEffect(() => {
		getProfile();
	}, [user]);

	return (
		<div className="profile">
			<section className="profileRight">
				<h1>
					{profile.firstName} {profile.lastName}
				</h1>
				<h2>Email</h2>
				<h3>{profile.email}</h3>
				<h2>Contact Number</h2>
				<h3>{profile.phoneNumber}</h3>
	
				{user && user.id === userId && (
					<div>
						<h2>UserName</h2>
						<h3>{profile.username}</h3>
						<button onClick={handleDeleteClick}>
							Delete Profile
						</button>
						<button onClick={handleUpdateClick}>
							Update Profile
						</button>
					</div>
				)}
				
			</section>
		</div>
	);
};

export default Profile;