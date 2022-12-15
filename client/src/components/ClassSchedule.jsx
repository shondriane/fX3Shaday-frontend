import React from 'react'
import axios from 'axios'
import{useState} from 'react'
import { BASE_URL } from '../globals'
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import {List,ListItem,ListItemText} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const ClassSchedule = ({user}) => {
    const [getClasses,setClasses]= useState([])
    const[time,setTime]=useState('')
    const[date,setDate]=useState('')
    let newDate=[]
let navigate=useNavigate()

    const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
        setClasses(response.data)
       
        
    }
// 	 const formatDate = (getClasses) => {
//          getClasses.forEach(ele=>{
//   ele.date=new Date(ele.date).toLocaleDateString('en-us')
//   ele.time = new Date(ele.time).toLocaleTimeString('en-us')
//   newDate.push(ele)
//      })
// 	};

    useEffect(()=>{
        classes()
        //  formatDate()
        
      
       },[user,classes]) 
       
      

    
     
    
    


       const handleSubmit = async (e,id) => {
        e.preventDefault()
       
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
        <CardContent sx={{flex:'1 0 auto'}} >
            <Typography component="div" variant="h5">
            {session.class}
            </Typography>
            <Typography variant ="subtitle1" component="div">
               {session.date=new Date(session.date).toLocaleDateString('en-us')} {session.time} 
               </Typography>
               </CardContent>
               <Box sx={{display:'flex',alignItems:'center',p1:1,pb:1}}>
               
               </Box>
               </Box>
               <CardMedia component="img" sx={{width:151}} image={session.picture}>
               </CardMedia>

               <Typography sx={{pt:3,pl:5}}>
                    Add Class to Schedule
                </Typography>
               <AddIcon sx={{mt:3}}onClick={(e)=>handleSubmit(e,session.id)} ></AddIcon>
                
                
         </Card>
         
          ))}

        
         </Box>
      </div>
    )
  }
  
  export default ClassSchedule