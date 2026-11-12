import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { OrgFromAPI } from '../@types'
import axiosInstance, {
  setCurrentAccessToken,
  setRefreshTokenCallback,
} from '../axios'
import { ErrorToast } from '@/components/ErrorToast'
import { SuccessToast } from '@/components/SuccessToast'
import { getApiErrorMessage } from '../utils/apiError'

interface LoginType {
  email: string
  password: string
}

interface RegisterType {
  name: string
  description: string
  email: string
  password: string
  whatsapp: string
  address: string
  city: string
  state: string
  cep: string
}

type DataFromAPI = {
  org: OrgFromAPI
}

export interface AuthContextProps {
  user: OrgFromAPI | null
  setUser: (user: OrgFromAPI | null) => void
  accessToken: string | null
  login: (input: LoginType) => Promise<void>
  logout: () => Promise<void>
  register: (input: RegisterType) => Promise<void>
  refreshToken: () => Promise<boolean>
  isLoggedIn: boolean
  loadingUser: boolean
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<OrgFromAPI | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const isLoggedIn = user !== null && accessToken !== null

  // Always update the current access token - axiosInstance
  useEffect(() => {
    setCurrentAccessToken(accessToken)
  }, [accessToken])

  // Define refresh callback to the interceptor
  useEffect(() => {
    setRefreshTokenCallback(async () => {
      const success = await refreshToken()
      return success ? accessToken : null
    })
  }, [accessToken])

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await axiosInstance.patch('/token/refresh')

      if (response.status === 200 && response.data.accessToken) {
        const newToken = response.data.accessToken
        setAccessToken(newToken)

        if (!user) {
          const userData = await axiosInstance.get<DataFromAPI>('/me', {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          })
          setUser(userData.data.org)
        }

        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao renovar token:', error)
      setAccessToken(null)
      setUser(null)
      return false
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoadingUser(true)
        const success = await refreshToken()

        if (!success) {
          setUser(null)
          setAccessToken(null)
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setUser(null)
        setAccessToken(null)
      } finally {
        setLoadingUser(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (input: LoginType) => {
    try {
      setLoadingUser(true)
      const { email, password } = input

      const res = await axiosInstance.post('/sessions', { email, password })

      if (res.status === 200) {
        const { accessToken: newAccessToken } = res.data
        setAccessToken(newAccessToken)

        const userData = await axiosInstance.get('/me', {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        })
        setUser(userData.data.org as OrgFromAPI)

        SuccessToast('Login realizado com sucesso!')
      }
    } catch (error) {
      setUser(null)
      setAccessToken(null)

      ErrorToast(
        getApiErrorMessage(error, 'Erro ao fazer login. Tente novamente.', {
          400: 'Email ou senha inválidos.',
          401: 'Email ou senha inválidos.',
        }),
      )

      throw error
    } finally {
      setLoadingUser(false)
    }
  }

  const logout = async () => {
    try {
      await axiosInstance.post('/logout')
      setUser(null)
      setAccessToken(null)
      SuccessToast('Logout realizado com sucesso!')
    } catch (error) {
      setUser(null)
      setAccessToken(null)

      ErrorToast(getApiErrorMessage(error, 'Erro ao fazer logout.'))

      throw error
    }
  }

  const register = async (input: RegisterType) => {
    try {
      setLoadingUser(true)
      const res = await axiosInstance.post('/orgs', input)

      if (res.status === 201) {
        SuccessToast('Organização criada com sucesso!')
      }
    } catch (error) {
      ErrorToast(
        getApiErrorMessage(error, 'Erro ao registrar organização.', {
          400: 'Dados inválidos. Verifique os campos.',
          409: 'Email já está em uso.',
        }),
      )

      throw error
    } finally {
      setLoadingUser(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        login,
        logout,
        register,
        refreshToken,
        isLoggedIn,
        loadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
