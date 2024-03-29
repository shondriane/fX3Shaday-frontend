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
import { useEffect } from 'react';
import Client from '../services/Api';
import { useNavigate,useParams } from 'react-router-dom';
import Reviews from './Reviews'
import { createTheme, responsiveFontSizes,ThemeProvider} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);


const TestComponent = ({user}) => {

const [getClasses,setClasses]= useState([])
const [reviews, setReviews] = useState([])
const [show,setShow]=useState(false)
const navigate = useNavigate()
 let getUserReviews=[]


 let newList=[]
const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
   
    let Categories=[]
    let Object ={}
      for( let i in response.data){
        let categoryTitle= response.data[i].class
        Object[categoryTitle]=response.data[i]
      }
      for(let i in Object){
        Categories.push(Object[i])
      }
      setClasses(Categories)
  }
    
      

 const getReviews = async()=>{
  const response=await axios.get(`${BASE_URL}/reviews/`)
  setReviews(response.data)
 
  
  // setUserReviews(response.data[0].User)
  reviews.forEach((ele)=>{
    if(ele.comment!==null){
      getUserReviews.push(ele)
    }

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






   
  
 
		
  return (
    <>
 
     
      <CssBaseline />
      <main>

  

       
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
              
              <Button variant="outlined" component={Link} to="/schedule">Upcoming Classes</Button>
            </Stack>
          </Container>
        </Box>
   
       

        <Container sx={{ py: 8 }} maxWidth="md">
<Grid container spacing={8}>
 


{getClasses?.map((session)=>(
 
    <Grid key={session.id} item  xs={12} sm={6}md={6}>
       
    <Card 
    sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}
  >
    <CardMedia
      component="img"
      sx={{
         
        pt: '.25%',
       height:'300px'
      }}
      image={session.picture}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography  variant="h5" component="h2">
        {session.class}
      </Typography>
      <Typography>
        {session.description}
      </Typography>          
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
             
              
            >
             Get Results
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              You can see and feel with an 11-week private training or group class
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
       
              <Button variant="contained" component={Link} to="/consultation">Private Training</Button>
              
              <Button variant="outlined" component={Link} to="/schedule">Group Classes</Button>
            </Stack>
          </Container>
        </Box>
        <Box
          sx={{
            bgcolor: 'blue',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <ThemeProvider theme={theme}>
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="white"
              
            >
             Testimonies
            </Typography>
            </ThemeProvider>
         
          </Container>
        </Box>
        <Container id="reviewRatings" maxWidth="md"componenet="main">

{reviews.slice(Math.floor(Math.random()*15),reviews.length).map((review)=>(
<ThemeProvider theme={theme}>
<Reviews
key={review.id}
 id={review.id}
 name={review.name}
 comment={review.comment}
 rating={review.rating}
 />
  </ThemeProvider>
))}






</Container>
      </main>
     
    
    </>
  )
}

export default TestComponent
