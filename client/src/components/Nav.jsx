import { Link } from 'react-router-dom'
import '../styling/Nav.css'

const Nav = ({ authenticated, user, handleLogOut }) => {




  
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav>
        
          <Link to="/">Home</Link>
          <Link to={`/profile/${user.id}`}>Profile</Link>
      
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
        
        
      
      
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      
        <Link to="/">Home</Link>
        <Link to="/sign-in">Login</Link>
        <Link to="/register">Register</Link>
       
      
    </nav>
  )

  return (
    <div>{authenticated && user ? authenticatedOptions : publicOptions}</div>
  )
}

export default Nav