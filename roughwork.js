//1 - main page

import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";

function App() {

  return (
    <>
    <Provider store = {appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path = "/" element={<Body />}>
          <Route path = "/" element = {<Feed />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/profile" element = {< Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
             <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;


//2 - login page
//Login

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;


// 3 - Body.jsx

import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import NavBar from './NavBar'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,

      });
      dispatch(addUser(res.data));  

    } catch (err) {
      navigate("/login");  
      console.error(err);
    }
  }

useEffect(()=>{
  if(!userData){
    fetchUser();
  }
  
}, []);

  return (
    <div className="flex flex-col min-h-screen">
    <NavBar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    </div>
  )
}

export default Body



// 4 - Navbar.jsx

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';



const NavBar = () => {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try{
            await axios.post(
                BASE_URL + "/logout",
                {},
                {withCredentials : true}
            );
            dispatch(removeUser());
            navigate("/login");
            
        }catch(err){
            //Error logic maybe redirect to error page
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm px-3">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl "><img 
                src = "https://www.svgrepo.com/show/299469/tinder.svg"
                width={50}
                /></Link>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                {user && ( <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoURL} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/connections">Connections</Link>
                        </li>
                        <li>
                            <Link to="/requests">Requests</Link>
                        </li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>)}
            </div>
        </div>
    )
}

export default NavBar;


//5 feed.jsx
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import axios from 'axios';
import UserCard from './userCard';

const Feed = () => {

  const feed = useSelector((store) => store.feed);



  const dispatch = useDispatch();

  const getFeed = async () => {
    // if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed",
        {
          withCredentials: true,
        });
         // Debugging logs:
  
        // Ensure we're dispatching the correct data
        if (res.data && Array.isArray(res.data.data)) {
          dispatch(addFeed(res.data.data));
        } else {
          console.error("Unexpected response format:", res.data);
        }
    } catch (err) {
      //TODO : handle error
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
    }
  }

  useEffect(() => {
    getFeed();
  }, [])

  // if (!feed || feed.length === 0) {
  //   return <h1 className="text-center mt-10">Loading...</h1>;
  // }

   // Show loading state if feed is empty
   if (feed.length <= 0) {
    return <h1 className="text-center mt-10"> No new Users found!.. </h1>;
  }

  return (
    <div className="flex justify-center my-10">
    {feed[0] ? (
      <UserCard user={feed[0]} checkvalue={true} />
    ) : (
      <div className="alert alert-warning">
        Feed loaded but no user data found. Check API response format.
      </div>
    )}
  </div>
  );
}

export default Feed


//6 userCard.jsx

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


//7 - Profile.jsx
import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div>
        <EditProfile user={user} checkvalue = {false} />
      </div>
    )
  );
}

export default Profile


//8 - editProfile.jsx
import React from 'react'
import { useState } from 'react';
import UserCard from './userCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoURL, setPhotoUrl] = useState(user.photoURL);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);


    const saveProfile = async () => {
        //Clear Errors
        setError("");
        try {
          const res = await axios.patch(
            BASE_URL + "/profile/edit",
            {
              firstName,
              lastName,
              photoURL,
              age,
              gender,
              about,
            },
            { withCredentials: true }
          );
          dispatch(addUser(res?.data?.data));
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        } catch (err) {
          setError(err.response.data);
        }
      };

    return (
        <>
        <div className="flex justify-center my-6 mb-32">
            <div className="flex justify-center mx-10">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">First Name:</span>
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Last Name:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>
                                <div className="label">
                                    <span className="label-text">Photo URL :</span>
                                </div>
                                <input
                                    type="text"
                                    value={photoURL}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Age:</span>
                                </div>
                                <input
                                    type="text"
                                    value={age}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Gender:</span>
                                </div>
                                <input
                                    type="text"
                                    value={gender}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">About:</span>
                                </div>
                                <input
                                    type="text"
                                    value={about}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </label>
                        </div>
                        <p className="text-red-500"> {error} </p>
                        <div className="card-actions justify-center m-2">
                            <button className="btn btn-primary" onClick={saveProfile}> 
                                Save Profile
                                
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard
          user={{ firstName, lastName, photoURL, age, gender, about }}
        />
        </div>
         {showToast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Profile saved successfully.</span>
              </div>
            </div>
          )}
        </>  


    )
};

export default EditProfile

//9 - Connections.jsx
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-pink-600 text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;

// 10 - Requests.jsx

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      // console.log(res.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  console.log("loading the request page");
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10 mx-30">
      <h1 className="text-bold text-pink-800 text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;

// 11 - Chat.jsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const getRoomId = (a, b) => [a, b].sort().join("$");

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const roomId = getRoomId(userId, targetUserId);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      roomId,
      firstName: user.firstName,
    });

    socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(`${firstName}: ${text}`);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!socketRef.current) return;

    console.log("Sending message:", newMessage); // 🟢 Debug here!

    socketRef.current.emit("sendMessage", {
      roomId,
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {`${msg.firstName} ${msg.lastName}`}
              <time className="text-xs opacity-50"> Just now</time>
            </div>
            <div className="chat-bubble text-black bg-white">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>
      <div className="p-5 border-t border-blue-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-blue-500 text-black rounded p-2 bg-white"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

//12 - socket.js
import React from 'react'

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 sticky bottom-0">
            <aside className="grid-flow-col items-center">
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="fill-current">
                    <path
                        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                </svg>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current">
                        <path
                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                </a>
                <a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current">
                        <path
                            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                </a>
                <a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current">
                        <path
                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                </a>
            </nav>
        </footer>
    )
}

export default Footer

