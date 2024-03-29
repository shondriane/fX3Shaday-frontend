import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { useParams} from 'react-router-dom';
import {useState,useEffect} from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const UserClasses =()=>{
const {class_id}=useParams()
const classId=parseInt(class_id)
const [getStudents,setStudents]= useState([])

    let currentStudents = async()=>{
    const response = await axios.get(`${BASE_URL}/userclasses/class/${classId}`)
   
    setStudents(response.data[0].user_list)
    }
   
    useEffect(()=>{
        currentStudents()
    },[])


    return (
        <div>
            <Container component ="main">
                <Box
                sx={{marginTop:6, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography variant="h5" sx={{marginBottom: 4}}>Current Students</Typography>
            <Link to={`/student/${classId}`}>
                <Grid sx={{py:3}}>
             <Button variant="contained" >Add</Button>
             </Grid>
            </Link>
           
            <Grid Container spacing={3} sx={{py:5}}>
         <List sx={{width:'100%', maxWidth:360, bgcolor:"pink"}}>
      
{getStudents.map((ele)=>(
    <ListItem key={ele.id} >
        <ListItemText sx={{color:"blue"}} primary={ele.firstName.toUpperCase() +" "+ ele.lastName.toUpperCase() }  secondary={<Typography
            sx={{dislay:'inline'}}
            component="span"
            sx={{color:"black"}}
variant="body2">
     email: {ele.email}
        </Typography>}/>
       
    </ListItem>
))}
   
 
   
 

 </List>
 </Grid>
 </Box>
 </Container>
        </div>
    )
}

export default UserClasses