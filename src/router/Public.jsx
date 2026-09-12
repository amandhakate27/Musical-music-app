import { Navigate, Outlet } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Public = () => {
  const { loggedInUser } = useContext(AuthContext)
  if (loggedInUser) {
    return <Navigate to={loggedInUser.role === "artist" ? "/main/artist-dashboard" : "/main"} replace />
  }
  return <Outlet />
}

export default Public
