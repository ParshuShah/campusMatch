import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router' // Updated import
import NavBar from './NavBar'
import BottomNav from './BottomNav'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner' // Create this component

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation() // Added for route tracking
  const userData = useSelector((store) => store.user)
  const [isLoading, setIsLoading] = useState(true) // Added loading state

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      })
      dispatch(addUser(res.data))
      // Redirect to feed if accessing base /app route
      if (location.pathname === '/app') {
        navigate('/app/feed')
      }
    } catch (err) {
      navigate("/login", { state: { from: location } }) // Preserve location
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    } else {
      setIsLoading(false)
      // Still check for base route even if user exists
      if (location.pathname === '/app') {
        navigate('/app/feed')
      }
    }
  }, [userData, navigate, location])

  if (isLoading) {
    return <LoadingSpinner /> // Show loading state while checking auth
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <NavBar />
      <main className="flex-grow pb-16"> {/* Padding for BottomNav */}
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default Body