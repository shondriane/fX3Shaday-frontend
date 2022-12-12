import './index.css';
import Test from './components/TestComponent';
import Nav from './components/Nav'
import Profile from './components/Profile'
import { CheckSession } from './services/Auth';
import Register from './components/Register';
import SignIn from './components/SignIn'
import Class from './components/Class'
import UpdateProfile from './components/UpdateProfile'
import { Route, Routes } from 'react-router'
import { useState, useEffect } from 'react'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])
  return (
    <div>
      <header>
      <Nav
          authenticated={authenticated}
          user={user}
          handleLogOut={handleLogOut}
        />
       
      </header>
      <main>
<Routes>
  <Route path="/" element={<Test/>}/>
  <Route path="/sign-in" 
  element={<SignIn 
    setUser={setUser} 
    toggleAuthenticated={toggleAuthenticated}
    />}
    />
    <Route path="/profile/:user_id" element={<Profile user={user} />} />
    <Route
            path="/register"
            element={
              <Register
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
    <Route
            path="/update-profile/:user_id"
            element={<UpdateProfile user={user} />}
          />
           <Route
            path="/classes"
            element={<Class user={user} />}
          />
         
</Routes>

          
      </main>
     
    </div>
  );
}

export default App;
