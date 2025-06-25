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