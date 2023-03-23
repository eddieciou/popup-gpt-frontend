import React, { createContext, useContext, useMemo } from 'react'
import { TUser } from '../types/commons.type'
import { useLocalStorage } from 'usehooks-ts'
import { fetchAPI } from '../services/appApi.service'

type TAuthContext = {
  user: TUser | null
  setUser: (user: TUser | null) => void
  login: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<TAuthContext>({
  user: null,
  setUser: () => {
    // do nothing
  },
  login: () => Promise.reject(),
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<TUser | null>('user', null)

  const login = (email: string, password: string) => {
    const body = {
      email,
      password,
    }
    return fetchAPI('/users/login', 'POST', body).then((result: TUser) => {
      setUser(result)
    })
  }

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
    }),
    [],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
