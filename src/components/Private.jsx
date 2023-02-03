
import React from 'react'
import {useCalendlyEventListener,InlineWidget} from 'react-calendly'




const Private=()=>{

    function isCalendlyEvent(e) {
        return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
      };

      window.addEventListener("message", function(e) {
        if(isCalendlyEvent(e)) {
          /* Example to get the name of the event */
          console.log("calendly:", e.data.date);
          console.log("time:",e.data.time)
          console.log("email:",e.data.email)

          /* Example to get the payload of the event */
          console.log("Event details:", e.data.payload);
        }
      });
  

     return(
        
 
     
        
        <div class="calendly-inline-widget">
         <InlineWidget
        url="https://calendly.com/shondriane-wise/30min" style="min-width:320px;height:630px;" 
        type="text/javascript"
        text="Click here to schedule time with me!"
        src="https://assets.calendly.com/assets/external/widget.js" async
        onClick


      />


</div>    
   
     )
}

export default Private