import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { BASE_URL } from '../globals';
import {useParams,useNavigate,Link} from 'react-router-dom'


const Classes = ({classData,user,authenticated}) => {
    
    const [selectedClass,setSelectedClass]=useState([])
    let {class_id}=useParams()
    let navigate=useNavigate()
	
    const session= async()=>{
        const response=await axios.get(`${BASE_URL}/classes/${classData.id}`)
        setSelectedClass(response.data)
    }

    useEffect(()=>{
        session()
    })

    const handleSubmit = async (e,id) => {
        e.preventDefault()
    if(!authenticated && !user){
        navigate(`/register`)
    }
    else{
        navigate(`/myClasses/${user.id}`)
    }
}
	return (
		<Container sx={{py:8}} maxWidth="sm">
            
            <Grid >
                <Card sx={{height:'650px',display:'flex',flexDirection:'column'}}>
                <Typography gutterBottom="false" variant="h5" component ="h2">
            {classData.class}
           </Typography>
                    <CardMedia component="img" sx={{pt:'.25%',height:'400px'}} image={classData.picture}/>
                    <CardContent sx={{flexGrow:1}}>
                    <Typography  gutterBottom="false"variant="h5" component ="h2">
            {classData.description}
           </Typography>
           <CardActions>
            <Link to="/privateTraining">
            <Button size="small"> Book</Button>
            </Link>
           
      {authenticated && user &&(
        <Link to ={`myClasses/${user.id}`}> 

  </Link>
     ) }         
 
   {!authenticated && !user &&(<Link to ={`/register`} size ="medium" color="Green">
    <button sx={{pl:20}} size ="medium" > Join </button></Link>)
}
           
           
            
          
           </CardActions>
       
        </CardContent>
        </Card>
        </Grid>
		</Container>
        
	);
};

export default Classes;