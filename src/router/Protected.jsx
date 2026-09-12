import { Navigate, Outlet } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Protected = () => {
  const { loggedInUser } = useContext(AuthContext)
  if (!loggedInUser) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default Protected
