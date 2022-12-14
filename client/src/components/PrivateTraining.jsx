import React from 'react'
import 'date-fns'
import Grid from '@mui/material'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickerUtilsProvider,KeyboardTimePicker,KeyboarddatePicker} from '@material/pickers'


const PrivateTraining =({user})=>{
    const [formValues,setFormValues]=useState=(initialValues)
const initialValues ={
    time: '',
    date:'',
}




const handleChange=(e)=>{
    setFormValues({...formValues,[e.target.name]:e.target.value})
}

    return(
        <div>
<MuiPickersUtilsProvider utils={DateFnsUtils}>
<Grid container justify ='space-around'>
    <KeyboarddatePicker diableToolbar variant="inline" margin="normal" id="date" label ="Select Date" value={formValues.date} onChange={handleChange}/>
</Grid>
<KeyboardTimePicker margin="normal" id="time" label=" Select Time" onChange={handleChange}/>
</MuiPickersUtilsProvider >
        </div>
    )
}

export default PrivateTraining