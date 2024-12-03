import React from 'react'
import { useAuth } from '../context/AuthProvider.jsx'

const Dashboard = () => {
  const {profile,isAuthenticated } = useAuth()
  console.log(profile)
  console.log(isAuthenticated)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard