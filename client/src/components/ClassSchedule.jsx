import React from 'react'
import axios from 'axios'
import{useState} from 'react'
import { BASE_URL } from '../globals'
import { useEffect } from 'react';


const ClassSchedule = () => {
    const [getClasses,setClasses]= useState([])
    const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
        setClasses(response.data)
        console.log(response.data)
        
    }
useEffect=()=>{
    classes()
}
    return (
      <div>
        
            <ul>
            {getClasses?.map((session)=>(
                <li>
                {session.class} {session.time} {session.cost}
                </li>
           
        ))}
         </ul>
      </div>
    )
  }
  
  export default ClassSchedule