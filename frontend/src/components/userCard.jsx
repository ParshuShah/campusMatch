import React from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from 'axios';

const UserCard = ({ user, checkvalue }) => {
    if (!user) {
        return <div className="text-center">No user data available</div>;
    }
    const { _id, firstName, lastName, photoURL, age, gender, about, skills } = user;
    //     console.log(user);
    //     console.log("Hello from the userCard")

    //     console.log("User object:", user);
    // console.log("Photo URL:", user?.photoUrl);
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (err) { }
    };


    return (

        <div className="card w-96 bg-white shadow-xl rounded-2xl transition-transform duration-300 hover:scale-105">
            <figure className="relative h-96 overflow-hidden">
                <img
                    src={
                        user.photoURL ||
                        "https://media.istockphoto.com/id/1336021035/photo/black-and-white-color-cat-looking-at-camera-curiosity.jpg?s=2048x2048&w=is&k=20&c=_G7Fxv6qO_DShw16yH8nRVU6JqHve3egCrUvNu6oTyA="
                    }
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                    <h2 className="text-xl font-bold">{firstName + " " + lastName}</h2>
                    {age && gender && <p className="text-sm">{age + ", " + gender}</p>}
                </div>
            </figure>

            <div className="card-body">
                {about && <p className="text-gray-600 text-sm mb-2">{about}</p>}
                {Array.isArray(skills) && skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {checkvalue && <div className="card-actions justify-around mt-4">
                    <button className="btn btn-outline btn-error rounded-full px-6" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-primary rounded-full px-6" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                </div>}
            </div>
        </div>

    )
}

export default UserCard