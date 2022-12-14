
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';

const Review =({id,comment,rating})=>{
let stars=[]

// while(rating>0){
//     stars.push(1)
// }

    return(
      <div>
        <Grid container spacing={4}>
          
        <Card sx={{ minWidth: 450 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }}  gutterBottom>
            Level  of Fun
          </Typography>
          <Rating name="read-only" value={rating} readOnly />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {comment}
          </Typography>
          <Typography variant="body2">
           {Comment}
           
          </Typography>
        </CardContent>
        <CardActions>
         
        </CardActions>
      </Card>
      </Grid>
      </div>
     
    )
}

export default Review