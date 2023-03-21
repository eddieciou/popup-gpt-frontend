import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Navigation from './components/Navigation'
import HomePage from './containers/HomePage'
import LoginPage from './containers/LoginPage'
import SignupPage from './containers/SignupPage'
import ChatPage from './containers/ChatPage'

function App() {
  return (
    <BrowserRouter>
      <div className='flex h-screen flex-col'>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
