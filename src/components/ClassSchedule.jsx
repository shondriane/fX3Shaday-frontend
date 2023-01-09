import React from 'react'
import axios from 'axios'
import{useState,useEffect} from 'react'
import { BASE_URL } from '../globals'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


const ClassSchedule = ({user,authenticated}) => {
    const [getClasses,setClasses]= useState([])
let newClass = []


   
let navigate=useNavigate()



    const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
    // setClasses(response.data)

 for (let i=0; i<response.data.length;i++){

  if (response.data[i].date.slice(0,10)>= new Date().toISOString().slice(0,10)){
    let date= new Date (response.data[i].date)
    let eleven = new Date (date.getTime()+77*24*60*60*1000)
    let finish = eleven.toLocaleDateString().slice(0,10)
    

  let dayOfWeek = date.toLocaleDateString('en-us',{weekday:'long'})
    response.data[i].date= dayOfWeek+ "," +" "+response.data[i].date.slice(0,10)
 
    let hours = response.data[i].time.slice(0,2)
    let amOrpm= hours >= 12 ? 'pm': 'am'
    hours =(hours%12)||12
    let minutes = response.data[i].time.slice(3,5)
 
     response.data[i].time = dayOfWeek+" " + "at " +hours + ":" + minutes+ " "+ amOrpm +" until " + finish
    newClass.push(response.data[i])
    
  }
 }
 setClasses(newClass)

  }




    useEffect(()=>{
        classes() 
      
       },[getClasses]) 
       

       const handleSubmit = async (e,id) => {
        e.preventDefault()
    if(!authenticated || !user){
        navigate('/register')
    }

     else{
      
navigate(`/privateTraining/${user.id}/${id}`) 
        
        }
  
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
           
            <Typography color="blue" variant ="subtitle1" component="div">
              
            { session.date= new Date(session.date).toLocaleDateString('en-us')} every {session.time} 
               </Typography>
               <Typography variant ="subtitle1" component="div">
                ${session.cost} for 11-week session
               </Typography>
               </CardContent>
               <Box sx={{display:'flex',alignItems:'center',p1:1,pb:1}}>
               
               </Box>
               </Box>
               <CardMedia component="img" sx={{width:150, height:150}} image={session.picture}>
               </CardMedia>

               <Typography sx={{pt:3,pl:5}} >
          
            <Button onClick={(e)=>handleSubmit(e,session.id)} size="small" > Book Session and Make Payment</Button>
           
                </Typography>
               
              
             
              
             
                
         </Card>
         
          ))}

        
         </Box>
      </div>
    )
  }
  
  export default ClassSchedule