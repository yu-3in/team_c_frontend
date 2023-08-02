import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useQuery } from 'react-query'
import { getMe } from '../../apis/user'
import { SkeltonLayout } from '../Layout/SkeltonLayout'

export type AuthWrapperProps = {
  children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { data: user, isLoading, isSuccess } = useQuery('user', getMe, { retry: 1 })
  const location = useLocation()

  if (isLoading) {
    return <SkeltonLayout />
  }

  if (!isSuccess || !user) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return <>{children}</>
}

export default AuthWrapper
