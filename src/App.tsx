import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Navigation from './components/Navigation'
import HomePage from './containers/HomePage'
import LoginPage from './containers/LoginPage'
import SignupPage from './containers/SignupPage'
import ChatPage from './containers/ChatPage'
import { useAuth } from './contexts/Auth.context'

function App() {
  const { user } = useAuth()

  return (
    <>
      <div className='flex h-screen flex-col'>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />} />
          {!user && (
            <>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
            </>
          )}
          {user && <Route path='/chat' element={<ChatPage />} />}
        </Routes>
      </div>
    </>
  )
}

export default App
