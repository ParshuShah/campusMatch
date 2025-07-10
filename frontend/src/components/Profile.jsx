import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'

const Profile = () => {
  const user = useSelector((store) => store.user)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      {user && <EditProfile user={user} checkvalue={false} />}
    </div>
  )
}

export default Profile