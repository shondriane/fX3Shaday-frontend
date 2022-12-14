import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';
import Client from '../services/Api';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { CssBaseline } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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

		await Client.put(
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
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<Box sx={{marginTop:8,display:'flex',flexDirection:'column',alignItems:'center'}}>
				<Typography component="h1">Update Profile</Typography>
				<Box component ="form" onSubmit={handleSubmit} sx={{mt:3}}>
				<Grid container spacing={2}>
              <Grid item xs={12}>
					<TextField 
					
						onChange={handleChange}
						name="firstName"
						type="text"
						value={formValues.firstName}
						fullWidth
						label="First Name"
					/>
				</Grid>
				
              <Grid item xs={12}>
				
					<TextField  
						onChange={handleChange}
						name="lastName"
						type="text"
						value={formValues.lastName}
						fullWidth
						label ="Last Name"
					/>
					</Grid>
		
              <Grid item xs={12}>
					
					<TextField
						onChange={handleChange}
						name="email"
						type="email"
						value={formValues.email}
						fullWidth
						label="Email"
					/>
				</Grid>
				
              <Grid item xs={12}>
					<TextField 
					
						onChange={handleChange}
						name="phoneNumber"
						type="text"
						value={formValues.phoneNumber}
						fullWidth
						label="Phone Number"
					/>
				</Grid>
				
				
				<Button variant="contained" fullWidth sx={{mt:3,mb:2}} type="submit" onClick={handleSubmit} endIcon={<SendIcon/>}>Submit</Button>
				</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default UpdateProfile;
