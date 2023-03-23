import React from 'react'
import DropDownNavigation from './DropDownNavigation'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/logo.png'
import { useAuth } from '../contexts/Auth.context'

const Navigation = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  return (
    <div className='flex h-16 items-center bg-gray-100'>
      <div className='container mx-auto flex justify-between'>
        <button onClick={() => navigate('/')}>
          <img src={logo} className='h-14 w-14' />
        </button>
        <div className='flex gap-4'>
          {!user && (
            <button className='focus:outline-none' onClick={() => navigate('/login')}>
              Login
            </button>
          )}
          <DropDownNavigation title={user?.name || ''} />
          <button className='focus:outline-none' onClick={() => navigate('/chat')}>
            Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navigation
