import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
import { Heart, Search, LogOut, User, MessagesSquare, Bell } from 'lucide-react'

const NavBar = () => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post(
                BASE_URL + "/logout",
                {},
                { withCredentials: true }
            )
            dispatch(removeUser())
            navigate("/login")
        } catch (err) {
            console.error("Logout error:", err)
        }
    }

    return (
        <div className="navbar bg-gray-800/80 backdrop-blur-md border-b border-purple-900/50 px-4 sticky top-0 z-50">
            <div className="flex-1">
                <Link to="/app/feed" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                        CampusMatch
                    </span>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                </div>

                {user && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-800">
                                <img
                                    alt="User profile"
                                    src={user.photoURL || "https://www.svgrepo.com/show/512317/avatar-1295.svg"}
                                />
                            </div>
                        </div>
                       <ul
  tabIndex={0}
  className="menu menu-sm dropdown-content mt-3 z-[1] px-4 py-3 shadow-lg bg-gray-800/95 backdrop-blur-lg rounded-box w-64 border border-purple-900/50 space-y-3"
>
  <li className="flex flex-col items-start gap-1">
    <span className="text-sm text-gray-400">Welcome back,</span>
    <span className="text-lg font-semibold text-purple-300 tracking-wide">
      {user?.firstName} {user?.lastName} 👋
    </span>
  </li>
  <hr className="border-purple-700 opacity-50" />
  <li>
    <a
      onClick={handleLogout}
      className="text-red-400 hover:bg-gray-700/50 flex items-center gap-2 px-2 py-2 rounded-md font-medium"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </a>
  </li>
</ul>


                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar