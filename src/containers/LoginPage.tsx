import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <div className='container mx-auto flex grow'>
      <div className='h-full w-2/5'>
        <img
          className='h-full object-cover'
          src='https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
        />
      </div>
      <div className='flex h-full w-3/5 justify-center'>
        <form className='flex w-1/2 flex-col justify-center gap-3'>
          <div className='grid gap-1'>
            <div>Email address</div>
            <input
              type='email'
              placeholder='請輸入帳號'
              className='w-full rounded-md border border-gray-400 p-2 focus:outline-none'
            />
            <p className='text-xs text-gray-500'>
              {/* eslint-disable-next-line quotes */}
              We{"'"}ll never share your email with anyone else.
            </p>
          </div>
          <div className='grid gap-1'>
            <div>Password</div>
            <input
              type='password'
              placeholder='請輸入密碼'
              className='w-full rounded-md border border-gray-400 p-2 focus:outline-none'
            />
          </div>
          <button className='w-fit rounded-md bg-blue-500 py-2 px-4 text-white focus:outline-none'>
            Login
          </button>
          <div className='flex w-full justify-center gap-1'>
            {/* eslint-disable-next-line quotes */}
            Don{"'"}t have an account?
            <button onClick={() => navigate('/signup')} className='text-blue-600 underline'>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
