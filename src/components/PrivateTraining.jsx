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

  const [cost,setCost]=useState(0)
  const [user,setUser]=useState("")
  let navigate = useNavigate();

  const getUser = async()=>{
    const res = await axios.get(`${BASE_URL}/users/${userId}`)
    setUser(res.data.firstName)
  }
  const getCost= async()=>{
    const res = await axios.get(`${BASE_URL}/classes/${classId}`)
    setCost(res.data)
  }
  useEffect(()=>{
   getUser()
   getCost()
  })

  const initialOptions = {
    "client-id": CLIENT_ID,
    currency: "USD",
    intent: "capture",
   
}



//  document.getElementById()
    // function isCalendlyEvent(e) {
    //     return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
    //   };
       
    //   window.addEventListener("message", function(e) {
    //     if(isCalendlyEvent(e)) {
    //       /* Example to get the name of the event */
    //       console.log("calendly:", e.data.date);
    //       console.log("time:",e.data.time)
    //       console.log("email:",e.data.email)
          
    //       /* Example to get the payload of the event */
    //       console.log("Event details:", e.data.payload);
    //     }
    //   });
   

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
     



      <div class="calendly-inline-widget">
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
         <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
               createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: {cost},
                            },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;
                    alert("Transaction completed");
                    AddToSchedule()
                });
            }}
            />
        </PayPalScriptProvider>
       </Grid>
        </Box>
        </Container>
{/* <InlineWidget
        url="https://calendly.com/shondriane-wise/60min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=ff2500" 
        type="text/javascript"
        text="Click here to schedule time with me!"
        src="https://assets.calendly.com/assets/external/widget.js" async
        onClick
        
        
      /> */}


</div>

  

    )
}

export default PrivateTraining