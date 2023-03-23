import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Navigation from './components/Navigation'
import HomePage from './containers/HomePage'
import LoginPage from './containers/LoginPage'
import SignupPage from './containers/SignupPage'
import ChatPage from './containers/ChatPage'
import AuthLayout from './containers/Route/AuthLayout'

function App() {
  return (
    <>
      <div className='flex h-screen flex-col'>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route element={<AuthLayout />}>
            <Route path='/chat' element={<ChatPage />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
