import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const initialFormValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  
  }

  const [formValues, setFormValues] = useState(initialFormValues)


  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

      await RegisterUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
       
      })
      setFormValues(initialFormValues)
      navigate('/sign-in')
    
  }
  return (
    <div className="registerPage">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="label">
            <label htmlFor="firstName">First Name:</label>
          </div>
          <input
            onChange={handleChange}
            name="firstName"
            type="text"
            placeholder="Rainbow"
            value={formValues.firstName}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="lastName">Last Name:</label>
          </div>
          <input
            onChange={handleChange}
            name="lastName"
            type="text"
            placeholder="Sunshine"
            value={formValues.lastName}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="username">Username:</label>
          </div>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="pretzel89"
            value={formValues.username}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="password">Password:</label>
          </div>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="create password"
            value={formValues.password}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="email">Email:</label>
          </div>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="example@mail.com"
            value={formValues.email}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="phoneNumber">Phone Number:</label>
          </div>
          <input
            onChange={handleChange}
            name="phoneNumber"
            type="text"
            placeholder="123-456-7891"
            value={formValues.phoneNumber}
            required
          />
        </div>
  
    

        <button>Sign Up</button>
      </form>
  
    </div>
  )
}

export default Register
