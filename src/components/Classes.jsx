import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { BASE_URL } from '../globals';
import {useParams,useNavigate,Link} from 'react-router-dom'


const Classes = ({classData,user,authenticated}) => {
    
    const [selectedClass,setSelectedClass]=useState([])
   const [getClass,setClass] =useState("")
   const [show,setShow]=useState(false)
   
const handleChange =(e)=>{
    setClass(e.target.value)
    setShow(true)
}

    let {class_id}=useParams()
    let navigate=useNavigate()
	
    const session= async()=>{
        const response=await axios.get(`${BASE_URL}/classes/${getClass}`)
        setSelectedClass(response.data)
    }

    useEffect(()=>{
         session(getClass)
        
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
        <Grid container component="main" sx={{height:'100vh'}}>
           
            
          
		<Container sx={{py:8}} maxWidth="sm">
        <Typography component="h1" variant="h5" sx={{bottom:25}}>
              Input your class number to pay for private session
            </Typography>
               <TextField

    



 name="classNumber"
 type="text"
value={getClass}
onChange={handleChange}
 required
 label="Class Number"
                  autoFocus
                  sx={{bottom: 15, top:20}}
                />
             {show &&(
            <Grid sx={{py:5}} >
                <Card sx={{height:'650px',display:'flex',flexDirection:'column'}}>
                <Typography  variant="h5" component ="h2">
            {selectedClass.class}
           </Typography>
                    <CardMedia component="img" sx={{pt:'.25%',height:'375px'}} image={selectedClass.picture}/>
                    <CardContent sx={{flexGrow:1}}>
                    <Typography   variant="h5" component ="h2">
            {selectedClass.description}
           </Typography>
           <CardActions>
          
            <Link to={`/privateTraining/${user.id}/1`}>
            <Button size="small"> Book</Button>
            </Link>
               
 
   {!authenticated && !user &&(<Link to ={`/register`} size ="medium" color="Green">
    <button sx={{pl:20}} size ="medium" > Join </button></Link>)
}
           
           
            
          
           </CardActions>
       
        </CardContent>
        </Card>
        </Grid>
        )}
		</Container>
        </Grid>
        
	);
};

export default Classes;