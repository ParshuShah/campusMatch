import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { Heart, User, X, Check, Clock } from 'lucide-react';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Request review error:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Fetch requests error:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-purple-900/50 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Pending Requests</h2>
          <p className="text-gray-400">You'll see connection requests here when you receive them</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Connection Requests
        </h1>

        <div className="space-y-4">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoURL, age, gender, about } = request.fromUserId;

            return (
              <div
                key={_id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-900/50 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      alt={`${firstName} ${lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                      src={photoURL || "https://www.svgrepo.com/show/512317/avatar-1295.svg"}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">
                      {firstName} {lastName}
                    </h2>
                    
                    {(age || gender) && (
                      <p className="text-gray-400 text-sm mb-2">
                        {age && gender ? `${age}, ${gender}` : age || gender}
                      </p>
                    )}
                    
                    {about && (
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {about}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      className="w-12 h-12 bg-gradient-to-r from-red-500/90 to-red-600/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-110"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    
                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      className="w-12 h-12 bg-gradient-to-r from-emerald-500/90 to-green-600/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 transform hover:scale-110"
                    >
                      <Check className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;