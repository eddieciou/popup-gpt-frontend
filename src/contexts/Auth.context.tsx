import { createContext } from 'react'

type TAuthContext = {
  login: (email: string, password: string) => Promise<string>
}

const AuthContext = createContext<TAuthContext>({
  login: () => Promise.reject(),
})
