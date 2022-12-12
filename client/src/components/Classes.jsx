import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Register from './Register'
import Client from '../services/Api'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { BASE_URL } from '../globals';
import {useParams,useNavigate} from 'react-router-dom'


const Classes = ({classData}) => {
    const [selectedClass,setSelectedClass]=useState([])
    let {class_id}=useParams()
    let navigate=useNavigate()
	
    const session= async()=>{
        const response=await axios.get(`${BASE_URL}/classes/${class_id}`)
        setSelectedClass(response.data)
    }

    useEffect(()=>{
        session()
    })
	return (
		<Container sx={{py:8}} maxWidth="sm">
            
            <Grid >
                <Card sx={{height:'50%',display:'flex',flexDirection:'column'}}>
                <Typography gutterBottom variant="h5" component ="h2">
            {classData.class}
           </Typography>
                    <CardMedia component="img" sx={{pt:'.25%'}} image={classData.picture}/>
                    <CardContent sx={{flexGrow:1}}>
                    <Typography gutterBottom variant="h5" component ="h2">
            {classData.description}
           </Typography>
           <CardActions>
            <Button size="small"> See Schedule</Button>
            <Button size="small"> Book Session</Button>
           </CardActions>
       
        </CardContent>
        </Card>
        </Grid>
		</Container>
        
	);
};

export default Classes;