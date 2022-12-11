import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';
import Client from '../services/Api';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

const UpdateProfile = ({  }) => {
	const { user_id } = useParams();
    const userId = parseInt(user_id)
	let navigate = useNavigate();
	const initialFormValues = {
		userId: userId,
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		
	};

	const [formValues, setFormValues] = useState(initialFormValues);
    const [user,setUser]=useState([])
	

	const getUserById = async () => {
		const user = await axios.get(
			`${BASE_URL}/users/${user_id}`
		);
        setUser(user.data)
		setFormValues({...user.data});
       
		
	};
	

	const handleChange = (event) => {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const updateUser = await Client.put(
			`${BASE_URL}/users/${user_id}`,
			formValues
		)
			.then((response) => {
				return response;
			})
			.catch((error) => {
				throw error;
			});

		setFormValues(initialFormValues);

		navigate(`/profile/${user_id}`);
	};

	useEffect(() => {
		getUserById();
	}, []);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Update Profile</h1>
				<div>
					<label htmlFor="firstName">First Name:</label>
					<input
						onChange={handleChange}
						name="firstName"
						type="text"
						value={formValues.firstName}
					/>
				</div>
				<div>
					<label htmlFor="lastName">Last Name:</label>
					<input
						onChange={handleChange}
						name="lastName"
						type="text"
						value={formValues.lastName}
					/>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						onChange={handleChange}
						name="email"
						type="email"
						value={formValues.email}
					/>
				</div>
				<div>
					<label htmlFor="phoneNumber">Phone Number:</label>
					<input
						onChange={handleChange}
						name="phoneNumber"
						type="text"
						value={formValues.phoneNumber}
					/>
				</div>
				
				<Button variant="contained" endIcon={<SendIcon/>}>Submit</Button>
			</form>
		</div>
	);
};

export default UpdateProfile;
