import React from 'react'
import {InlineWidget} from 'react-calendly'
import { PayPalScriptProvider,PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { BASE_URL } from '../globals'
import Client from '../services/Api';
import { useParams, useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID

 const PrivateTraining =()=>{
  const { user_id } = useParams();
	const userId = parseInt(user_id)
  const {class_id}= useParams()
  const classId=parseInt(class_id)
  const [user,setUser]=useState("")
  const [cost,setCost]=useState([])
 const [price,setPrice]=useState(0)
  let navigate = useNavigate();

  const getUser = async()=>{
    const res = await axios.get(`${BASE_URL}/users/${userId}`)
    setUser(res.data.firstName)
  }
  const getClass= async()=>{
    const res = await axios.get(`${BASE_URL}/classes/${classId}`)
    setPrice(res.data.cost)
    setCost(res.data)
    console.log(price)
  }
  useEffect(()=>{
   getUser()
   getClass()
  },[price])

  const initialOptions = {
    "client-id": CLIENT_ID,
    currency: "USD",
    intent: "capture",
   
}

   

    const AddToSchedule=async()=>{
    
      await axios.post(`${BASE_URL}/userclasses/user/${userId}/class/${classId}`,{
        userId:userId,
        classId:classId
      })
      .then((response)=>{
          return response
      }).catch((error)=>{
          console.error(error)
      })
      navigate(`/myClasses/${userId}`)
            };
          

    return(
     



      <div >
        <Container component="main">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', 
            }}
          >
            
               {<Avatar sx= {{bgcolor:"red", mb:5,mt:2}} aria-label="company" >FX3</Avatar>}
            
            <Typography component="h6" variant="h7" sx={{marginBottom:5}}>
             Hi, {user} I look forward to seeing you at the {cost.class}.
            </Typography>
            <Typography component="h1" variant="h5"   >
              The cost is ${cost.cost} and you can pay via:
            </Typography>
            <Grid Container spacing={2} sx={{mt:3}}>
            <PayPalScriptProvider  options={initialOptions}>
            <PayPalButtons
               createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: `${price}`
                            },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;
                    alert(`Transaction completed by ${name}`);
                    AddToSchedule()
                });
            }}
            />
        </PayPalScriptProvider>
       </Grid>
        </Box>
        </Container>



</div>

  

    )
}

export default PrivateTraining