import React from 'react'
import { IoIosChatbubbles } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex grow'>
      <div className='flex h-full w-1/2 items-center justify-center'>
        <div className='grid gap-2'>
          <h1 className='mt-2 text-4xl font-bold'>Share the world with your friends</h1>
          <p className='font-semibold'>Chat App lets you connect with the world</p>
          <button
            className='flex w-fit items-center gap-2 rounded-md bg-green-700 p-2 text-white'
            onClick={() => navigate('/chat')}
          >
            Get Started
            <IoIosChatbubbles size='25' />
          </button>
        </div>
      </div>
      <div className='h-full w-1/2'>
        <img
          className='h-full object-cover'
          src='https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'
        />
      </div>
    </div>
  )
}

export default HomePage
