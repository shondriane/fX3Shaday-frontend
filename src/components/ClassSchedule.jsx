import React from 'react'
import axios from 'axios'
import{useState} from 'react'
import { BASE_URL } from '../globals'
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

const ClassSchedule = ({user,authenticated}) => {
    const [getClasses,setClasses]= useState([])
   
let navigate=useNavigate()

    const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
        setClasses(response.data)
       
        
    }


    useEffect(()=>{
        classes()
       
        
      
       },[user,classes]) 
       
      

    
     
    
    


       const handleSubmit = async (e,id) => {
        e.preventDefault()
    if(!authenticated && !user){
        navigate('/register')
    }

     
          await axios.post(`${BASE_URL}/userclasses/user/${user.id}/class/${id}`,{
            userId:user.id,
            classId:id
          })
          .then((response)=>{
              return response
          }).catch((error)=>{
              console.error(error)
          })
          navigate(`/myClasses/${user.id}`)
        
         
        
      }
    return (
      <div>
      <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
           backgroundColor:"white"
          }}
        >
             <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              mb="55"
            >
            Upcoming Class Schedule
            
            </Typography>
      
       
        
        {getClasses?.map((session)=>( 
           
            <Card  sx={{display:'flex',justifyContent:"center",pb:2,mt:3,bgcolor:"pink"}}>
            <Box sx={{display:'flex', flexDirection:'column'}}>
        <CardContent sx={{flex:'2 0 auto'}} >
            <Typography component="div" variant="h5">
            {session.class}
            </Typography>
            <Typography variant ="subtitle1" component="div">
               {session.date=new Date(session.date).toLocaleDateString('en-us')} {session.time} 
               </Typography>
               <Typography variant ="subtitle1" component="div">
                ${session.cost} per session
               </Typography>
               </CardContent>
               <Box sx={{display:'flex',alignItems:'center',p1:1,pb:1}}>
               
               </Box>
               </Box>
               <CardMedia component="img" sx={{width:150, height:150}} image={session.picture}>
               </CardMedia>

               <Typography sx={{pt:3,pl:5}}>
                    Add Class to Schedule
                    <AddIcon sx={{mt:2}}onClick={(e)=>handleSubmit(e,session.id)} ></AddIcon>
                    <Link to="/privateTraining">
            <Button size="small"> Book</Button>
            </Link>
                </Typography>
               
              
             
              
             
                
         </Card>
         
          ))}

        
         </Box>
      </div>
    )
  }
  
  export default ClassSchedule