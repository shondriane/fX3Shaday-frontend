import { Link } from 'react-router-dom'
import '../styling/Nav.css'

const Nav = ({ user, handleLogOut,authenticated }) => {



let navOptions
  

if (user && user.id===36){
    navOptions=(
          <nav>
                 <Link to="/">Home</Link>
            <Link to={`/profile/${user.id}`}>Profile</Link>
        <Link to="/addClass/:user_id">AddClasses</Link>
            <Link onClick={handleLogOut} to="/">
              Sign Out
            </Link>
          </nav>
      )
    }
else if(user){
    navOptions=(
      <nav>
        
          <Link to="/">Home</Link>
          <Link to={`/profile/${user.id}`}>Profile</Link>
      <Link to={`/myClasses/${user.id}`}>MyClasses</Link>
      <Link to="/classes">Classes</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
      
      </nav>
    )
}

  else{
  navOptions=(
        <nav>
          
            <Link to="/">Home</Link>
            <Link to="/classes">Classes</Link>
            <Link to="/sign-in">Login</Link>
            <Link to="/register">Join</Link>
           
          
        </nav>
      )

  }

  return (
    <div>{navOptions}</div>
  )
}

export default Nav