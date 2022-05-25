import React from 'react'
import LandingPage from './components/LandingPage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import MeetMe from './components/MeetMe'
import AddImage from './components/AddImage'
import EditProfile from './components/EditProfile'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

const App = () => {
  return (
    <div>
      {/* <LandingPage/> */}
      {/*  */}
      {/*  */}
     
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home/>}/>
          <Route  path="/signup" element={ <SignUp/>}/>
          <Route  path="/meetme/:id" element={ <MeetMe/>}/>
          <Route  path="/login" element={ <Login/>}/>
          <Route  path="/addimage" element={ <AddImage/>}/>
          <Route  path="/edit" element={ <EditProfile/>}/>
          <Route  path="/createpost" element={ <CreatePost/>}/>

        </Routes>
      </Router>

    </div>
  )
}

export default App
