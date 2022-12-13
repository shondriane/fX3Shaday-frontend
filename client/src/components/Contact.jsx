import React from 'react'
import '../index.css'
import {Screen} from '../assets/screen'
import {Link} from 'react-router-dom'

 Contact=()=>{


    return(
        <div className="sidebar">
        <ul>
       
{Screen.map((screen)=>{
<li key={screen.id}>
<div>
<Link to='{screen.link'>
{screen.icon}
</Link>
</div>
<div>{screen.title}</div>

</li>
})}
</ul>
        </div>
    )
}

export default Contact