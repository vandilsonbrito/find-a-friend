import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/signin' 
}: ProtectedRouteProps) {
  const { isLoggedIn, loadingUser: isLoading } = useAuthContext()


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Carregando...</span>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
