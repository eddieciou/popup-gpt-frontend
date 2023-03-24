import React, { createContext, useContext, useMemo } from 'react'
import { TUser } from '../types/commons.type'
import { useLocalStorage } from 'usehooks-ts'
import { fetchAPI } from '../services/appApi.service'
import { useNavigate } from 'react-router-dom'

type TAuthContext = {
  user: TUser | null
  setUser: (user: TUser | null) => void
  login: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<TAuthContext>({
  user: null,
  setUser: () => null,
  login: () => Promise.reject(),
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<TUser | null>('user', null)

  const navigate = useNavigate()

  const login = (email: string, password: string) => {
    const body = {
      email,
      password,
    }
    return fetchAPI('/users/login', 'POST', body).then((result: TUser) => {
      setUser(result)
      // socket work
      navigate('/chat', { replace: true })
    })
  }

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
