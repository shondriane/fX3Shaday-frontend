import React from 'react'
import axios from 'axios'
import{useState,useEffect} from 'react'
import { BASE_URL } from '../globals'
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete'
import Client from '../services/Api';
import { useNavigate,useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom';


const Admin= async({user})=>{

    let navigate = useNavigate()
    const [getClasses,setClasses]= useState([])
    const [show,setShow]=useState(false)
  

    const classes = async () => {
		const response = await axios.get(
			`${BASE_URL}/classes/`
		);
        setClasses(response.data)
         
    }

    useEffect(()=>{
        classes()
       },[])  
    const handleDeleteClick = async (e,id) => {

        await Client.delete(`${BASE_URL}/classes/${id}`,{
          classId:id
        });
      navigate(`/classes`)
      
      };
      
      const handleClick=async(e,id)=>{
      setShow(true)
      }
      
      const handleUpdateClick = () => {
        navigate(`/classes`);
      };
      

    return (
       <div>


      <a  target="_blank" href="https://calendar.google.com/calendar/u/1?cid=Zngzc2hhZGF5QGdtYWlsLmNvbQ">
<button>
    See Schedule
</button>
</a>

         <Container sx={{ py: 8 }} maxWidth="md">
<Grid container spacing={8}>
 


{getClasses?.map((session)=>(
 
    <Grid item key={session.id} xs={12} sm={6}md={6}>
       
    <Card
    sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}
  >
    <CardMedia
      component="img"
      sx={{
         
        pt: '.25%',
       height:'300px'
      }}
      image={session.picture}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="h2">
        {session.class}
      </Typography>
      <Typography>
        {session.description}
      </Typography>
     
     
      <CardActions>
     
          
	
            <Button  component={Link} to={`/updateClass/${session.id}`} size="small"> Update</Button>
            <Button onClick={(e)=>handleClick(e,session.id)}size="small"> Delete </Button>
           </CardActions>
     
           {show &&(
					 <div id ="id01" className="modal">
                    
                     <form className="modal-content">
                         <div className="container">
<h1>
Delete Class
</h1>
<p>
Are you sure you want to delete the Class?
</p>
                        
                         
                   <div class="clearfix">
                   <Button variant="contained" endIcon = {<ClearIcon/>} onClick={handleUpdateClick}>
                         cancel
                     </Button>
                     <Button variant="outlined"  startIcon={<DeleteIcon/>} onClick={(e)=>handleDeleteClick(e,session.id)}>
                         Delete 
                     </Button>
                    
                     </div>
                 </div>
                 </form>
                 </div>
                )}
                
    </CardContent>
    
   
  </Card>
 
  </Grid>

  
))} 

     </Grid>
        </Container>
       
       </div>
    )
}

export default Admin