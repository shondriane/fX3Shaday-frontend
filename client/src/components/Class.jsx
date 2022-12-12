import {useState,useEffect} from 'react'
import axios from 'axios'
import { BASE_URL} from '../globals'
import Classes from './Classes'


const Class=()=>{
    const [getClasses,setClasses]= useState([])
 
    const classes = async () => {
            const response = await axios.get(
                `${BASE_URL}/classes/`
            );
            setClasses(response.data)
            console.log(response.data)
            
        }
        
     useEffect(()=>{
      classes()
     },[])   

     return(
        <div>
            {getClasses.map((session,index)=>(
                <Classes  classData={session} key ={index}/>
            ))}
        </div>
     )
}

export default Class