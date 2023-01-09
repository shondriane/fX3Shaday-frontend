import axios from "axios"
import {BASE_URL} from '../globals'
import {useEffect,useState} from 'react'

const Students =()=>{

    const [getStudents,setStudents]= useEffect([])

let currentStudents = async()=>{
const response = await axios.get(`${BASE_URL}/userclasses/class/${classId}`)
}

useEffect(()=>{
    currentStudents()
})

    return (
        <div>

        </div>
    )
}

export default Students