import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UseFormSetError } from 'react-hook-form'
import { AuthContext } from '../../context/AuthProvider'
import { setCurrentAccessToken, setRefreshTokenCallback } from '../../axios'

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

const useAuthContext = () => {
  const context = useContext(AuthContext)
  const navigate = useNavigate()

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  const {
    user,
    setUser,
    accessToken,
    login,
    logout,
    register,
    refreshToken,
    isLoggedIn,
    loadingUser
  } = context

  // Update token on axios when it changes
  useEffect(() => {
    setCurrentAccessToken(accessToken)
  }, [accessToken])

  // Configure refresh token callback to run once on component mount
  useEffect(() => {
    const handleRefreshToken = async (): Promise<string | null> => {
      try {
        const success = await refreshToken()
        
        if (success) {
          await new Promise(resolve => setTimeout(resolve, 50))
          return context.accessToken
        }
        
        return null
      } catch (error) {
        console.error('Erro no refresh token:', error)
        return null
      }
    }

    setRefreshTokenCallback(handleRefreshToken)
    
    return () => {
      setRefreshTokenCallback(async () => null)
    }
  }, []) 

  const loginOrg = async (
    input: LoginType,
    setIsLoading: (value: boolean) => void,
  ) => {
    try {
      setIsLoading(true)
      await login(input)
      navigate('/')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const registerOrg = async (
    input: RegisterType,
    setError: UseFormSetError<RegisterType>,
    setIsLoading: (value: boolean) => void,
  ) => {
    try {
      setIsLoading(true)
      await register(input)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      navigate('/signin')
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: 'Erro ao tentar registrar usuário.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logoutOrg = async () => {
    try {
      setCurrentAccessToken(null)
      await logout()
      navigate('/signin')
    } catch (error) {
      navigate('/signin')
      throw error
    }
  }

  return {
    loginOrg,
    logoutOrg,
    registerOrg,
    user,
    setUser,
    accessToken,
    isLoggedIn,
    loadingUser,
    refreshToken
  }
}

export default useAuthContext