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
    accessToken, 
    login, 
    logout, 
    register, 
    refreshToken, 
    isLoggedIn, 
    loadingUser 
  } = context

  useEffect(() => {
    setCurrentAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    setRefreshTokenCallback(async () => {
      const success = await refreshToken()
      return success ? accessToken : null
    })
  }, [refreshToken, accessToken])

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
    accessToken,
    isLoggedIn,
    loadingUser,
    refreshToken
  }
}

export default useAuthContext