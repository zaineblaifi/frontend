import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import Home from './Home';
import Register from './register';
import Login from "./login";
import Profile from "./profile";
import Enregvideo from './Enreg_video';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/Enreg_video' element={<Enregvideo/>}></Route>


    </Routes>
  </BrowserRouter>
  )
}

export default App
