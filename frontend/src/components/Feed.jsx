import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { useEffect } from 'react'
import axios from 'axios'
import UserCard from './userCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
      if (res.data && Array.isArray(res.data.data)) {
        dispatch(addFeed(res.data.data))
      } else {
        console.error("Unexpected response format:", res.data)
      }
    } catch (err) {
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if (feed.length <= 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">No new users found</h2>
          <p className="text-gray-400 mt-2">Check back later for more matches!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Discover
          </h1>
          <div className="flex items-center text-sm text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Nearby</span>
          </div>
        </div>
        
        {feed[0] ? (
          <UserCard user={feed[0]} checkvalue={true} />
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-purple-900/50 text-red-400">
            Feed loaded but no user data found. Check API response format.
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed