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
import { purple,gray,blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import {Link,useNavigate,usParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { BASE_URL } from '../globals';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from 'moment';


const MyClasses=({user})=>{
    const navigate=useNavigate()
 const [currentClasses,setClasses]= useState([])

 const schedule= async()=>{
    const response=await axios.get(`${BASE_URL}/userclasses/user/${user.id}`)
    const data = response.data[0].class_list;
    const classList = data.map((item) => {
      const date = moment(item.date, 'YYYY-MM-DD').format('MM-DD-YY');
      item.date= date;
      const time = moment(item.time, 'HH:mm').format('h:mm A');
      item.time=time
      return { ...item};
    });
      
   setClasses(classList)
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
<Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              
              mb="55"
            >
            Training
                </Typography>
<Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                <Button sx={{mb:5}}component={Link} variant="contained" to={`/private/${user.id}`}>Private</Button>

            </Stack>
            <Grid>
                {currentClasses.map((schedule)=>(

               
                <Card key={schedule.id} sx={{height:'100%',display:'flex',flexDirection:'column'}}>
                    <CardHeader
                avatar={<Avatar sx= {{bgcolor:purple['400']}} aria-label="company" >FX3</Avatar>}
                title= {schedule.class}
                subheader={schedule.date} 
                
                />
                   
                    <CardContent sx={{bgcolor:"lightgray",flexGrow:1}}>
                    <Typography   variant="h5" component ="h2">
                        Scheduled on {schedule.date=new Date(schedule.date).toLocaleDateString('en-us')} at {schedule.time}
           </Typography>
           <CardActions >
        Review
           <IconButton key ={schedule.id}onClick={(e)=>handleClick(e,schedule.id)}style={{color:purple['400']}}>
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