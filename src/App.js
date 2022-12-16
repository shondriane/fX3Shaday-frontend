import './index.css';
import Test from './components/TestComponent';
import Nav from './components/Nav'
import Profile from './components/Profile'
import { CheckSession } from './services/Auth';
import Register from './components/Register';
import SignIn from './components/SignIn'
import Class from './components/Class'
import ClassSchedule from './components/ClassSchedule';
import UpdateProfile from './components/UpdateProfile'
import MyClasses from './components/MyClasses'
import Contact from './components/Contact'
import AddClass from './components/AddClass'
import UpdateClass from './components/UpdateClass'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router'
import { useState, useEffect } from 'react'
import AddReview from './components/AddReview';
import PrivateTraining from './components/PrivateTraining';


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
  <Route path="/" element={<Test/>} user={user}/>
  <Route path="/:user_id" element={<Test/>} user={user}/>
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
            element={<UpdateProfile user={user} handleLogOut={handleLogOut}/>}
          />
           <Route
            path="/classes"
            element={<Class user={user} />}
          />
          <Route
            path="/classes/:classes_id"
            element={<Class user={user} authenticated={authenticated} />}
          />
          <Route path="/schedule" 
          element={<ClassSchedule user={user} authenticated={authenticated}/>}/>
          <Route path="/myClasses/:user_id" 
          element={<MyClasses user={user} authenticated={authenticated}/>}/>
           <Route path="/contact/" 
          element={<Contact user={user} />}/>
          <Route path="/addClass/:user_id" 
          element={<AddClass user={user}authenticated={authenticated} />}/>
            <Route path="/updateClass/:class_id" 
          element={<UpdateClass user={user}authenticated={authenticated} />}/>
           <Route path="/addReview/:class_id" 
          element={<AddReview user={user}authenticated={authenticated} />}/>
           <Route path="/privateTraining" 
          element={<PrivateTraining user={user}authenticated={authenticated} />}/>
          
          
</Routes>

          
      </main>
     <Footer/>
    </div>
  );
}

export default App;