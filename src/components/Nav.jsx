import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import '../styling/Nav.css'
import { faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Toolbar } from '@mui/material';


const Nav = ({ user, handleLogOut }) => {

  const [showNav, setShowNav] = useState(false);
  const styles = {
    customizeToolbar: {
      minHeight: 36
    }
  };
  

let navOptions
  

if (user && user.id===36){
    navOptions=(
      <AppBar>
          <nav>
            <FontAwesomeIcon icon={faBars} className="fas fa-bars hamburger" onClick={() => setShowNav(!showNav)} />

                <div className={`nav-links ${showNav ? 'show-nav' : ''}`}>
                 <Link to ={`/admin/${user.id}`} onClick={() => setShowNav(false)}>Admin</Link>
            <Link to={`/profile/${user.id}`} onClick={() => setShowNav(false)}>Profile</Link>
        <Link to="/addClass/:user_id" onClick={() => setShowNav(false)}>AddClasses</Link>
            <Link onClick={handleLogOut} to="/">
              Sign Out
            </Link>
            </div>
          </nav>
          </AppBar>
      )
    }
else if(user){
    navOptions=(
      <AppBar>
      <nav>
       <FontAwesomeIcon icon={faBars} className="fas fa-bars hamburger" onClick={() => setShowNav(!showNav)} />

         <div className={`nav-links ${showNav ? 'show-nav' : ''}`}>
          <Link to="/" onClick={() => setShowNav(false)}>Home</Link>
          <Link to={`/profile/${user.id}`}  onClick={() => setShowNav(false)}>Profile</Link>
      <Link to={`/myClasses/${user.id}`} onClick={() => setShowNav(false)}>MyClasses</Link>
      {/* <Link to={`/consultation/${user.id}`}>Private Training</Link> */}
      <Link to="/consultation" onClick={() => setShowNav(false)}>Consultation</Link>
      <Link to="/schedule" onClick={() => setShowNav(false)}>Classes</Link>
      <Link to="/contact" onClick={() => setShowNav(false)}>Contact</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
          </div>
      </nav>
      </AppBar>
    )
}

  else{
  navOptions=(
    <AppBar>
  
    <nav>
    <FontAwesomeIcon icon={faBars} className="fas fa-bars hamburger" onClick={() => setShowNav(!showNav)} />
    <div className={`nav-links ${showNav ? 'show-nav' : ''}`}>
      <Link to="/" onClick={() => setShowNav(false)}>Home</Link>
      <Link to="/consultation" onClick={() => setShowNav(false)}>Private</Link>
      <Link to="/schedule" onClick={() => setShowNav(false)}>Classes</Link>
      <Link to="/sign-in" onClick={() => setShowNav(false)}>Login</Link>
      <Link to="/register" onClick={() => setShowNav(false)}>Join</Link>
      <Link to="/contact" onClick={() => setShowNav(false)}>Contact</Link>
    </div>
  </nav>

  </AppBar>
      )

  }

  return (
    <div>{navOptions}</div>
  )
}

export default Nav