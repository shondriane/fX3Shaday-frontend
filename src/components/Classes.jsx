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
import axios from 'axios';
import { useEffect,useState } from 'react';
import { BASE_URL } from '../globals';
import {useParams,useNavigate,Link} from 'react-router-dom'


const Classes = ({user,authenticated}) => {
    
    const [selectedClass,setSelectedClass]=useState()
    const [classNumber, setClassNumber] = useState(0);
    const [show, setShow] = useState(false);

  const { user_id } = useParams();
  const studentId = user_id;

let data ={}
  const fetchClass = async () => {
    const response = await axios.get(`${BASE_URL}/userclasses/user/${studentId}`);
    setSelectedClass(response.data[0].class_list)
    console.log(selectedClass)
  
  };
   
  useEffect(() => {
    fetchClass();
  }, [studentId]);

const handleChange =(e)=>{
    setClassNumber(e.target.value)
   
}
const handleSubmit = async (e) => {
    e.preventDefault();
    if(Object.values(selectedClass.includes(`${classNumber}`))){
        console.log("yes")
        setShow(true)
        let findIndexById = selectedClass.findIndex(item => parseInt(item.id) === parseInt(`${classNumber}`))
      
      setSelectedClass(selectedClass[findIndexById])
    }
    else {
      alert("class number is not a match, please try again");
    }
  };



	return (
        <Grid container component="main" sx={{height:'100vh'}}>   
		<Container sx={{py:8}} maxWidth="sm">
        <Typography    component="h5"
              variant="h5"
              align="center"
              color="text.primary"
              
              mb="55" sx={{bottom:25}}>
              Input your class number to pay for a private session
            </Typography>
            
               <TextField
 name="classNumber"
 type="text"
value={classNumber}
onChange={(e)=>setClassNumber(e.target.value)}
 required
 label="Class Number"
                  autoFocus
                  sx={{bottom: 15, top:20}}
                
                />
            
                <Button sx={{mt:5}} justifyContent="center" size="small" onClick={handleSubmit}>Submit</Button>
               
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
          
            <Link to={`/privateTraining/${user.id}/${classNumber}`}>
            <Button size="small"> Book</Button>
            </Link>
               
 
   {!authenticated && !user &&(<Link to ={`/register`} size ="medium" color="Green">
    <button sx={{pl:20}} size ="medium" > Join </button></Link>)
}
           
           
            
          
           </CardActions>
       
        </CardContent>
        </Card>
        </Grid>
        )
        }
		</Container>
        </Grid>
        
	);
};

export default Classes;