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