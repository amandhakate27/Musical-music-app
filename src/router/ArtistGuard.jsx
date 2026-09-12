import { Navigate, Outlet } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const ArtistGuard = () => {
  const { loggedInUser } = useContext(AuthContext)
  if (loggedInUser?.role !== "artist") {
    return <Navigate to="/main" replace />
  }
  return <Outlet />
}

export default ArtistGuard
