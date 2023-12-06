import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({Children}) {
    const {user} = JSON.parse(localStorage.getItem("auth"))

  return user.account ? <>{Children}</> : <Navigate to="/login/"/>

}

export default ProtectedRoute
