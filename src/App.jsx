import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
   <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Chat/>} />

      </Routes>
      <ToastContainer />
   </BrowserRouter>


   )
}

export default App
