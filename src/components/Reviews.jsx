
import React from 'react'
import{useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';


const Review =({id,comment,rating,name})=>{

 
    return(
      <div sx={{mx:'auto'}}padding="2%">
       
        <Box  component ="span" sx={{display:'column'}}>
        <Grid  className="reviewRatings" container spacing={4} direction="flex" flexWrap="wrap"alignItems="center" justify="center" margin="auto" padding="2%" width="70%">
      
       <Card  sx={{display: 'flex', flexGrow:1} }>
        <CardContent>
            <Typography>
                {name}
            </Typography>
          <Typography  color="purple" >
            Level  of Fun
          </Typography>
          <Rating name="read-only" value={rating} readOnly />
          <Typography variant="h5" component="div">
      {comment}
      </Typography>
        </CardContent>
         
        </Card>
     
      </Grid>
         
      </Box>
   
      </div>
     
    )
}

export default Review