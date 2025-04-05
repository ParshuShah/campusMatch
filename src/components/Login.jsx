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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login",
                { emailId, password, },
                { withCredentials: true }
            );
            console.log(res.data);
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (err) {
            console.log(err);
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

                    <div className="card-actions justify-center ">
                        <button className="btn btn-primary rounded-md" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login