
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';

const Review =({id,comment,rating,name})=>{




    return(
      <div >
        <Box  component ="span" sx={{display:'column', mx:'2px',justifyConent:"center", alignItems:"center"}}>
        <Grid  className="reviewRatings" container spacing={4} direction="flex" flexWrap="wrap"alignItems="center" justify="center">
          
       <Card  sx={{display: 'flex', flexGrow:1}}>
        <CardContent>
            <Typography>
                {name}
            </Typography>
          <Typography sx={{ fontSize: 14 }} color="red" gutterBottom>
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