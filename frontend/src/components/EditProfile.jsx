import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { Camera, Save, User, Edit, Info, Calendar, Mars } from 'lucide-react';
import UserCard from './userCard';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoURL, setPhotoUrl] = useState(user.photoURL);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoURL, age, gender, about },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
                {/* Preview Card */}
                <div className="w-full lg:w-1/3">
                    <UserCard
                        user={{ firstName, lastName, photoURL, age, gender, about }}
                        isPreview={true}
                    />
                </div>

                {/* Edit Form */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-purple-800/40">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <Edit className="w-6 h-6 mr-2 text-purple-400" />
                            Edit Profile
                        </h2>

                        {error && (
                            <div className="bg-red-600/20 text-red-300 p-3 rounded-md mb-6">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column - Personal Info */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <User className="w-5 h-5 mr-2 text-purple-400" />
                                    Personal Information
                                </h3>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm text-gray-300 mb-1">Profile Photo URL</label>
                                    <input
                                        type="text"
                                        value={photoURL}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-700/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <Camera className="absolute right-3 top-9 text-gray-400 w-5 h-5" />
                                </div>
                            </div>

                            {/* Right Column - Additional Info */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <Info className="w-5 h-5 mr-2 text-purple-400" />
                                    Additional Information
                                </h3>

                                <div className="relative">
                                    <label className="block text-sm text-gray-300 mb-1">Age</label>
                                    <input
                                        type="text"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-700/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <Calendar className="absolute right-3 top-9 text-gray-400 w-5 h-5" />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm text-gray-300 mb-1">Gender</label>
                                    <input
                                        type="text"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-700/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <Mars className="absolute right-3 top-9 text-gray-400 w-5 h-5" />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">About</label>
                                    <textarea
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/40 border border-gray-600 text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Tell others about yourself..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={saveProfile}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 animate-bounce-in">
                    <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg shadow-emerald-400/30">
                        Profile saved successfully!
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
