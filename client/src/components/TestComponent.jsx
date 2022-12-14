import React from 'react'
import axios from 'axios'
import{useState} from 'react'
import { BASE_URL } from '../globals'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import ClassSchedule from './ClassSchedule'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Client from '../services/Api';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { CardHeader } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Reviews from './Reviews'

const TestComponent = () => {
const [getClasses,setClasses]= useState([])
const [reviews, setReviews] = useState([])
const[userReviews,setUserReviews]=useState([])
const [oldList,setList]=useState([])
const [show,setShow]=useState(false)
const navigate = useNavigate()
 let getUserReviews=[]

 let newList=[]
const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
        setClasses(response.data)
      
        
    }

 const getReviews = async()=>{
  const response=await axios.get(`${BASE_URL}/reviews/`)
  setReviews(response.data)
 
  
  // setUserReviews(response.data[0].User)
  reviews.forEach((ele,index)=>{
    getUserReviews.push(ele.User)
  })

  getUserReviews.forEach((review)=>{
   reviews.forEach((ele)=>{
    if (ele.userId ===review.id && ele.comment!==null){
      newList.push({comment:ele.comment,rating:ele.rating,name:review.firstName})
     
    }
   })
  })
 

 }

	
 useEffect(()=>{
  classes()
  getReviews()


 },[])    



 const handleDeleteClick = async (e,id) => {
  await Client.delete(`${BASE_URL}/classes/${id}`,{
    classId:id
  });
navigate(`/classes`)
};

const handleClick=async(e,id)=>{
setShow(true)
}

const handleUpdateClick = () => {
  navigate(`/classes`);
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="FX3shaday.com">
        FX3Shaday
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
    
  
  const theme= createTheme()
		
  return (
    <>
 
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
             FX3 Shaday
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              In-Person and Online personal training with Courtney Martin
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
       
              <Button variant="contained" component={Link} to="/contact">Contact Me</Button>
              
              <Button variant="outlined" component={Link} to="/schedule">Schedule Training Session</Button>
            </Stack>
          </Container>
        </Box>
   
        {/* End hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">
<Grid container spacing={8}>
 


{getClasses?.map((session)=>(
 
    <Grid item key={session.id} xs={12} sm={6}md={6}>
       
    <Card
    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    <CardMedia
      component="img"
      sx={{
         
        pt: '.25%',
      }}
      image={session.picture}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="h2">
        {session.class}
      </Typography>
      <Typography>
        {session.description}
      </Typography>
      <CardActions>
     
          
	
            <Button  component={Link} to={`/updateClass/${session.id}`} size="small"> Update</Button>
            <Button onClick={(e)=>handleClick(e,session.id)}size="small"> Delete </Button>
           </CardActions>
           { show &&(
					 <div id ="id01" className="modal">
                    
                     <form className="modal-content">
                         <div className="container">
<h1>
Delete Class
</h1>
<p>
Are you sure you want to delete the Class?
</p>
                        
                         
                   <div class="clearfix">
                   <Button variant="contained" endIcon = {<ClearIcon/>} onClick={handleUpdateClick}>
                         cancel
                     </Button>
                     <Button variant="outlined"  startIcon={<DeleteIcon/>} onClick={(e)=>handleDeleteClick(e,session.id)}>
                         Delete 
                     </Button>
                    
                     </div>
                 </div>
                 </form>
                 </div>
                )}
    </CardContent>
    
   
  </Card>
 
  </Grid>

  
))} 

     </Grid>
        </Container>

        
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
             Testimonies
            </Typography>
           
         
          </Container>
        </Box>
        <Container maxWidth="md"componenet="main">



 { reviews?.map((review)=>(
<Reviews
 id={review.id}
 name={review.name}
 comment={review.comment}
 rating={review.rating}
 />
))}






</Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
       
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Get Fit, Be Fabulous and Have Fun!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
    </>
  )
}

export default TestComponent
