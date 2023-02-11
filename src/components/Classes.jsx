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
import {useParams,Link} from 'react-router-dom'


const Classes = ({user,authenticated}) => {
    
 
    const [selectedClass,setSelectedClass]=useState({});
    const [classNumber, setClassNumber] = useState("");
    const [show, setShow] = useState(false);
   

  const { user_id } = useParams();
  const studentId = user_id;

   
  useEffect(() => {
    const fetchClass = async () => {
        const response = await axios.get(
          `${BASE_URL}/userclasses/user/${studentId}`
        );
        setSelectedClass(response.data[0].class_list);
      };
    fetchClass();
  }, [studentId]);


const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(false);
    setSelectedClass([]);

    const response = await axios.get(`${BASE_URL}/userclasses/user/${studentId}`);
    const updatedSelectedClass = response.data[0].class_list;

    if (updatedSelectedClass) {
        const matchingClass = updatedSelectedClass.find(cls => parseInt(cls.id) === parseInt(`${classNumber}`));
        console.log(matchingClass)
        if (matchingClass) {
            setSelectedClass(matchingClass)
            setShow(true);
        } else {
            setShow(false);
        }
    }
};



return (
    <Grid container component="main" sx={{height:"auto"}}>   
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
           
         {show ?(
        <Grid sx={{py:5}} >
            <Card sx={{height:'450px',display:'flex',flexDirection:'column'}}>
            <Typography  variant="h5" component ="h2">
        {selectedClass.class}
       </Typography>
                <CardMedia component="img" sx={{pt:'.25%',height:'275px'}} image={selectedClass.picture}/>
                <CardContent sx={{flexGrow:1}}>
                <Typography   variant="body2" component ="p">
        {selectedClass.description}
       </Typography>
       <CardActions>
      
        <Link to={`/privateTraining/${user.id}/${classNumber}`}>
        <Button size="small"> Book</Button>
        </Link>
       </CardActions>
   
    </CardContent>
    </Card>
    </Grid>
    ):(
        <Typography align="center" color="error">
          You are not enrolled for that class. Please try again!
        </Typography>
      )}
    </Container>
    </Grid>
);



};

export default Classes;