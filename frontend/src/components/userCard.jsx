import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from "../utils/feedSlice"
import { BASE_URL } from "../utils/constants"
import axios from 'axios'
import { Heart, X, Star } from 'lucide-react'

const UserCard = ({ user, checkvalue }) => {
    if (!user) {
        return <div className="text-center text-gray-400">No user data available</div>
    }
    const { _id, firstName, lastName, photoURL, age, gender, about, skills } = user
    const dispatch = useDispatch()

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            )
            dispatch(removeUserFromFeed(userId))
        } catch (err) { }
    }

    return (
        <div className="relative overflow-hidden rounded-3xl shadow-xl border border-purple-900/50 bg-gray-800/50 backdrop-blur-sm">
            {/* Profile Image */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={photoURL || "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
                            <div className="flex items-center space-x-4 mt-1 text-sm">
                                {age && <span>{age}</span>}
                                {gender && <span>• {gender}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 text-gray-300">
                {about && (
                    <p className="mb-4 leading-relaxed">{about}</p>
                )}

                {Array.isArray(skills) && skills.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span 
                                    key={i} 
                                    className="px-3 py-1 bg-gray-700/50 text-purple-300 text-sm rounded-full border border-purple-900/50"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {checkvalue && (
                    <div className="flex items-center justify-center space-x-6 pt-4">
                        <button 
                            onClick={() => handleSendRequest("ignored", _id)}
                            className="w-16 h-16 bg-gradient-to-r from-red-500/90 to-red-600/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-110"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        
                        <button className="w-12 h-12 bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 transform hover:scale-110">
                            <Star className="w-6 h-6" />
                        </button>
                        
                        <button 
                            onClick={() => handleSendRequest("interested", _id)}
                            className="w-16 h-16 bg-gradient-to-r from-emerald-500/90 to-green-600/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 transform hover:scale-110"
                        >
                            <Heart className="w-8 h-8" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}   

export default UserCard