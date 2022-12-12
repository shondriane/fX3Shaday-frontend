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





const TestComponent = () => {
const [getClasses,setClasses]= useState([])
const [reviews, setReviews] = useState([])
 
const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
        setClasses(response.data)
        console.log(response.data)
        
    }

 const getReviews = async()=>{
  const response=await axios.get(`${BASE_URL}/reviews/`)
  setReviews(response.data)
  console.log(response.data)
 }
	
 useEffect(()=>{
  classes()
  getReviews()


 },[])    

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
       
              <Button variant="contained" component={Link} to="/classes">Class Schedule</Button>
              
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
        <Container sx={{ py: 8 }} maxWidth="md">
<Grid container spacing={8}>
 



{ reviews?.map((review)=>(
 
    <Grid item key={review.id} xs={12} sm={6}md={6}>
       
    <Card
    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    <CardContent >
      <Typography sx={{fontSize:14}}>
       Level  {review.rating} Fun
      </Typography>
      <Typography>
        {review.comment}
      </Typography>
    </CardContent>
    
   
  </Card>
 
  </Grid>

  
))} 

     </Grid>
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
