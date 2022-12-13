import React from 'react'
import axios from 'axios'
import{useState} from 'react'
import { BASE_URL } from '../globals'
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const ClassSchedule = ({user}) => {
    const [getClasses,setClasses]= useState([])
   
let navigate=useNavigate()
console.log(user.id)
    const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
        setClasses(response.data)
        console.log(response.data)
        
    }
    useEffect(()=>{
        classes()
        
      
      
       },[user]) 

     

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
         navigate(`/userclasses/user/${user.id}`)
         
        
      }
    return (
      <div>
        
            <ul>
            {getClasses?.map((session)=>( 
        
            <li key={session.id}>
               {session.class} {session.time} ${session.cost}.00 <AddIcon onClick={(e)=>handleSubmit(e,session.id)} ></AddIcon>
                </li> 
                
           
         ))}
         </ul> 
      </div>
    )
  }
  
  export default ClassSchedule