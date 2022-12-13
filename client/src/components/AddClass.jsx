import axios from 'axios'
import { useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import { useEffect } from 'react'


const AddClass= ({user,authenticate}) => {
    const navigate = useNavigate()
    const initialFormValues = {
   
      class:'',
      description:'',
      picture:'',
      time:'',
      date:'',
      capacity:'',
      cost:''
     
      
    }
  
    const [formValues, setFormValues] = useState(initialFormValues)
    const [classes,setClasses]=useState([])
  
    const getClasses=async()=>{
        const response=await axios.get(`${BASE_URL}/classes`)
        setClasses(response.data)
    }
  
    useEffect(()=>{
getClasses()
    },[user])

    const handleChange = (e) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
     
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
        await axios.post(`${BASE_URL}/userClasses/user/${userId}/classes/`,formValues)
        .then((response)=>{
            return response
        }).catch((error)=>{
            console.error(error)
        })
        setFormValues(initialFormValues)
        navigate('/schedule')
      
    }

    return (
      <div>
          <form onSubmit={handleSubmit}>
				<h1>Creating New Activity</h1>
				<div>
					<label htmlFor="name"> Activity Name: </label>
					<input
						type="text"
						name="name"
						onChange={handleChange}
						value={formValues.name}
					/>
				</div>
				<div>
					<label htmlFor="categoryId">Add Category: </label>
					<select
						name="categoryId"
						onChange={handleChange}
						value={formValues.categoryId}
					>
						<option defaultValue="select category">
							Select Category
						</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label>Date: </label>
					<input
						type="date"
						name="date"
						onChange={handleChange}
						value={formValues.date}
					/>
				</div>
				<div>
					<label>Time: </label>
					<input
						type="time"
						name="time"
						onChange={handleChange}
						value={formValues.time}
					/>
				</div>
				<div>
					<label>Street Address:</label>
					<input
						type="text"
						name="streetAddress"
						onChange={handleChange}
						value={formValues.streetAddress}
					/>
				</div>
				<div>
					<label>Street Address 2: </label>
					<input
						type="text"
						name="streetAddress2"
						onChange={handleChange}
						value={formValues.streetAddress2}
					/>
				</div>
				<div>
					<label>City: </label>
					<input
						type="text"
						name="city"
						onChange={handleChange}
						value={formValues.city}
					/>
				</div>
				<div>
					<label>State: </label>
					<input
						type="text"
						name="state"
						onChange={handleChange}
						value={formValues.state}
					/>
				</div>
				<div>
					<label>Zip Code: </label>
					<input
						type="number"
						name="zipCode"
						onChange={handleChange}
						value={formValues.zipCode}
					/>
				</div>
				<div>
					<label>Country: </label>
					<input
						type="text"
						name="country"
						onChange={handleChange}
						value={formValues.country}
					/>
				</div>
				<div>
					<label>Image URL: </label>
					<input
						type="text"
						name="image"
						onChange={handleChange}
						value={formValues.image}
					/>
				</div>
				<div>
					<label htmlFor="description">Description: </label>
					<div>
						<textarea
							name="description"
							cols="30"
							rows="5"
							onChange={handleChange}
							value={formValues.description}
						></textarea>
					</div>
				</div>

				<button>Submit</button>
			</form>
      </div>
    )
  }
  
  export default AddClass