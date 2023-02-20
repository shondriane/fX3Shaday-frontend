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

const classes = async () => {
  const response = await axios.get(`${BASE_URL}/classes/`);
  const newClass = response.data
    .filter(classData => {
      const classDate = classData.date.slice(0, 10);
      return classDate >= new Date().toISOString().slice(0, 10) && classData.capacity !== 0;
    })
    .map(classData => {
      const date = classData.date.slice(0, 10);
      const formattedDateStr = moment(date, 'YYYY-MM-DD').format('MM-DD-YY');
      const day = moment(formattedDateStr, 'MM-DD-YY').format('dddd');
      const end = moment(formattedDateStr, 'MM-DD-YY').add(11, 'weeks').format('MM-DD-YY');
      const formatTime = moment(classData.time, 'HH:mm');
      const time = formatTime.format('h:mm A');
      return {
        ...classData,
        date: formattedDateStr,
        day,
        end,
        time
      };
    });
  setClasses(newClass);
};


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
            <th >Class</th>
            <th >Day</th>
            <th >Time</th>
            <th >Start Date</th>
            <th >End Date</th>
            <th >Cost</th>
            <th >Schedule</th>
          </tr>

         
  {getClasses?.map((session)=>( 
  <tr  key={session.class}> 

  <td className="show" >
                {session.class}
              </td>
              <td className="hide">{session.day}'s</td>
              <td className="hide">{session.time}</td>
              <td className="hide">{session.date}</td>
              <td className="hide">{session.end}</td>
              <td className="hide">${session.cost}</td>
              <td className="hide"><button className="join-cs" onClick={(e)=>handleSubmit(e,session.id)} size="small">Join</button></td>
  </tr>
  ))}         



  </tbody>      
         </table>
        
      </div>
    )
  }
  
  export default ClassSchedule