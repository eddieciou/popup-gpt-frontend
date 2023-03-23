import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../contexts/Auth.context'

const AuthLayout = () => {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to='/login' replace />
}

export default AuthLayout
