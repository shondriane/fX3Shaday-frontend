import React from 'react'
import axios from 'axios'
import{useState,useEffect} from 'react'
import { BASE_URL } from '../globals'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { createTheme, responsiveFontSizes,ThemeProvider} from '@mui/material/styles';
import moment from 'moment';
import '../styling/ClassSchedule.css'

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ClassSchedule = ({user,authenticated}) => {
    const [getClasses,setClasses]= useState([])
 
let navigate=useNavigate()

    const classes =async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
    let newClass = []
 for (let i=0; i<response.data.length;i++){

  if (response.data[i].date.slice(0,10)>= new Date().toISOString().slice(0,10) && response.data[i].capacity!==0){

    let date = response.data[i].date.slice(0,10)
    let formattedDateStr = moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY');

    response.data[i].date = formattedDateStr
    response.data[i].day = moment(response.data[i].date, 'MM-DD-YYYY').format('dddd')
    response.data[i].end = moment(response.data[i].date, 'MM-DD-YYYY').add(11, 'weeks').format("MM-DD-YY")
    let formatTime = moment(response.data[i].time, 'HH:mm')
    response.data[i].time = formatTime.format('h:mm A')

   newClass.push(response.data[i]);  
  }
 }
 setClasses(newClass)

  }

    useEffect(()=>{
        classes() 
      
       },[]) 
       

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
      <div >
      <TableContainer
          sx={{
            pt: 8,
            pb: 6,
           backgroundColor:"white",
          
          }}
        
        >
          <ThemeProvider theme={theme}>
             <Typography
              component="h1"
              variant="h2"
              align="center"
             mb="5%"
            >
            Upcoming Class Schedule
            
            </Typography>
            </ThemeProvider>
   </TableContainer>
      
            <table>
            <tbody>
              <tr>
            <th>Class</th>
            <th>Day</th>
            <th>Time</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Cost</th>
            <th>Schedule</th>
          </tr>

         
{getClasses?.map((session)=>( 
  
  <tr  key={session.class}> 
  <td  >
                {session.class}
              </td>
              <td >{session.day}'s</td>
              <td>{session.time}</td>
              <td>{session.date}</td>
              <td>{session.end}</td>
              <td>${session.cost}</td>
              <td ><button className="join-cs" onClick={(e)=>handleSubmit(e,session.id)} size="small">Join</button></td>
  </tr>
  ))}       
  </tbody>      
         </table>
        
      </div>
    )
  }
  
  export default ClassSchedule