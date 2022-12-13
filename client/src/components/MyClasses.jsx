import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import {Link,useNavigate,usParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { BASE_URL } from '../globals';
import AddReview from './AddReview';

const MyClasses=({user})=>{
    const navigate=useNavigate()
 const [currentClasses,setClasses]= useState([])

 const schedule= async()=>{
    const response=await axios.get(`${BASE_URL}/userclasses/user/${user.id}`)
    setClasses(response.data[0].class_list)
   
   
}
const handleClick = (e,id) => {
    navigate(`/addReview/${id}`);
};

 useEffect(()=>{
schedule()
 },[])

  
    return (
        <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
<Container sx={{py:8}} maxWidth="sm">
            
            <Grid>
                {currentClasses.map((schedule)=>(

               
                <Card sx={{height:'100%',display:'flex',flexDirection:'column'}}>
                    <CardHeader
                avatar={<Avatar sx= {{bgcolor:red[500]}} aria-label="company" >FX3</Avatar>}
                title= {schedule.class}
                subheader={schedule.date} 
                
                />
                   
                    <CardContent sx={{flexGrow:1}}>
                    <Typography gutterBottom variant="h5" component ="h2">
            {schedule.time}{schedule.date}
           </Typography>
           <CardActions>
           <IconButton key ={schedule.id}onClick={(e)=>handleClick(e,schedule.id)}style={{color:"red"}}>
<FavoriteIcon/>
           </IconButton>
         

           </CardActions>
       
        </CardContent>
        </Card>
         ))}
        </Grid>
		</Container>
        </Box>
      
    )
  }

 

export default MyClasses