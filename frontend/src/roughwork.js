
<div className="card bg-base-100 w-96 shadow-sm">
<figure>
    <img
        src={user.photoURL || "https://media.istockphoto.com/id/1336021035/photo/black-and-white-color-cat-looking-at-camera-curiosity.jpg?s=2048x2048&w=is&k=20&c=_G7Fxv6qO_DShw16yH8nRVU6JqHve3egCrUvNu6oTyA="}
        alt="Shoes" className='w-full h-full object-cover' />
</figure>
<div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + ", " + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
        <button className="btn btn-secondary rounded-sm">Ignore</button>
        <button className="btn btn-primary rounded-sm">Interested</button>
    </div>
</div>
</div>

//the above code is of my userCard if you get any erro then jst past the above code and that's all'


//body = 
<div className="flex flex-col min-h-screen">
<NavBar />
<main className="flex-grow">
  <Outlet />
</main>
<Footer />
</div>




//Login Page 

import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login",
                { emailId, password, },
                { withCredentials: true }
            );

            dispatch(addUser(res.data));
            return navigate("/");
        } catch (err) {
            setError(err?.response?.data || "Something went Wrong");
            
        }
    }

    return (

        <div className='flex justify-center my-10'>
            <div className="card card-border bg-base-200 min-w-80 shadow-lg rounded-lg">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div className=''>
                        <div className='my-3'>
                            <label className='form-control w-full max-w-xs my-4'>
                                <div className='label my-1.5'>
                                    <span className='label-text'>Email ID</span>
                                </div>
                                <input type="text"
                                    value={emailId}
                                    className='input input-bordered w-full max-w-xs'
                                    onChange={(e) => setEmailId(e.target.value)} />
                            </label>
                        </div>
                        <div className='my-3'>
                            <label className='form-control w-full max-w-xs my-4'>
                                <div className='label my-1.5'>
                                    <span className='label-text'>Password</span>
                                </div>
                                <input type="text"
                                    value={password}
                                    className='input input-bordered w-full max-w-xs'
                                    onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500 mt-0'>{error}</p>
                    <div className="card-actions justify-center ">
                        <button className="btn btn-primary rounded-md" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login